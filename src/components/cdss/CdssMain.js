import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import PatientInfo from './PatientInfo'
import PatientSymptom from './PatientSymptom'
import SymptomSite from './SymptomSite'
import TestResults from './TestResults'
import AdrHistory from './AdrHistory'
import DiagnosticResult from './DiagnosticResult'
import './CdssMain.css'

import AppContext from 'context/Context'
import AntiSensrsltAfterAdm from './AntiSensrsltAfterAdm'
import AntiSensrsltBeforeAdm from './AntiSensrsltBeformAdm'
import { getPatientsInfo } from './apis/patients'
import { processPatientsData } from './utils/transformData'

const CdssMain = () => {
  const [showResult, setShowResult] = useState(false)
  const [isPatientSelected, setIsPatientSelected] = useState(false)

  const { setPatientsInfo } = useContext(AppContext)

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 576)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 576)
    }

    // 리사이즈 이벤트 리스너 등록 -- jsha
    window.addEventListener('resize', handleResize)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거 -- jsha
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollRef = useRef(null)

  const onClickDiagnosisBtn = () => {
    if (isPatientSelected) setShowResult(true)
    else alert('환자를 선택해주세요.')
  }

  useEffect(() => {
    if (scrollRef.current) {
      if (showResult) {
        // 결과가 표시될 때 스크롤을 맨 아래로 이동 -- jsha
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      } else {
        // 결과가 숨겨질 때 스크롤을 맨 위로 이동 -- jsha
        scrollRef.current.scrollTop = 0
      }
    }
  }, [showResult])

  useEffect(() => {
    const fetchPatientsInfo = async () => {
      const fetchedPatientsInfo = await getPatientsInfo()
      if (fetchedPatientsInfo.status === 'success') {
        // Process the data to remove duplicates and keep only the most recent entries -- jsha
        const processedData = processPatientsData(fetchedPatientsInfo.data)
        setPatientsInfo(processedData)
      } else {
        console.log(fetchedPatientsInfo.error)
      }
    }

    fetchPatientsInfo()
  }, [])

  return (
    <div className="cdss-test-container overflow-hidden">
      <Row className="g-3">
        <Col
          xl={8}
          className="scrollbar"
          style={{
            ...(window.innerWidth >= 576 && {
              maxHeight: 'calc(100vh - var(--falcon-top-nav-height) - 1rem)',
              overflowY: 'auto',
              position: 'relative'
            })
          }}
          ref={scrollRef}
        >
          <Row
            className={`mb-3 g-3 ${isLargeScreen ? 'sticky-top' : ''}`}
            style={{
              top: '-1rem'
            }}
          >
            <Col xs={12}>
              <PatientInfo
                showResult={showResult}
                setShowResult={setShowResult}
                setIsPatientSelected={setIsPatientSelected}
              />
            </Col>
          </Row>

          <Row className="mb-3 g-3">
            <Col md={6} xs={12}>
              <PatientSymptom />
            </Col>
            <Col md={6} xs={12}>
              <SymptomSite />
            </Col>
          </Row>

          {isPatientSelected ? (
            <>
              <Row className="mb-3 g-3">
                <Col md={12} xs={12}>
                  <TestResults />
                </Col>
              </Row>
            </>
          ) : null}
          {!showResult ? (
            <Row className="g-1 mb-3">
              <Col md={12} xs={12} lg={12}>
                <Button
                  variant="primary"
                  type="button"
                  className="fs--1 align-self-center w-100"
                  onClick={onClickDiagnosisBtn}
                >
                  항생제 내성 판단
                </Button>
              </Col>
            </Row>
          ) : null}
          {showResult && isPatientSelected ? (
            <Row className="mb-3 g-3">
              <Col md={12} xs={12}>
                <DiagnosticResult setShowResult={setShowResult} />
              </Col>
            </Row>
          ) : null}
        </Col>

        <Col
          xl={4}
          className="scrollbar"
          style={{
            ...(window.innerWidth >= 576 && {
              maxHeight: 'calc(100vh - var(--falcon-top-nav-height) - 1rem)',
              overflowY: 'scroll',
              boxSizing: 'border-box'
            })
          }}
        >
          <Row className="mb-3 g-3">
            <Col md={12} xs={12}>
              <AntiSensrsltAfterAdm isPatientSelected={isPatientSelected} />
            </Col>
          </Row>
          <Row className="mb-3 g-3">
            <Col md={12} xs={12}>
              <AntiSensrsltBeforeAdm isPatientSelected={isPatientSelected} />
            </Col>
          </Row>
          <Row className="mb-3 g-3">
            <Col md={12} xs={12}>
              <AdrHistory />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CdssMain
