import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

export default function MessageInput(props){
    return (
        <StyleMessageInput>
            <Form onSubmit={props.onSubmit}>
                <Container fluid >
                    <Row noGutters>
                        <Col>
                            <InputInvisible {...props.typeMessageInputProps}/>
                        </Col>
                        <Col xs="auto">
                            <StyleSendButton>
                                <Button type="submit">Send <span role="img" aria-label={"send"}>📤</span></Button>
                            </StyleSendButton>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </StyleMessageInput>
    )
}


const StyleMessageInput = styled.div`
    width: auto;
    border-radius: 22px;
    border-style: solid;
    border-width: 1px;
    border-color: gray;
    padding: 10px;  
`

//input without any border etc
const InputInvisible = styled.input`
    border: 0px solid white; 
    -webkit-box-shadow: 
      inset 0 0 o0px  rgba(0,0,0,0.1),
            0 0 16px rgba(0,0,0,0.1); 
    -moz-box-shadow: 
      inset 0 0 8px  rgba(0,0,0,0.1),
            0 0 16px rgba(0,0,0,0.1); 
    box-shadow: 
      inset 0 0 0px  rgba(0,0,0,0.1),
            0 0 0px rgba(0,0,0,0.1); 
    padding: 0px;
    background: rgba(255,255,255,0.5);
    margin: 0 auto;
    outline: 0px;
    width: calc(100% - 20px);
    height: 100%;
    margin-right: 20px; 
`
const StyleSendButton = styled.div`
    height: 100%;
`