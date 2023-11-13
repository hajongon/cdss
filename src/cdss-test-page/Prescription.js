import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'

import AppContext from 'context/Context'
import { formatDate } from './timeDateFunction'
import FalconComponentCard from './FalconComponentCard'

const Prescription = () => {
  const { prescriptions, noDataError } = useContext(AppContext)

  return (
    <FalconComponentCard className="h-100 ps-0 pe-0 shadow-none bg-transparent">
      <Card.Body className="bg-transparent">
        {noDataError.prescription ? null : (
          <div
            className="scrollbar"
            style={{
              overflow: 'auto',
              height: '15dvh'
            }}
          >
            <Table borderless size="sm fs--2">
              <thead className="customFixedHeader text-600">
                <tr>
                  <th>meddate</th>
                  <th>ordname</th>
                  <th>day</th>
                </tr>
              </thead>
              <tbody>
                <tr className="sticky-border"></tr>
                {prescriptions.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{formatDate(data.meddate)}</td>
                      <td className="text-info">{data.ordname}</td>
                      <td>{data.day}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </FalconComponentCard>
  )
}

export default Prescription
