import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyleCredentialForm } from "../components/StyleCredentialForm";
import UserForm from "../components/UserForm";
import { signin } from "../helpers/auth";

export default function Login(props) {
  const [error, setError] = useState("")

  async function handleSubmit(event, inputMailStr, inputPwStr) {
    event.preventDefault();
    setError("");
    try {
      await signin(inputMailStr, inputPwStr);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <StyleBG>
      {error !== "" && <Alert variant={"danger"} dismissible onClose={() => setError("")}>{error}</Alert>}
      <StyleCredentialForm>
        <h1>
          Login to{" "}<StyleBlueText>Chatty</StyleBlueText>
        </h1>
        <p>Fill in the form below to login</p>
        <UserForm onSubmit={handleSubmit} autoComplete="off" buttonLabel="Login"/>
        <hr/>
        <p>Dont have an account? <Link to="/signup">Sign up</Link></p>
      </StyleCredentialForm>
    </StyleBG>
  )
}


const StyleBlueText = styled.span`
  color: #007bff
`

//need overflow:hidden to fix css weirdness where child margin-top affects this element
const StyleBG = styled.div`
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 6px ), repeating-linear-gradient( #b5dcff55, #b5dcff );
`