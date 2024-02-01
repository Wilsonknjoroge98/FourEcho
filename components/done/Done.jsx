import { useEffect, useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Signatures from './sign/Signatures';
import { PDFDocument } from 'pdf-lib';
import firebaseApp from '../../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
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
    base64Pdf,
    backgroundValues,
    inspectionTypeOtherText,
    tempValues,
    sanitizingConcentrationValues,
    sanitizingTempValues,
    discrepanciesList,
    nanoValues,
    iHH,
    freeText,
    startTime,
    inspectorSignature,
    picSignature,
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
    const fillPdf = async pdf => {
      const pdfDoc = await PDFDocument.load(pdf);
      const form = pdfDoc.getForm();

      form.getTextField('todays__date__1').setText(moment().format('YYYYMMDD'));
      form.getTextField('todays__date__2').setText(moment().format('YYYYMMDD'));

      form.getTextField('inspection__start__time').setText(startTime);

      form
        .getTextField('inspection__end__time')
        .setText(moment().format('h:mm'));

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
            form
              .getTextField('inspection__type__other__specify')
              .setText(inspectionTypeOtherText);
          }
        }
      }

      // TEMPERATURE FORM //
      for (i = 0; i < tempValues.length; i++) {
        form
          .getTextField(`temp__item__location__${i + 1}`)
          .setText(tempValues[i]?.description);

        const tempField = form.getTextField(`temp__temp__${i + 1}`);
        const tempVal = tempValues[i]?.temp;
        const temp =
          tempValues[i]?.metric === 'C' ? `${tempVal}°C` : `${tempVal}°F`;

        if (tempVal) tempField.setText(temp);
      }

      // SANITIZING TEMP FORM //
      for (i = 0; i < sanitizingTempValues.length; i++) {
        if (sanitizingTempValues[i]?.NA) {
          form.getCheckBox(`sanitizing__temp__NA__${i + 1}`).check();
        } else {
          const tempField = form.getTextField(`sanitizing__temp__${i + 1}`);
          const tempVal = sanitizingTempValues[i]?.temp;
          const temp =
            sanitizingTempValues[i]?.metric === 'C'
              ? `${tempVal}°C`
              : `${tempVal}°F`;
          if (tempVal) tempField.setText(temp);
        }
      }

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

      // DISCREPANCIES //
      const uniqueDiscrepancies = new Set([
        '2-301.11',
        '2-301.12',
        '2-301.14',
        '3-301.12',
        '3-301.11',
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
      ]);
      const onlyNonCriticalCheckBoxItems = new Set([
        1, 5, 6, 9, 11, 13, 17, 25,
      ]);
      let discrepancyText = '';
      let itemText = '';
      let numCritical = 0;
      let numNonCriticalCOS = 0;
      let numNonCritical = 0;
      let numCriticalCOS = 0;

      const checkNonCritical = dict => {
        if (dict.noncritical) return true;
        else if (dict.children && dict.children.length > 0) {
          return checkNonCritical(dict.children);
        }
        return false;
      };

      const getComplianceRating = (
        iHH,
        numCritical,
        numNonCritical,
        numCriticalCOS,
        numNonCriticalCOS,
      ) => {
        if (iHH != '' || numCritical > 0) {
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

      const getItemNewLines = (observationLength, correctiveActionLength) => {
        let newLines = 3;
        const observationIncrement = Math.floor(observationLength / 100);
        for (let i = 0; i < observationIncrement; i++) {
          newLines++;
        }
        const correctiveActionIncrement = Math.floor(
          correctiveActionLength / 100,
        );
        for (let i = 0; i < correctiveActionIncrement; i++) {
          newLines++;
        }
        return newLines;
      };

      discrepanciesList.sort((a, b) => {
        return parseInt(a.item) - parseInt(b.item);
      });

      const itemsProcessed = new Set();
      for (let i = 0; i < discrepanciesList.length; i++) {
        const referenceDiscrepancy = discrepanciesList[i];

        if (itemsProcessed.has(referenceDiscrepancy.item)) continue;

        itemsProcessed.add(referenceDiscrepancy.item);
        const itemGrouping = discrepanciesList.filter(
          x => x.item === referenceDiscrepancy.item,
        );

        let itemCritical = false;
        let itemCriticalCount = 0;
        let itemCOSCount = 0;
        for (let i = 0; i < itemGrouping.length; i++) {
          const discrepancy = itemGrouping[i];

          // if item grouping does not have a critical finding yet
          // continute to check for critical findings
          if (!itemCritical) {
            if (discrepancy.header.includes('*')) {
              // ensure the finding is critical
              if (!checkNonCritical(discrepancy)) {
                itemCritical = true;
                itemCriticalCount++;
              }
            }
          }

          // critical discrepancies within non critical item groupings
          if (uniqueDiscrepancies.has(discrepancy.section)) {
            const formId = discrepancy.section.replace(/[-.]/g, '');
            form.getCheckBox(formId).check();
          }

          // address the unique swing discrepancy withing item grouping 2
          if (
            discrepancy.section === '2-201.11' &&
            discrepancy.uppercase_letter_id === '(A)'
          ) {
            form.getCheckBox('220111(A)').check();
          }

          // only need to run check operation on the first iteration
          if (i === 0) {
            form.getCheckBox(`item__${discrepancy.item}`).check();
          }

          const conditionalCOS = discrepancy.COS ? 'COS' : 'not COS';

          // track corrected on site count for each item grouping
          // this is because all discrepancies from the item grouping
          // have to be COS in order to mark the item 'COS'
          if (discrepancy.COS) itemCOSCount++;

          // the burden for marking repeat is 1 item within the group so
          // we do not have to track the count, simply mark repeat after
          // encoutering one
          if (discrepancy.repeat) {
            form.getCheckBox(`item__${discrepancy.item}__R`).check();
          }

          // conditional asterkisks to put after the seciton number in the
          // discrepancy text block
          const conditionalAsterisks = discrepancy?.header?.includes('*')
            ? '*'
            : '';

          // ITEM NUM //

          // get length of text needed to be inserted into the discrepancy text block
          const observationLength =
            `${discrepancy.section}${conditionalAsterisks}: ${conditionalCOS}. ${discrepancy.observation}`
              .length;

          const correctiveActionLength =
            `corrective action: ${discrepancy.corrective}`.length;

          const newLines = getItemNewLines(
            observationLength,
            correctiveActionLength,
          );
          itemText = itemText + `${discrepancy.item}`;
          for (let i = 0; i < newLines; i++) {
            itemText = itemText + `\n`;
          }

          form.getTextField('item__text').setText(itemText);

          // add discrepancy text to larger discrepancy text
          let text = `${discrepancy.section}${discrepancy?.children[0]?.uppercase_letter_id}${discrepancy?.children[0]?.number_id}${discrepancy?.children[0]?.children[0]?.lowercase_letter_id}${conditionalAsterisks}: ${conditionalCOS}. ${discrepancy.observation}\ncorrective action: ${discrepancy.corrective}\n`;
          text = text.replace(/undefined/g, '');
          if (discrepancyText != '') {
            discrepancyText = discrepancyText + '\n' + text;
          } else {
            discrepancyText = text;
          }
        }

        // determine if all discrepancies belonging to a critical item grouping
        // were non-critical
        if (
          onlyNonCriticalCheckBoxItems.has(parseInt(referenceDiscrepancy.item))
        ) {
          if (itemCriticalCount === 0) {
            form
              .getCheckBox(
                `item__${parseInt(
                  referenceDiscrepancy.item,
                )}__only__non__critical`,
              )
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
      if (iHH != '') {
        form.getCheckBox('imminent__health__hazard').check();
        discrepancyText =
          discrepancyText + `\nIMMINENT HEALTH HAZARD: ${iHH}\n`;
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
      form
        .getTextField('number__of__critical')
        .setText(`${numCritical + numCriticalCOS}`);
      form
        .getTextField('number__of__non__critical')
        .setText(`${numNonCritical + numNonCriticalCOS}`);

      form.getTextField('specify__discrepancies').setText(discrepancyText);

      const finalRating = getComplianceRating(
        iHH,
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

    retrievePdf().then(pdf => fillPdf(pdf).then(() => setLoading(false)));
  }, []);

  const signDoc = async () => {
    setLoading(true);
    setActivityLabel('signing PDF...');
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
    form
      .getTextField('date__signed__inspector')
      .setText(moment().format('YYYYMMDD'));
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
      `pdf/${backgroundValues[0]?.text ?? 'inspection'}-${moment().format(
        'YYYYMMDD',
      )}.pdf`,
    );
    await uploadBytesResumable(storageRef, pdf);
    return storageRef;
  };

  const sendEmail = async storageRef => {
    // upload special array to firestore which triggers email
    const db = getFirestore(firebaseApp);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'mail'), {
      to: backgroundValues[6]?.text,
      message: {
        subject: 'Report from your inspection',
        html: `Hello, your food inspection report can be downloaded using the following url ${url} `,
      },
    });

    await addDoc(collection(db, 'mail'), {
      to: backgroundValues[10]?.text,
      message: {
        subject: 'Report from your inspection',
        html: `Hello, your food inspection report can be downloaded using the following url ${url} `,
      },
    });

    await addDoc(collection(db, 'mail'), {
      to: backgroundValues[11]?.text,
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
        // setErrorModalVisible(true)
        // setErrorModalMessgae('The DD 2973 cannot be processed, most likely due to network connectivity issues')
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
