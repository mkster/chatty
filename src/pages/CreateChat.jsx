

import React from "react";
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import useInput from "../helpers/useInput";
import { spaceToUnderscore } from "../helpers/util";

//TODO make db.ref helper func
export default function CreateChat(props) {
    const history = useHistory();
    const [inputProps, inputStr, setInputStr] = useInput("", handleChange);
    
    function handleChange(event){
        const val = formatChatName(event.target.value)
        setInputStr(val);
    }

    function handleSubmit(){
        history.push("/chats/"+inputStr);
    }

    return (
        <Container>
            <br/>
            <CreateChatCard handleSubmit={handleSubmit} inputProps={inputProps}/>
        </Container>
    )
}

function CreateChatCard(props) {

    return (
        <Card bg={"light"} >    
            <Card.Body>
                <Form onSubmit={props.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Card.Title>Create Chat</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Enter a name for your chat</Card.Subtitle>
                            <Card.Text>
                            <Form.Control type="" {...props.inputProps} />
                            <br/>
                            <Button key={"a"} variant="primary" type="submit">Create</Button>
                        </Card.Text>
                    </Form.Group>
                </Form>
            </Card.Body>
           
        </Card>
    )
}

function formatChatName(str) {
    return spaceToUnderscore(str).toLowerCase();
}