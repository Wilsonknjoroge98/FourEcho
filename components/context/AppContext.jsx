import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [pdf, setPdf] = useState(null);
  const [discrepanciesList, setDiscrepanciesList] = useState([]);
  const [backgroundValues, setBackgroundValues] = useState([]);
  const [tempValues, setTempValues] = useState([{}]);
  const [sanitizingConcentrationValues, setSanitizingConcentrationValues] =
    useState([{}]);
  const [sanitizingTempValues, setSanitizingTempValues] = useState([{}]);
  const [tempArr, setTempArr] = useState(Array.from(Array(3).keys()));
  const [itemGroup, setItemGroup] = useState();
  const [itemId, setItemId] = useState('');
  const [filterLoading, setFilterLoading] = useState(false);
  const [discrepancy, setDiscrepancy] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [iHH, setIHH] = useState('');
  const [startTime, setStartTime] = useState('');

  return (
    <AppContext.Provider
      value={{
        pdf,
        setPdf,
        iHH,
        setIHH,
        startTime,
        setStartTime,
        discrepanciesList,
        setDiscrepanciesList,
        backgroundValues,
        setBackgroundValues,
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
        modalVisible,
        setModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
