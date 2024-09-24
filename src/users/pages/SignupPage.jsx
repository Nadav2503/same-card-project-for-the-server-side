import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/signupSchema";
import { Container } from "@mui/material";
import SignupForm from "../components/SignupForm";
import useUsers from "../hooks/useUsers";
import Spinner from "../../components/Spinner";
import PageHeader from "../../components/PageHeader";

export default function SignupPage() {
  const { isLoading, handleSignup } = useUsers();
  const {
    data,
    errors,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
    handleChangeCheckBox,
  } = useForm(initialSignupForm, signupSchema, handleSignup);

  const { user } = useCurrentUser();
  if (isLoading) return <Spinner />;
  if (user) return <Navigate to={ROUTES.ROOT} replace />;

  return (
    <Container>
      <PageHeader title="Register" subtitle="Sign up to create a new account" />
      <Container sx={{ paddingTop: 8, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <SignupForm
          onSubmit={onSubmit}
          onReset={handleReset}
          validateForm={validateForm}
          title={"register form"}
          errors={errors}
          data={data}
          onInputChange={handleChange}
          handleChangeCheckBox={handleChangeCheckBox}
        />
      </Container>
    </Container>
  );
}
