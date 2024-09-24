import React from "react";
import PageHeader from "../components/PageHeader";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Error 404" subtitle="page not found" />
      <Container sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Container sx={{ flex: 1, mr: 2, textAlign: "center" }}>
          <Typography variant="h6">
            Sorry, the page you are looking for does not exist.
          </Typography>
          <Container sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate(ROUTES.ROOT)}
            >
              Return to Home page
            </Button>
          </Container>
        </Container>
        <Container sx={{ flex: 1 }}>
          <img src="/images/robot.png" alt="Error" style={{ width: '100%', maxWidth: 400 }} />
        </Container>
      </Container>
    </div>
  );
}
