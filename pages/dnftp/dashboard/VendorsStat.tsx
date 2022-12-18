//@ts-nocheck
import React from "react";
import { Card, Dropdown, Row, Col, Tab, Nav } from "react-bootstrap";
import VendorChart from "../../../UI/components2/Dashboard/VendorChart";

const VendorsStat = ({ stats }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Tab.Container id="left-tabs-example" defaultActiveKey="total-views">
            <Row>
              <Col>
                <div dir="ltr">
                  <VendorChart stats={stats} />
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default VendorsStat;
