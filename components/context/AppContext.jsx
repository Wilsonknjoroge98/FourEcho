import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [pdf, setPdf] = useState(null);
  const [base64Pdf, setBase64Pdf] = useState(null);
  const [discrepanciesList, setDiscrepanciesList] = useState([]);
  const [backgroundValues, setBackgroundValues] = useState([]);
  const [inspectionTypeOther, setInspectionTypeOther] = useState(false);
  const [inspectionTypeOtherText, setInspectionTypeOtherText] = useState('');
  const [validEmailPIC, setValidEmailPIC] = useState(false);
  const [validEmailInspector, setValidEmailInspector] = useState(false);
  const [tempValues, setTempValues] = useState([{}]);
  const [sanitizingConcentrationValues, setSanitizingConcentrationValues] = useState([{}]);
  const [sanitizingTempValues, setSanitizingTempValues] = useState([{}]);
  const [tempArr, setTempArr] = useState(Array.from(Array(3).keys()));
  const [itemGroup, setItemGroup] = useState();
  const [itemId, setItemId] = useState('');
  const [filterLoading, setFilterLoading] = useState(false);
  const [discrepancy, setDiscrepancy] = useState({});
  const [discrepancyModalVisible, setDiscrepancyModalVisible] = useState(false);
  const [nanoInfo, setNanoInfo] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [startTime, setStartTime] = useState('');
  const [inspectorSignature, setInspectorSignature] = useState(null);
  const [picSignature, setPICSignature] = useState(null);
  const [freeText, setFreeText] = useState('');
  const [nanoValues, setNanoValues] = useState([]);
  const [supportModalVisible, setSupportModalVisible] = useState(false);
  const [validEmailPersonal, setValidEmailPersonal] = useState(false);
  const [inspectorEmailMessage, setInspectorEmailMessage] = useState('');
  const [pageLoading, setPageLoading] = useState(false);
  const [inspectorMessageModalVisible, setInspectorMessageModalVisible] = useState(false);

  return (
    <AppContext.Provider
      value={{
        pdf,
        setPdf,
        base64Pdf,
        setBase64Pdf,
        startTime,
        setStartTime,
        discrepanciesList,
        setDiscrepanciesList,
        backgroundValues,
        setBackgroundValues,
        inspectionTypeOther,
        setInspectionTypeOther,
        inspectionTypeOtherText,
        setInspectionTypeOtherText,
        validEmailInspector,
        validEmailPIC,
        validEmailPersonal,
        setValidEmailInspector,
        setValidEmailPIC,
        setValidEmailPersonal,
        sanitizingConcentrationValues,
        setSanitizingConcentrationValues,
        sanitizingTempValues,
        setSanitizingTempValues,
        tempValues,
        setTempValues,
        tempArr,
        setTempArr,
        itemGroup,
        setItemGroup,
        itemId,
        setItemId,
        filterLoading,
        setFilterLoading,
        discrepancy,
        setDiscrepancy,
        discrepancyModalVisible,
        setDiscrepancyModalVisible,
        inspectorSignature,
        setInspectorSignature,
        picSignature,
        setPICSignature,
        freeText,
        setFreeText,
        nanoValues,
        setNanoValues,
        nanoInfo,
        setNanoInfo,
        errorModalVisible,
        setErrorModalVisible,
        errorMessage,
        setErrorMessage,
        supportModalVisible,
        setSupportModalVisible,
        inspectorEmailMessage,
        setInspectorEmailMessage,
        pageLoading,
        setPageLoading,
        inspectorMessageModalVisible,
        setInspectorMessageModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
