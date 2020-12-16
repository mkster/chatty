
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import useInput from '../helpers/useInput';

export default function UserForm(props){
  const [inputMailProps, inputMailStr, ] = useInput(props.defaultMail)
  const [inputPwProps, inputPwStr, ] = useInput(props.defaultPw)
  
  //pass inputs
  function handleSubmit(event){
    props.onSubmit(event, inputMailStr, inputPwStr)
  }

  return (
    <Form onSubmit={handleSubmit} autoComplete={props.autoComplete}>
      <Form.Group controlId="formBasicEmail">
        <Form.Control placeholder="Email" name="email" type="email" {...inputMailProps}></Form.Control >
      </Form.Group>
        <Form.Group controlId="formBasicPw">
        <Form.Control placeholder="Password" name="password" type="password" {...inputPwProps}></Form.Control >
      </Form.Group>
      <div>
        <Button variant="primary" type="submit">{props.buttonLabel}</Button>
      </div>
    </Form>
  )
}

