import React, { useState, useEffect, useContext } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'
import { testResultData } from './dummyData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVial, faBacterium } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import AppContext from 'context/Context'
import Flex from './Flex'
import { formatDate, sortByDate } from './timeDateFunction'

const AntiSensrslt = () => {
  const { snsrsltData, setSnsrsltData } = useContext(AppContext)

  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader title="Anti sensrslt" titleClass="fs-0 fw-bold" />
      <Card.Body
        className="bg-white"
        style={{
          maxHeight: '160px',
          overflowY: 'scroll'
        }}
      >
        <Table borderless responsive size="sm">
          <thead className="border border-top-0 border-start-0 border-end-0 border-bottom-0">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {snsrsltData.map((data, idx) => {
              return (
                <tr key={idx}>
                  <td>{formatDate(data.orddate)}</td>
                  <td className="text-info">{data.ordcode}</td>
                  <td>{data.spcname}</td>
                  <td>{data.normalfg}</td>
                  <td>{data.procstat}</td>
                  <td>{data.examtyp}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default AntiSensrslt
