import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

// import ModalVideoContent from '../ModalVideoContent';
import Flex from './Flex';
import PatientInfo from './PatientInfo';
import BasicBarChart from './BasicBarChart';
import SymptomSite from './SymptomSite';

const CdssMain = () => {

  return (
    <>
      <Card className="overflow-hidden">
        <Card.Body className="p-0">
          <Row className="g-0">
            <Col md={8} lg={9} className="p-x1">
              <Row className="g-0 h-100">
                <Col lg={8} as={Flex} className="flex-column pe-x1">
                  <PatientInfo />
                </Col>
                <Col lg={4} className="mt-4 mt-lg-0">
                  <SymptomSite />
                </Col>
              </Row>
            </Col>
            <Col md={4} lg={3}>
              <BasicBarChart />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};


export default CdssMain;
