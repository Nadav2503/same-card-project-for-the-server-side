import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/loginSchema";
import { Button, Container, Grid, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import useUsers from "../hooks/useUsers";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

export default function LoginPage() {
  const { isLoading, error, handleLogin, isLocked, remainingAttempts } = useUsers();
  const { data, errors, handleChange, handleReset, validateForm, onSubmit } =
    useForm(initialLoginForm, loginSchema, handleLogin);

  const [hasAttempted, setHasAttempted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setHasAttempted(true);
    onSubmit(e);
  };

  const { user } = useCurrentUser();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (user) return <Navigate to={ROUTES.ROOT} replace />;

  return (
    <Container>
      <PageHeader
        title="Login"
        subtitle="Access your account by logging in here"
      />
      <Container
        sx={{
          paddingTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          title="login"
          styles={{ maxWidth: "450px" }}
          to={ROUTES.ROOT}
          onSubmit={handleFormSubmit}
          onReset={handleReset}
          validateForm={validateForm}
          isLocked={isLocked}
        >
          <Input
            label="email"
            name="email"
            type="email"
            error={errors.email}
            onChange={handleChange}
            data={data}
          />
          <Input
            label="password"
            name="password"
            type="password"
            error={errors.password}
            onChange={handleChange}
            data={data}
          />
          <Grid item xs={12}>
            {isLocked ? (
              <Typography color="error" align="center" sx={{ padding: 2 }}>
                Your account is temporarily locked. Please try again later.
              </Typography>
            ) : hasAttempted && remainingAttempts !== null ? (
              <Typography color="error" align="center" sx={{ padding: 2 }}>
                Remaining login attempts: {remainingAttempts}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component={Link}
              to={ROUTES.SIGNUP}
              sx={{ width: "100%" }}
            >
              Sign Up
            </Button>
          </Grid>
        </Form>
      </Container>
    </Container>
  );
}
