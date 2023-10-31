import React, { useState, useEffect } from 'react'
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

const Main = () => {
  const [showResult, setShowResult] = useState(false)
  const [isPatientSelected, setIsPatientSelected] = useState(false)

  useEffect(() => {
    setShowResult(false)
  }, [])

  return (
    <div className="cdss-test-container">
      <Row className="g-3">
        <Col xl={9}>
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
            <Row className="mb-3 g-3">
              <Col md={6} xs={12}>
                <TestResults />
              </Col>
              <Col md={6} xs={12}>
                <Row className="mb-3 g-3">
                  <Col xs={12}>
                    <AdrHistory />
                  </Col>
                </Row>
                <Row className="g-3">
                  <Col xs={12}>
                    <AntibioticResistance />
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : null}
        </Col>

        <Col xl={3}>
          <SideChartBar showResult={showResult} />
        </Col>
      </Row>
    </div>
  )
}

export default Main
