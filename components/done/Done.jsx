import { useEffect, useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Signatures from './sign/Signatures';
import { PDFDocument } from 'pdf-lib';
import firebaseApp from '../../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import moment from 'moment/moment';
import { AppContext } from '../context/AppContext';
import Buttons from './Buttons';
import WellDone from './well done/WellDone';
import { WaveIndicator } from 'react-native-indicators';

const Done = ({ navigation }) => {
  const {
    pdf,
    setPdf,
    setBase64Pdf,
    backgroundValues,
    inspectionTypeOtherText,
    tempValues,
    sanitizingConcentrationValues,
    sanitizingTempValues,
    discrepanciesList,
    nanoValues,
    freeText,
    startTime,
    inspectorSignature,
    picSignature,
    setErrorModalVisible,
    setErrorMessage,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [activityLabel, setActivityLabel] = useState('preparing PDF');

  useEffect(() => {
    const retrievePdf = async () => {
      const response = await axios.get(
        'https://publichealthapp-5964a.web.app/dd__2973__blank.pdf',
        {
          responseType: 'arraybuffer',
        },
      );
      const pdfBytes = response.data;
      return pdfBytes;
    };

    const fillBackgroundSection = form => {
      // BACKGROUND FORM //
      for (i = 0; i < backgroundValues.length; i++) {
        const obj = backgroundValues[i];
        if (obj?.type === 'text') {
          if (obj?.formid === 'facility__name') {
            form.getTextField(obj?.formid)?.setText(obj?.text);
            form.getTextField('facility__name__2').setText(obj?.text);
            // form.getTextField('facility__name__3').setText(obj?.text);
            // form.getTextField('facility__name__4').setText(obj?.text);
          } else {
            if (obj.formid != 'n/a') {
              form.getTextField(obj?.formid).setText(obj?.text);
            }
          }
        } else if (obj?.type === 'select') {
          form.getCheckBox(obj?.formid(obj?.text)).check();
          form.getCheckBox(`${obj?.formid(obj?.text)}__2`)?.check();
          form.getCheckBox(`${obj?.formid(obj?.text)}__3`)?.check();
          // form.getCheckBox(`${obj?.formid(obj.text)}__4`).check();
          if (inspectionTypeOtherText != '') {
            form.getTextField('inspection__type__other__specify').setText(inspectionTypeOtherText);
          }
        }
      }
    };

    const fillTemperatureSection = form => {
      // TEMPERATURE FORM //
      for (i = 0; i < tempValues.length; i++) {
        form.getTextField(`temp__item__location__${i + 1}`).setText(tempValues[i]?.description);

        const tempField = form.getTextField(`temp__temp__${i + 1}`);
        const tempVal = tempValues[i]?.temp;
        const temp = tempValues[i]?.metric === 'C' ? `${tempVal}°C` : `${tempVal}°F`;

        if (tempVal) {
          tempField.setFontSize(8);
          tempField.setText(temp);
        }
      }
    };

    const fillSanatizingTempSection = form => {
      // SANITIZING TEMP FORM //
      for (i = 0; i < sanitizingTempValues.length; i++) {
        if (sanitizingTempValues[i]?.NA) {
          form.getCheckBox(`sanitizing__temp__NA__${i + 1}`).check();
        } else {
          const tempField = form.getTextField(`sanitizing__temp__${i + 1}`);
          const tempVal = sanitizingTempValues[i]?.temp;
          const temp = sanitizingTempValues[i]?.metric === 'C' ? `${tempVal}°C` : `${tempVal}°F`;
          if (tempVal) {
            tempField.setFontSize(8);
            tempField.setText(temp);
          }
        }
      }
    };

    const fillSanatizingConcentrationSection = form => {
      // SANITIZING CONCENTRATION FORM //
      for (i = 0; i < sanitizingConcentrationValues.length; i++) {
        if (sanitizingConcentrationValues[i]?.NA) {
          form.getCheckBox(`sanitizing__concentration__NA__${i + 1}`).check();
        } else {
          const ppm = sanitizingConcentrationValues[i]?.ppm;
          form.getTextField(`sanitizing__ppm__${i + 1}`).setText(ppm);
          const solution = sanitizingConcentrationValues[i]?.solution;
          if (solution === 'Quats') {
            form.getCheckBox(`sanitizing__quats__${i + 1}`).check();
          } else if (solution === 'Bleach') {
            form.getCheckBox(`sanitizing__bleach__${i + 1}`).check();
          }
        }
      }
    };

    const fillMetaData = form => {
      form.getTextField('todays__date__1').setText(moment().format('YYYYMMDD'));
      form.getTextField('todays__date__2').setText(moment().format('YYYYMMDD'));

      form.getTextField('inspection__start__time').setText(startTime);

      form.getTextField('inspection__end__time').setText(moment().format('h:mm'));
    };

    // ensure item is critical
    // there are sometimes non critical discrepancy within critical item groupings
    const checkNonCritical = dict => {
      // check the non critical property
      if (dict.noncritical) return true;
      // recursively search through children to ensure that there are no noncritical items
      else if (dict.children && dict.children.length > 0) {
        // if the dict has children check the children for the noncritical property
        return checkNonCritical(dict.children);
      }
      return false;
    };

    const getComplianceRating = (
      IHH,
      numCritical,
      numNonCritical,
      numCriticalCOS,
      numNonCriticalCOS,
    ) => {
      if (IHH === true || numCritical > 0) {
        return 'non__compliant';
      } else if (numCriticalCOS >= 3 || numNonCritical >= 6) {
        return 'partially__compliant';
      } else {
        if (numCriticalCOS != 0 || numNonCriticalCOS > 4) {
          return 'substantially__compliant';
        } else {
          return 'fully__compliant';
        }
      }
    };

    // every 75 characters increments the return value by 1
    const addLines = (length, limit) => {
      // base case -> exit when the length is less than or equal to the line limit
      if (length <= limit) {
        return 0;
      }
      // else -> subtract 75 (limit) from the length and call addLines again
      // this process continues until the length is less than 75
      return 1 + addLines(length - limit, limit);
    };

    const getItemNewLines = (firstTextChunk, secondTextChunk, thirdTextChunk) => {
      // max number of characters per line in discrepancy text field
      const MAX_LINE_LENGTH = 75;
      // automatically start with 4 new lines (3 /n chars in discrepancy text plus one more for margin)
      let newLines = 4;
      // first chunk -> discrepancy id, conditional cos, and observation
      // second chunk -> discrepancy text body
      // third chunk -> observation
      const chunks = [firstTextChunk, secondTextChunk, thirdTextChunk];

      // for each chunk, check the length and to add lines recursively
      for (let i = 0; i < chunks.length; i++) {
        const length = chunks[i].length;
        newLines += addLines(length, MAX_LINE_LENGTH);
      }
      return newLines;
    };

    const fillPdf = async pdf => {
      const pdfDoc = await PDFDocument.load(pdf);
      const form = pdfDoc.getForm();

      fillMetaData(form);
      fillBackgroundSection(form);
      fillTemperatureSection(form);
      fillSanatizingTempSection(form);
      fillSanatizingConcentrationSection(form);

      // DISCREPANCIES //
      const uniqueDiscrepancies = new Set([
        '2-301.11',
        '2-301.12',
        '2-301.14',
        '3-301.12',
        '3-202.11',
        '3-202.15',
        '3-302.11',
        '3-302.13',
        '3-304.11',
        '3-306.13',
        '3-303.11',
        '3-501.19',
        '3-502.11',
        '3-502.12',
        '8-103.12',
        '4-101.11',
        '4-101.14',
        '4-101.15',
        '4-201.12',
        '4-202.11',
        '4-204.13',
        '4-204.111',
        '4-102.11',
        '4-501.12',
        '5-101',
        '5-102',
        '5-201',
        '5-202',
        '5-203',
        '5-205',
        '5-301',
        '5-302',
        '5-303',
        '5-304',
        '5-402.11',
        '5-402.13',
        '5-403.11',
        '6-202.111',
      ]);
      const onlyNonCriticalCheckBoxItems = new Set([1, 5, 6, 9, 11, 13, 17, 25]);

      // initialize variables
      let discrepancyText = '';
      let itemText = '';
      let numCritical = 0;
      let numNonCriticalCOS = 0;
      let numNonCritical = 0;
      let numCriticalCOS = 0;

      discrepanciesList.sort((a, b) => {
        return parseInt(a.item) - parseInt(b.item);
      });

      let IHH = false;
      const itemsProcessed = new Set();
      for (let i = 0; i < discrepanciesList.length; i++) {
        const referenceDiscrepancy = discrepanciesList[i];

        // if any discrepancy has an imminent health hazard
        if (referenceDiscrepancy.ihh) IHH = true;

        // if the item num has already been processed move on to the next iteration
        if (itemsProcessed.has(referenceDiscrepancy.item)) continue;

        itemsProcessed.add(referenceDiscrepancy.item);
        // creates a list of all of the selected discrepancies that have the current discrepancies item number
        const itemGrouping = discrepanciesList.filter(x => x.item === referenceDiscrepancy.item);

        let itemCritical = false;
        let itemCriticalCount = 0;
        let itemCOSCount = 0;
        // loop through the discrancies that have the current item number
        for (let i = 0; i < itemGrouping.length; i++) {
          const discrepancy = itemGrouping[i];

          // check the item on the form on the first iteration
          if (i === 0) form.getCheckBox(`item__${discrepancy.item}`).check();

          // if item grouping does not have a critical finding yet
          // continute to check for critical findings
          if (!itemCritical) {
            if (discrepancy.header.includes('*')) {
              // ensure the finding is truly critical
              if (!checkNonCritical(discrepancy)) {
                itemCritical = true;
                itemCriticalCount++;
              }
            }
          }

          // critical discrepancies within non critical item groupings
          if (uniqueDiscrepancies.has(discrepancy.section)) {
            const formId = discrepancy.section.replace(/[-.]/g, '');
            // check the unique discrepancy section on the form
            form.getCheckBox(formId).check();
          }

          // address the unique swing discrepancy withing item grouping 2
          if (discrepancy.section === '2-201.11' && discrepancy.uppercase_letter_id === '(A)') {
            form.getCheckBox('220111(A)').check();
          }

          // determine the text to be written on the form based on the discrepancy object
          const conditionalCOS = discrepancy.COS ? 'COS' : 'not COS';

          // track corrected on site count for each item grouping
          // this is because all discrepancies from the item grouping
          // have to be COS in order to mark the item 'COS'
          if (discrepancy.COS) itemCOSCount++;

          // the burden for marking repeat is 1 item within the group so
          // we do not have to track the count, simply mark repeat after
          // encoutering one
          if (discrepancy.repeat) form.getCheckBox(`item__${discrepancy.item}__R`).check();

          // conditional asterkisks to put after the seciton number in the discrepancy text block
          const conditionalAsterisks = discrepancy?.header?.includes('*') ? '*' : '';

          // add discrepancy text to larger discrepancy text
          let text = `${discrepancy.section}${discrepancy?.children[0]?.uppercase_letter_id}${
            discrepancy?.children[0]?.number_id
          }${
            discrepancy?.children[0]?.children[0]?.lowercase_letter_id
          }${conditionalAsterisks}: ${conditionalCOS}. ${
            discrepancy.ihh ? 'IMMINENT HEALTH HAZARD :' : ''
          } ${discrepancy.observation}\n${discrepancy.text}${discrepancy?.children[0]?.text}${
            discrepancy?.children[0]?.children[0]?.text
          }${discrepancy?.children[0]?.children[0]?.children[0]?.text}\ncorrective action: ${
            discrepancy.corrective
          }\n`;
          text = text.replace(/undefined/g, '');

          const firstTextChunk =
            `${discrepancy.section}${discrepancy?.children[0]?.uppercase_letter_id}${discrepancy?.children[0]?.number_id}${discrepancy?.children[0]?.children[0]?.lowercase_letter_id}${conditionalAsterisks}: ${conditionalCOS}. ${discrepancy.observation}`.replace(
              /undefined/g,
              '',
            );
          const secondTextChunk =
            `${discrepancy.text}${discrepancy?.children[0]?.text}${discrepancy?.children[0]?.children[0]?.text}${discrepancy?.children[0]?.children[0]?.children[0]?.text}`.replace(
              /undefined/g,
              '',
            );
          const thirdTextChunk = `corrective action: ${discrepancy.corrective}`;

          if (discrepancyText != '') {
            discrepancyText = discrepancyText + '\n' + text;
          } else {
            discrepancyText = text;
          }

          // ITEM NUM //
          // const maxCharacters = getMaxCharacters(form, pdfDoc);
          const newLines = getItemNewLines(firstTextChunk, secondTextChunk, thirdTextChunk);
          itemText = itemText + `${discrepancy.item}`;
          for (let i = 0; i < newLines; i++) {
            itemText = itemText + `\n`;
          }

          form.getTextField('item__text').setText(itemText);
        }

        // determine if all discrepancies belonging to a critical item grouping
        // were non-critical
        if (onlyNonCriticalCheckBoxItems.has(parseInt(referenceDiscrepancy.item))) {
          if (itemCriticalCount === 0) {
            form
              .getCheckBox(`item__${parseInt(referenceDiscrepancy.item)}__only__non__critical`)
              .check();
          }
        }

        // corrected on site
        if (itemCOSCount === itemGrouping.length) {
          form.getCheckBox(`item__${referenceDiscrepancy.item}__COS`).check();
          itemCritical ? numCriticalCOS++ : numNonCriticalCOS++;
          // not corrected on site
        } else {
          itemCritical ? numCritical++ : numNonCritical++;
        }
      }

      // IHH //
      if (IHH === true) {
        form.getCheckBox('imminent__health__hazard').check();
      }

      // NANO //
      for (let i = 0; i < nanoValues.length; i++) {
        if (nanoValues[i]?.NA) form.getCheckBox(nanoValues[i].formIdNA).check();
        if (nanoValues[i]?.NO) form.getCheckBox(nanoValues[i].formIdNO).check();
      }

      // FREE TEXT //
      if (freeText != '') {
        discrepancyText = discrepancyText + `\n${freeText}\n`;
      }

      // COMPLIANCE RATING //
      form.getTextField('number__of__critical').setText(`${numCritical + numCriticalCOS}`);
      form
        .getTextField('number__of__non__critical')
        .setText(`${numNonCritical + numNonCriticalCOS}`);

      form.getTextField('specify__discrepancies').setText(discrepancyText);

      const finalRating = getComplianceRating(
        IHH,
        numCritical,
        numNonCritical,
        numCriticalCOS,
        numNonCriticalCOS,
      );
      form.getCheckBox(`${finalRating}__1`).check();
      // form.getCheckBox(`${finalRating}__2`).check();
      // form.getCheckBox(`${finalRating}__3`).check();

      // save pdf as unit8array
      const unit8Array = await pdfDoc.save();
      // save pdf as base64
      const base64 = await pdfDoc.saveAsBase64();
      setBase64Pdf(base64);
      setPdf(unit8Array);
    };

    const run = async () => {
      try {
        const pdf = await retrievePdf();
        await fillPdf(pdf);
        setLoading(false);
      } catch (error) {
        const db = getFirestore(firebaseApp);
        await addDoc(collection(db, 'mail'), {
          to: ['fourxecho@gmail.com'],
          message: {
            subject: 'Error Detected',
            html: `${error} \n ${discrepanciesList} `,
          },
        });
        setErrorModalVisible(true);
        setErrorMessage(
          'The DD 2973 cannot be processed, most likely due an internal error. The issue is being adrressed',
        );
        navigation.navigate('nav');
      }
    };

    run();
  }, []);

  const signDoc = async () => {
    setLoading(true);
    setActivityLabel('signing PDF');
    const pdfDoc = await PDFDocument.load(pdf);

    const inspectorImage = await pdfDoc.embedPng(inspectorSignature);
    const picImage = await pdfDoc.embedPng(picSignature);
    const page = pdfDoc.getPage(1);
    page.drawImage(inspectorImage, {
      x: 27.541,
      y: 79.271,
      width: 400,
      height: 25,
      opacity: 1.0,
    });

    page.drawImage(picImage, {
      x: 27.541,
      y: 48.391,
      width: 400,
      height: 25,
      opacity: 1.0,
    });

    const form = pdfDoc.getForm();
    form.getTextField('date__signed__inspector').setText(moment().format('YYYYMMDD'));
    form.getTextField('date__signed__pic').setText(moment().format('YYYYMMDD'));
    const base64 = await pdfDoc.saveAsBase64();
    const unit8Array = await pdfDoc.save();
    setBase64Pdf(base64);
    setPdf(unit8Array);
    return unit8Array;
  };

  const uploadPdf = async pdf => {
    // upload unit8Array to google cloud storage bucket
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `pdf/${backgroundValues[0]?.text ?? 'inspection'}-${moment().format('YYYYMMDD')}.pdf`,
    );
    await uploadBytesResumable(storageRef, pdf);
    return storageRef;
  };

  const sendEmail = async storageRef => {
    // upload special array to firestore which triggers email
    const db = getFirestore(firebaseApp);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'mail'), {
      to: [backgroundValues[6]?.text, backgroundValues[10]?.text, backgroundValues[12]?.text],
      message: {
        subject: 'Report from your inspection',
        html: `Hello, your food inspection report can be downloaded using the following url ${url} `,
      },
    });
  };

  const main = pdf => {
    setActivityLabel('uploading PDF');
    uploadPdf(pdf)
      .then(storageRef => {
        setActivityLabel('sending emails');
        sendEmail(storageRef)
          .then(() => {
            setLoading(false);
            setActivityLabel('preparing PDF');
            setFinished(true);
          })
          .catch(err => console.log(err));
      })
      .catch(() => {
        setErrorModalVisible(true);
        setErrorMessage(
          'The DD 2973 cannot be processed, most likely due to network connectivity issues',
        );
        navigation.navigate('nav');
      });
  };

  if (!finished) {
    if (!loading) {
      return (
        <>
          <View style={styles.signatureContainer}>
            <Signatures />
            <Buttons
              navigation={navigation}
              signDoc={signDoc}
              main={main}
              setLoading={setLoading}
            />
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.parentContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.indicatorText}>{activityLabel}</Text>
            <View style={{ height: '30%' }}>
              <WaveIndicator size={100} animating={loading} />
            </View>
          </View>
        </View>
      );
    }
  } else {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.contentContainer}>
          <WellDone navigation={navigation} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  parentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  signatureContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 100,
  },
  indicatorText: {
    fontFamily: 'Raj',
    fontSize: 40,
  },
});

export default Done;
