import { useEffect, useContext, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { PDFDocument } from 'pdf-lib';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase';
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

const Done = () => {
  const {
    pdf,
    setPdf,
    backgroundValues,
    tempValues,
    sanitizingConcentrationValues,
    sanitizingTempValues,
    discrepanciesList,
    iHH,
    startTime,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [activityLabel, setActivityLabel] = useState('preparing PDF...');

  useEffect(() => {
    const retrievePdf = async () => {
      const response = await axios.get(
        'https://publichealthapp-5964a.web.app/dd__2973__blank.pdf',
        { responseType: 'arraybuffer' }
      );
      const pdfBytes = response.data;
      setPdf(pdfBytes);
    };

    retrievePdf();
  }, []);

  const fillPdf = async () => {
    const pdfDoc = await PDFDocument.load(pdf);
    const form = pdfDoc.getForm();

    form.getTextField('todays__date__1').setText(moment().format('YYYYMMDD'));
    form.getTextField('todays__date__2').setText(moment().format('YYYYMMDD'));
    form.getTextField('todays__date__3').setText(moment().format('YYYYMMDD'));
    form.getTextField('todays__date__4').setText(moment().format('YYYYMMDD'));

    form.getTextField('inspection__start__time').setText(startTime);

    form.getTextField('inspection__end__time').setText(moment().format('h:mm'));

    // BACKGROUND FORM //
    for (i = 0; i < backgroundValues.length; i++) {
      const obj = backgroundValues[i];
      if (obj.type === 'text') {
        if (obj.formid === 'facility__name') {
          form.getTextField(obj?.formid).setText(obj?.text);
          form.getTextField('facility__name__2').setText(obj?.text);
          form.getTextField('facility__name__3').setText(obj?.text);
          form.getTextField('facility__name__4').setText(obj?.text);
        } else {
          form.getTextField(obj.formid).setText(obj.text);
        }
      } else if (obj.type === 'select') {
        form.getCheckBox(obj?.formid(obj.text)).check();
        form.getCheckBox(`${obj?.formid(obj.text)}__2`).check();
        form.getCheckBox(`${obj?.formid(obj.text)}__3`).check();
        form.getCheckBox(`${obj?.formid(obj.text)}__4`).check();
      }
    }

    // TEMPERATURE FORM //
    for (i = 0; i < tempValues.length; i++) {
      form
        .getTextField(`temp__item__location__${i + 1}`)
        .setText(tempValues[i].description);

      const tempField = form.getTextField(`temp__temp__${i + 1}`);
      const tempVal = tempValues[i].temp;
      const temp =
        tempValues[i].metric === 'F' ? `${tempVal}°F` : `${tempVal}°C`;

      tempField.setText(temp);
    }

    // SANITIZING TEMP FORM //
    for (i = 0; i < sanitizingTempValues.length; i++) {
      if (sanitizingTempValues[i]?.NA) {
        form.getCheckBox(`sanitizing__temp__NA__${i + 1}`).check();
      } else {
        const tempField = form.getTextField(`sanitizing__temp__${i + 1}`);
        const tempVal = sanitizingTempValues[i].temp;
        const temp =
          sanitizingTempValues[i].metric === 'F'
            ? `${tempVal}°F`
            : `${tempVal}°C`;
        tempField.setText(temp);
      }
    }

    // SANITIZING CONCENTRATION FORM //
    for (i = 0; i < sanitizingConcentrationValues.length; i++) {
      if (sanitizingConcentrationValues[i]?.NA) {
        form.getCheckBox(`sanitizing__concentration__NA__${i + 1}`).check();
      } else {
        const ppm = sanitizingConcentrationValues[i].ppm;
        console.log(ppm);
        form.getTextField(`sanitizing__ppm__${i + 1}`).setText(ppm);
        const solution = sanitizingConcentrationValues[i].solution;
        if (solution === 'Quats') {
          form.getCheckBox(`sanitizing__quats__${i + 1}`).check();
        } else if (solution === 'Bleach') {
          form.getCheckBox(`sanitizing__bleach__${i + 1}`).check();
        }
      }
    }

    // // DISCREPANCIES //
    let discrepancyText = '';
    let numCritical = 0;
    if (iHH != '') {
      form.getCheckBox('imminent__health__hazard').check();
      discrepancyText = `IMMINENT HEALTH HAZARD: ${iHH}\n`;
    }
    discrepanciesList.sort((a, b) => {
      const itemVal1 = Number(a.item.search(/(\d\d?)/));
      const itemVal2 = Number(b.item.search(/(\d\d?)/));
      return itemVal1 - itemVal2;
    });

    const checkNonCritical = dict => {
      if (dict.noncritical) return true;
      else if (dict.children && dict.children.length > 0) {
        return checkNonCritical(dict.children);
      }
      return false;
    };

    for (let i = 0; i < discrepanciesList.length; i++) {
      const discrepancy = discrepanciesList[i];

      if (discrepancy.header.includes('*')) {
        if (!checkNonCritical(discrepancy)) {
          numCritical++;
        }
      }

      form.getCheckBox(`item__${discrepancy.item}`).check();

      let COS_string = '';
      if (discrepancy.COS) {
        COS_string = 'COS';
        form.getCheckBox(`item__${discrepancy.item}__COS`).check();
      } else {
        COS_string = 'not COS';
      }
      if (discrepancy.repeat) {
        form.getCheckBox(`item__${discrepancy.item}__R`).check();
      }

      let text = `item${discrepancy.item}\n${discrepancy.section}: ${COS_string}.${discrepancy.observation}\n${discrepancy.text}${discrepancy?.children[0]?.text}${discrepancy?.children[0]?.children[0]?.text}${discrepancy?.children[0]?.children[0]?.children[0]?.text}\ncorrective action: ${discrepancy.corrective}\n`;
      text = text.replace(/undefined/g, '');
      if (discrepancyText != '') {
        discrepancyText = discrepancyText + '\n\n' + text;
      } else {
        discrepancyText = text;
      }
    }

    form.getTextField('number__of__critical').setText(`${numCritical}`);
    form
      .getTextField('number__of__non__critical')
      .setText(`${discrepanciesList.length - numCritical}`);

    // Provision Number: COS or NO. observation..... actual text from tri service food code.....corrective action.
    form.getTextField('specify__discrepancies').setText(discrepancyText);

    let nonCriticalCOS = 0;
    let nonCritical = 0;
    let criticalCOS = 0;
    let critical = 0;
    const getComplianceRating = (iHH, discrepanciesList) => {
      for (let i = 0; i < discrepanciesList.length; i++) {
        const discrepancy = discrepanciesList[i];

        if (discrepancy.header.includes('*')) {
          if (!checkNonCritical(discrepancy)) {
            if (discrepancy.COS) {
              criticalCOS++;
            } else {
              critical++;
            }
          }
        } else {
          if (discrepancy.COS) {
            nonCriticalCOS++;
          } else {
            nonCritical++;
          }
        }
      }

      if (iHH != '' || critical > 0) {
        return 'non__compliant';
      } else if (criticalCOS >= 3 || nonCritical >= 6) {
        return 'partially__compliant';
      } else {
        if (criticalCOS != 0 || nonCriticalCOS > 4) {
          return 'substantially__compliant';
        } else {
          return 'fully__compliant';
        }
      }
    };

    const finalRating = getComplianceRating(iHH, discrepanciesList);
    form.getCheckBox(`${finalRating}__1`).check();
    form.getCheckBox(`${finalRating}__2`).check();
    form.getCheckBox(`${finalRating}__3`).check();

    // save pdf as unit8array
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  const app = initializeApp(firebaseConfig);
  const uploadPdf = async pdfBytes => {
    // upload unit8Array to google cloud storage bucket
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `pdf/${backgroundValues[4]?.text}-${Date.now().toString()}.pdf`
    );
    await uploadBytesResumable(storageRef, pdfBytes);
    return storageRef;
  };

  const sendEmail = async storageRef => {
    // upload special array to firestore which triggers email
    const db = getFirestore(app);
    const url = await getDownloadURL(storageRef);
    await addDoc(collection(db, 'mail'), {
      to: backgroundValues[6]?.text,
      message: {
        subject: 'Report from your inspection',
        html: `Hello, your inspection report can be downloaded from the following url ${url} `,
      },
    });
  };

  const main = () => {
    setLoading(true);
    fillPdf()
      .then(pdfBytes => {
        setActivityLabel('uploading PDF...');
        uploadPdf(pdfBytes)
          .then(storageRef => {
            setActivityLabel('sending email...');
            sendEmail(storageRef)
              .then(() => {
                setLoading(false);
                setActivityLabel('preparing PDF...');
              })
              .catch(err => console.log(err));
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (!uploadComplete) {
    if (!loading) {
      return (
        <View style={styles.parentContainer}>
          <TouchableOpacity style={styles.doneButton} onPress={main}>
            <Text style={styles.doneButtonText}>Submit and Send</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.parentContainer}>
          <View style={styles.contentContainer}>
            <ActivityIndicator
              style={styles.activityIndicator}
              animating={loading}
              size="large"
              color="#000000"
            />
            <Text style={styles.indicatorText}>{activityLabel}</Text>
          </View>
        </View>
      );
    }
  } else {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.doneText}>ALL DONE!</Text>
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
  doneText: {
    fontFamily: 'Raj',
    fontSize: 18,
  },
  doneButton: {
    textTransofrm: 'uppercase',
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: '#76ff03',
    width: 300,
    marginLeft: 30,
    marginRight: 30,
    padding: 15,
    marginBottom: 150,
  },

  doneButtonText: {
    color: 'black',
    fontFamily: 'Cairo',
    fontSize: 20,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 100,
  },
  indicatorText: {
    fontFamily: 'Raj',
    fontSize: 18,
  },
});

export default Done;
