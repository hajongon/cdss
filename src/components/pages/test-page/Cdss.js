import { Row, Col } from "react-bootstrap";
import ProfileSettings from "../user/settings/ProfileSettings";
import BasicBarChart from "components/doc-components/charts-example/echarts/bar-charts/BasicBarChart";
import MarketShare from "components/dashboards/default/MarketShare";
import PackedBubble from "components/doc-components/charts-example/d3/PackedBubble";
import { marketShare } from "data/dashboard/default";
import MainLayout from "layouts/MainLayout";


const Cdss = () => {
    return (
        <>
        <MainLayout>
            <Row className="g-3 mb-3">
            <Col md={8} xxl={3}>
                <ProfileSettings />
            </Col>
            <Col md={4} xxl={3}>
                <BasicBarChart title="2023년 내복약 항생제 처방 순위" />
            </Col>
            <Col md={8} xxl={3}>
                <MarketShare data={marketShare} radius={['100%', '87%']} />
            </Col>
            <Col md={4} xxl={3}>
                <PackedBubble />
            </Col>
            </Row>
        </MainLayout>
    </>
    );
  };

export default Cdss