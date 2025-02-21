import React from 'react'
import { Container } from "react-bootstrap";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const RefundPolicy = ({ isMobile, setIsMobile }) => {
    return (
        <>
          <Header isMobile={isMobile} setIsMobile={setIsMobile} />
          <Container fluid className="py-5" style={{ minHeight: "80vh", background: "white" }}>
            <h2 className="text-center fw-bold" style={{ color: "#2d6a4f" }}>Refund Policy</h2>
            <p className="text-center text-muted">We offer refunds within 7 days of purchase if you are not satisfied with our service.</p>
            <p className="text-center text-muted">Refunds apply only to paid plans and do not cover free services.</p>
            <p className="text-center text-muted">For inquiries, contact us at: resumeportfolio09@gmail.com</p>
          </Container>
          <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
        </>
      );
}

export default RefundPolicy
