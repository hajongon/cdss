import React, { useState, useContext } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientInfo.css'
import axios from 'axios'
import AppContext from 'context/Context'
import { sortByTimestamp } from './timeDateFunction'
import { transformArrayToCounts, transformData } from './transformData'
import PropTypes from 'prop-types'
import transformPrscData from './transformPrscData'

const PatientInfo = ({ setShowResult, setIsPatientSelected }) => {
  // const [isMedicated, setIsMedicated] = useState(false)
  const [patInfoData, setPatInfoData] = useState({
    birthday: '',
    medicineName: '',
    admtime: '',
    dschtime: '',
    sex: '',
    bodytemp: 0
  })

  const {
    setNoDataError,
    patientsInfo,
    setTestResultData,
    setSnsrsltData,
    setTreemapDataRange,
    setOrdCount,
    setPrescriptions,
    setBarChartPersonalData
  } = useContext(AppContext)

  const handleChange = e => {
    setPatInfoData({
      ...patInfoData,
      [e.target.name]: e.target.value
    })
  }

  const onNameChange = async e => {
    if (e.target.value === '이름 선택') {
      // 환자 선택 여부
      setIsPatientSelected(false)
      // treemap 크기 결정
      setTreemapDataRange('entire')
    } else {
      setIsPatientSelected(true)
      setTreemapDataRange('personal')

      // patnoid가 입력받은 값과 같은 데이터만 필터링
      const selectedData = patientsInfo.filter(
        pat => pat.patnoid === e.target.value
      )[0]

      setPatInfoData({ ...selectedData })

      // 해당 데이터의 ptSbstNo를 저장
      const sbstNo = JSON.stringify({
        pt_sbst_no: selectedData.ptSbstNo
      })

      // urine, serum test 결과 모을 배열 정의
      const entireTestResult = []

      try {
        const urineResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/urine/get-by-pt-sbst-no`,
          sbstNo,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (urineResponse.data) {
          entireTestResult.push(...urineResponse.data)
          setNoDataError(prevState => ({
            ...prevState,
            urine: false
          }))
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNoDataError(prevState => ({
            ...prevState,
            urine: true
          }))
        } else {
          // 다른 오류 처리
          console.error('오류 발생:', error.message)
        }
      }

      try {
        const serumResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/serum/get-by-pt-sbst-no`,
          sbstNo,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (serumResponse.data) {
          entireTestResult.push(...serumResponse.data)
          setNoDataError(prevState => ({
            ...prevState,
            serum: false
          }))
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNoDataError(prevState => ({
            ...prevState,
            serum: true
          }))
        } else {
          // 다른 오류 처리
          console.error('오류 발생:', error.message)
        }
      }

      try {
        const snsrsltResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/snsrslt/get-by-pt-sbst-no`,
          sbstNo,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (snsrsltResponse.data) {
          setSnsrsltData([...snsrsltResponse.data])
          setNoDataError(prevState => ({
            ...prevState,
            sensrslt: false
          }))
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNoDataError(prevState => ({
            ...prevState,
            sensrslt: true
          }))
        } else {
          // 다른 오류 처리
          console.error('오류 발생:', error.message)
        }
      }

      if (entireTestResult.length) {
        const dateSortedEntireTestResult = sortByTimestamp(entireTestResult)
        setTestResultData([...dateSortedEntireTestResult])
      }

      // treemap data fetching

      try {
        const ordCountResponse = await axios.request({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}/get-ord-count?ptSbstNo=${selectedData.ptSbstNo}`
        })
        if (ordCountResponse.data) {
          const fetchedData = ordCountResponse.data
          const transformedData = transformData(fetchedData)
          const transformedBarData = transformArrayToCounts(fetchedData)

          setOrdCount(transformedData)
          setBarChartPersonalData(transformedBarData)
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

      try {
        const prescriptionResponse = await axios.request({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}/prescription?ptSbstNo=${selectedData.ptSbstNo}`
        })
        if (prescriptionResponse.data) {
          const fetchedData = prescriptionResponse.data
          const transformedData = transformPrscData(fetchedData)
          setPrescriptions(transformedData)
          setNoDataError(prevState => ({
            ...prevState,
            prescription: false
          }))
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNoDataError(prevState => ({
            ...prevState,
            prescription: true
          }))
        } else {
          console.error('오류 발생:', error.message)
        }
      }
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setShowResult(true)
    setPatInfoData({
      ...patInfoData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Card>
      <FalconCardHeader title="환자 기본 정보" titleClass="fs-0 fw-semi-bold" />
      <Card.Body className="bg-white pb-2 pt-2">
        {/* <Background image={corner1} className="rounded-soft bg-card" /> */}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={2} xs={12} controlId="selectPatient">
              <Form.Label className="fs--1 mb-0 text-600">환자 선택</Form.Label>
              <Form.Select
                size="m"
                className="fs--1 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                onChange={e => {
                  onNameChange(e)
                }}
              >
                <option>이름 선택</option>
                {patientsInfo.map(pat => (
                  <option key={pat.patnoid}>{pat.patnoid}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md={1} lg={1} xs={12} controlId="gender">
              <Form.Label className="fs--1 mb-0 text-600">성별</Form.Label>
              <Form.Select
                size="m"
                className="fs--1 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                name="sex"
                value={patInfoData.sex}
                onChange={e => {
                  handleChange(e)
                }}
              >
                <option>성별</option>
                <option>M</option>
                <option>F</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} lg={3} xs={12} xl={2} controlId="birthday">
              <Form.Label className="fs--1 mb-0 text-600">생년월일</Form.Label>
              <Form.Control
                className="fs--1 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                type="date"
                placeholder="생년월일"
                value={
                  patInfoData.birthday.length
                    ? patInfoData.birthday.slice(0, 10)
                    : ''
                }
                name="birthday"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} lg={1} xs={12} controlId="bodytemp">
              <Form.Label className="fs--1 mb-0 text-600">체온</Form.Label>
              <Form.Control
                className="fs--1 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                type="text"
                placeholder="체온"
                value={patInfoData.bodytemp ? patInfoData.bodytemp : ''}
                name="bodytemp"
                onChange={e => handleChange(e)}
              />
            </Form.Group>
            <Form.Group as={Col} lg={2} xs={12} controlId="period">
              <Form.Label className="fs--1 mb-0 text-600">내원일</Form.Label>
              <Col lg={12}>
                <Form.Control
                  className="fs--1 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                  type="date"
                  placeholder="내원일"
                  value={
                    patInfoData.admtime.length
                      ? patInfoData.admtime.slice(0, 10)
                      : ''
                  }
                  name="admtime"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
          </Row>

          <Row className="mb-3 g-3">
            {/* <Form.Group as={Col} lg={2} controlId="medication">
              <Form.Label className="fs--1 mb-0 text-600">
                항생제 투약 여부
              </Form.Label>
              <Flex direction="row" className="p-2 gap-4" alignItems="center">
                <Form.Check
                  className="custom-label"
                  type="radio"
                  id="item1Radio"
                  label="yes"
                  name="medication"
                  onChange={() => {
                    setIsMedicated(true)
                  }}
                />
                <Form.Check
                  className="custom-label"
                  type="radio"
                  id="item2Radio"
                  label="no"
                  name="medication"
                  onChange={() => {
                    setIsMedicated(false)
                  }}
                />
              </Flex>
            </Form.Group> */}
            {/* {isMedicated ? (
              <Form.Group as={Col} lg={2} controlId="medicineName">
                <Form.Label className="fs--1 mb-0">항생제 성분명</Form.Label>
                <Form.Control
                  className="fs--1 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                  type="text"
                  placeholder="항생제 성분명"
                  value={patInfoData.medicineName}
                  name="medicineName"
                  onChange={handleChange}
                />
              </Form.Group>
            ) : null} */}
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

// Add PropTypes validation
PatientInfo.propTypes = {
  setShowResult: PropTypes.func.isRequired,
  setIsPatientSelected: PropTypes.func.isRequired
}

export default PatientInfo
