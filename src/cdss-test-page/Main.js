import React, { useState, useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
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
import AntiSensrslt from './AntiSensrslt'
import Flex from './Flex'

const Main = () => {
  const [showResult, setShowResult] = useState(false)
  const [isPatientSelected, setIsPatientSelected] = useState(false)
  const [allOrdCount, setAllOrdCount] = useState([])
  console.log(allOrdCount)

  // AppContext에서 patientsInfo와 setPatientsInfo를 가져옵니다.
  const { patientsInfo, setPatientsInfo } = useContext(AppContext)

  useEffect(() => {
    // GET 요청을 보내고 데이터를 콘솔에 출력
    axios
      .get('http://localhost:8080/patients')
      .then(response => {
        const fetchedData = response.data
        setPatientsInfo([...fetchedData])
      })
      .catch(error => {
        console.error('에러 발생:', error)
      })

    axios
      .get('http://localhost:8080/get-ord-count')
      .then(response => {
        const fetchedData = response.data
        // Initialize an empty array to store the transformed data
        const transformedData = []

        // Iterate through the fetchedData array
        for (const item of fetchedData) {
          // Create a new object with the desired structure
          const transformedItem = {
            ptSbstNo: item.ptSbstNo,
            ordcode: item.ordcode,
            ordname: item.ordnameTyp1 || item.ordnameTyp2, // Use ordnameTyp1 if it exists, otherwise use ordnameTyp2
            count: item.count
          }
          // Push the transformedItem to the transformedData array
          transformedData.push(transformedItem)
        }

        // Set the transformed data in your state
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
            justifyContent={isPatientSelected ? 'between' : 'flex-start'}
            className="h-100"
          >
            {/* Courses */}
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
              <Row className="mb-3 g-3">
                <Col md={12} xs={12}>
                  <DiagnosticResult setShowResult={setShowResult} />
                </Col>
              </Row>
            )}

            {isPatientSelected ? (
              <>
                <Row className="mb-3 g-3">
                  <Col md={6} xs={12}>
                    <AntiSensrslt />
                  </Col>
                  <Col md={6} xs={12}>
                    <AdrHistory />
                  </Col>
                </Row>
                <Row className="g-3">
                  <Col md={6} xs={12}>
                    <TestResults />
                  </Col>
                  <Col md={6} xs={12}>
                    <AntibioticResistance />
                  </Col>
                </Row>
              </>
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
