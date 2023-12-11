import React, { useReducer, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppContext from 'context/Context'
import { settings } from './config'
import { getColor, getItemFromStore } from 'helpers/utils'
import { configReducer } from './reducers/configReducer'
import useToggleStyle from './hooks/useToggleStyle'

import { Chart as ChartJS, registerables } from 'chart.js'
import {
  convertDataToEChartsFormat,
  transformArrayToCounts,
  transformData
} from 'components/cdss/utils/transformData'
import axios from 'axios'
ChartJS.register(...registerables)

const Main = props => {
  const configState = {
    isFluid: getItemFromStore('isFluid', settings.isFluid),
    isRTL: getItemFromStore('isRTL', settings.isRTL),
    isDark: getItemFromStore('isDark', settings.isDark),
    navbarPosition: getItemFromStore('navbarPosition', settings.navbarPosition),
    disabledNavbarPosition: [],
    isNavbarVerticalCollapsed: getItemFromStore(
      'isNavbarVerticalCollapsed',
      settings.isNavbarVerticalCollapsed
    ),
    navbarStyle: getItemFromStore('navbarStyle', settings.navbarStyle),
    currency: settings.currency,
    showBurgerMenu: settings.showBurgerMenu,
    showSettingPanel: false,
    navbarCollapsed: false
  }

  const [config, configDispatch] = useReducer(configReducer, configState)

  const { isLoaded } = useToggleStyle(
    config.isRTL,
    config.isDark,
    configDispatch
  )

  const setConfig = (key, value) => {
    configDispatch({
      type: 'SET_CONFIG',
      payload: {
        key,
        value,
        setInStore: [
          'isFluid',
          'isRTL',
          'isDark',
          'navbarPosition',
          'isNavbarVerticalCollapsed',
          'navbarStyle'
        ].includes(key)
      }
    })
  }

  // 환자 리스트
  const [patientsInfo, setPatientsInfo] = useState([])

  // 검사 결과
  const [testResultData, setTestResultData] = useState([])

  // 소변 검사 이력
  const [urineData, setUrineData] = useState([])

  // 자동 화학 면역 검사 이력
  const [serumData, setSerumData] = useState([])

  // 말초 혈액 검사 이력
  const [periphData, setPeriphData] = useState([])

  // Anti Sensrslt
  const [antiSensBeforeAdm, setAntiSensBeforeAdm] = useState([])
  const [antiSensAfterAdm, setAntiSensAfterAdm] = useState([])

  // treemap 전체 or 개별
  const [treemapDataRange, setTreemapDataRange] = useState('entire')

  // 전체 환자 항생제 처방 count
  const [allOrdCount, setAllOrdCount] = useState([])

  // 개별 환자 항생제 처방 count
  const [ordCount, setOrdCount] = useState([])

  // 환자의 처방 이력 존재 여부
  const [noDataError, setNoDataError] = useState({
    urine: false,
    serum: false,
    sensrslt: false,
    hist: false,
    prescription: false,
    adrs: false,
    periph: false
  })

  // 처방 이력 데이터
  const [prescriptions, setPrescriptions] = useState([])
  const [barChartEntireData, setBarChartEntireData] = useState({})
  const [barChartPersonalData, setBarChartPersonalData] = useState({})

  const [eChartsTreemapData, setEChartsTreemapData] = useState({})

  // adr 데이터

  const [adrs, setAdrs] = useState([])

  // 로그인 여부 체크
  const [isLogin, setIsLogin] = useState(false)

  // treemap data fetching

  useEffect(() => {
    const fetchOrdCount = async () => {
      try {
        const ordCountResponse = await axios.request({
          method: 'get',
          url: `${process.env.REACT_APP_API_CDSS_URL}/get-ord-count`
        })
        if (ordCountResponse.data) {
          const fetchedData = ordCountResponse.data

          const transformedData = transformData(fetchedData)
          const transformedBarData = transformArrayToCounts(fetchedData)
          const eChartsFormetData = convertDataToEChartsFormat(fetchedData)

          setAllOrdCount(transformedData)
          setBarChartPersonalData(transformedBarData)
          setEChartsTreemapData(eChartsFormetData)
          setNoDataError(prevState => ({
            ...prevState,
            hist: false
          }))
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNoDataError(prevState => ({
            ...prevState,
            hist: true
          }))
        } else {
          console.error('오류 발생:', error.message)
        }
      }
    }
    fetchOrdCount()
  }, [])

  if (!isLoaded) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: config.isDark ? getColor('dark') : getColor('light')
        }}
      />
    )
  }

  return (
    <AppContext.Provider
      value={{
        config,
        setConfig,
        configDispatch,
        patientsInfo,
        setPatientsInfo,
        urineData,
        setUrineData,
        serumData,
        setSerumData,
        testResultData,
        setTestResultData,
        antiSensBeforeAdm,
        setAntiSensBeforeAdm,
        antiSensAfterAdm,
        setAntiSensAfterAdm,
        treemapDataRange,
        setTreemapDataRange,
        ordCount,
        setOrdCount,
        allOrdCount,
        setAllOrdCount,
        noDataError,
        setNoDataError,
        prescriptions,
        setPrescriptions,
        barChartEntireData,
        setBarChartEntireData,
        barChartPersonalData,
        setBarChartPersonalData,
        adrs,
        setAdrs,
        eChartsTreemapData,
        setEChartsTreemapData,
        periphData,
        setPeriphData,
        isLogin,
        setIsLogin
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

Main.propTypes = { children: PropTypes.node }

export default Main
