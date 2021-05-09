import React from "react";
import { Container } from "react-bootstrap";

const MobileDetected = () => {
  return (
    <div style={{ backgroundColor: "white", height: "100%" }}>
      <Container style={{ height: "100%" }}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img
            src="/images/logo.png"
            style={{ width: "80%", objectFit: "contain" }}
          />
          <p class="lead">
            Hello There , You are not supposed to access this website on mobile
            device, please come back with desktop or download our app.
          </p>
          <a
            class="btn btn-gradient-primary btn-lg"
            href="javascript:void(0);"
            role="button"
          >
            Learn more
          </a>
        </div>
      </Container>
    </div>
  );
};

export default MobileDetected;
