import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Plan = ({ isMobile, setIsMobile }) => {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <>
      <Header isMobile={isMobile} setIsMobile={setIsMobile} />
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center py-5"
        style={{
          minHeight: "80vh",
          background: "white",
        }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#2d6a4f" }}>
          Choose Your Plan
        </h2>

        {/* Toggle Switch */}
        <div className="d-flex align-items-center mb-4 shadow-sm px-3 py-2 rounded" style={{ background: "#ffffff" }}>
          <Form.Check
            type="switch"
            id="plan-switch"
            label={
              <span className="fw-semibold" style={{ color: isPaid ? "#155724" : "#6c757d" }}>
                {isPaid ? "Paid Plan Selected" : "Free Plan Selected"}
              </span>
            }
            checked={isPaid}
            onChange={() => setIsPaid(!isPaid)}
            className="fs-6"
          />
        </div>

        {/* Plans Section */}
        <Row className="justify-content-center w-100" style={{ maxWidth: "800px" }}>
          {/* Free Plan */}
          <Col sm={6} className="mb-3">
            <Card
              className={`text-center p-3 shadow-sm border-2 ${!isPaid ? "border-success" : "border-light"}`}
              style={{
                background: !isPaid ? "#e9f5db" : "#ffffff",
                transition: "0.3s",
                borderRadius: "12px",
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold fs-5 text-success">Free Plan</Card.Title>
                <Card.Text className="fs-6 text-muted">
                  ✅ Unlimited resumes <br />
                  ❌ No portfolio customization <br />
                  ❌ No live portfolio <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Paid Plan */}
          <Col sm={6} className="mb-3">
            <Card
              className={`text-center p-3 shadow-sm border-2 ${isPaid ? "border-success" : "border-light"}`}
              style={{
                background: isPaid ? "#e9f5db" : "#ffffff",
                transition: "0.3s",
                borderRadius: "12px",
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold fs-5 text-success">Paid Plan - Rs 1 (One-time)</Card.Title>
                <Card.Text className="fs-6 text-muted">
                  ✅ Unlimited resumes <br />
                  ✅ Portfolio customization <br />
                  ✅ Live portfolio <br />
                  ✅ Showcase projects <br />
                  ✅ Add links <br />
                </Card.Text>
                <Button variant="success" className="mt-3 px-4 py-2 fs-6 fw-bold">
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
    </>
  );
};

export default Plan;
