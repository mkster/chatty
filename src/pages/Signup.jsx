import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyleCredentialForm } from '../components/StyleCredentialForm';
import CredentialForm from '../components/UserForm';
import { signup } from '../helpers/auth';

export default function SignUp(props){
  const [error, setError] = useState("")

  async function handleSubmit(event, inputMailStr, inputPwStr) {
    event.preventDefault();
    setError("");
    try {
      await signup(inputMailStr, inputPwStr);
    } catch (error) {
      setError(error.message);
    }
  }

  return(
    <StyleBG>
      {error !== "" && <Alert variant={"danger"} dismissible onClose={() => setError("")}>{error}</Alert>}
      <StyleCredentialForm>
      <h1>
          Sign Up to{" "}<StyleBlueText>Chatty</StyleBlueText>
      </h1>
      <p>Fill in the form below to create an account. Use the account below for testing</p>
      <CredentialForm buttonLabel="Sign up" defaultMail={makeid(10) + "@mail.com"} defaultPw={makeid(10)} onSubmit={handleSubmit}/>
      <hr/>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      </StyleCredentialForm>
    </StyleBG>
  ) 
}

const StyleBlueText = styled.span`
  color: #007bff
`

const StyleBG = styled.div`
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
  opacity: 1;
  background-image: radial-gradient(#b5dcff 2px, #ffffff 2px);
  background-size: 40px 40px;
`

//generate id
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

