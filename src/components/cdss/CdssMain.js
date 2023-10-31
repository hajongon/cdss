import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import playIcon from 'assets/img/icons/play.svg';
// import ModalVideoContent from '../ModalVideoContent';
import Flex from 'components/common/Flex';
import Hoverbox from 'components/common/Hoverbox';
import SoftBadge from 'components/common/SoftBadge';
import StarRating from 'components/common/StarRating';
import PatientInfo from './PatientInfo';
import BasicBarChart from 'components/doc-components/charts-example/echarts/bar-charts/BasicBarChart';
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
