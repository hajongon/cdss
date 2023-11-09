import React, { useState, useEffect, useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import PatientInfo from './PatientInfo'
import PatientSymptom from './PatientSymptom'
import SymptomSite from './SymptomSite'
import TestResults from './TestResults'
import AdrHistory from './AdrHistory'
import AntibioticResistance from './AntibioticResistance'
import SideChartBar from './SideChartBar'
import DiagnosticResult from './DiagnosticResult'
import './Main.css'
import axios from 'axios'

import AppContext from 'context/Context'
import Flex from './Flex'
import transformData from './transformData'

const Main = () => {
  const [showResult, setShowResult] = useState(false)
  const [isPatientSelected, setIsPatientSelected] = useState(false)
  const { setAllOrdCount } = useContext(AppContext)

  // AppContext에서 patientsInfo와 setPatientsInfo를 가져옵니다.
  const { setPatientsInfo } = useContext(AppContext)

  useEffect(() => {
    // GET 요청을 보내고 데이터를 콘솔에 출력
    axios
      .get('http://100.100.100.108:8080/patients')
      .then(response => {
        const fetchedData = response.data
        setPatientsInfo([...fetchedData])
      })
      .catch(error => {
        console.error('에러 발생:', error)
      })

    axios
      .get('http://100.100.100.108:8080/get-ord-count')
      .then(response => {
        const fetchedData = response.data
        // Initialize an empty array to store the transformed data
        // Set the transformed data in your state
        const transformedData = transformData(fetchedData)
        setAllOrdCount(transformedData)
      })
      .catch(error => {
        console.error('에러 발생:', error)
      })
  }, [])

  return (
    <div className="cdss-test-container">
      <Row className="g-3">
        <Col xl={9}>
          <Flex
            direction="column"
            justifyContent="flex-start"
            className="h-100"
          >
            <Row className="mb-3 g-3">
              <Col xs={12}>
                <PatientInfo
                  showResult={showResult}
                  setShowResult={setShowResult}
                  setIsPatientSelected={setIsPatientSelected}
                />
              </Col>
            </Row>

            {!showResult ? (
              <Row className="mb-3 g-3">
                <Col md={6} xs={12}>
                  <PatientSymptom />
                </Col>
                <Col md={6} xs={12}>
                  <SymptomSite />
                </Col>
              </Row>
            ) : (
              <Row className="mb-3 g-3" style={{ flex: '1' }}>
                <Col md={12} xs={12}>
                  <DiagnosticResult setShowResult={setShowResult} />
                </Col>
              </Row>
            )}
            {isPatientSelected ? (
              <>
                <Row className="mb-3 g-3" style={{ flex: '2' }}>
                  <Col md={12} xs={12}>
                    <TestResults />
                  </Col>
                </Row>
                <Row
                  className={isPatientSelected ? `g-3 mb-3` : `g-3`}
                  style={{ flex: '2' }}
                >
                  <Col md={6} xs={12}>
                    <AdrHistory />
                  </Col>
                  <Col md={6} xs={12}>
                    <AntibioticResistance />
                  </Col>
                </Row>
              </>
            ) : null}
            {!showResult ? (
              <Row className="g-1">
                <Button
                  variant="primary"
                  type="button"
                  className="fs--1 align-self-center"
                  onClick={() => setShowResult(true)}
                >
                  항생제 내성 판단
                </Button>
              </Row>
            ) : null}
          </Flex>
        </Col>
        <Col xl={3}>
          <SideChartBar showResult={showResult} />
        </Col>
      </Row>
    </div>
  )
}

export default Main
