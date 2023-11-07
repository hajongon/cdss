import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import AppContext from 'context/Context'
import { settings } from './config'
import { getColor, getItemFromStore } from 'helpers/utils'
import { configReducer } from './reducers/configReducer'
import useToggleStyle from './hooks/useToggleStyle'

import { Chart as ChartJS, registerables } from 'chart.js'
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

  // 혈액 검사 이력
  const [serumData, setSerumData] = useState([])

  // Anti Sensrslt
  const [snsrsltData, setSnsrsltData] = useState([])

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
    hist: false
  })

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
        snsrsltData,
        setSnsrsltData,
        treemapDataRange,
        setTreemapDataRange,
        ordCount,
        setOrdCount,
        allOrdCount,
        setAllOrdCount,
        noDataError,
        setNoDataError
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

Main.propTypes = { children: PropTypes.node }

export default Main
