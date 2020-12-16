import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Message from "./Message";
import MessengerName from "./MessengerName";

export default function Messages(props) {
    let lastMessageBy = false;
    return (
        <StyleMessages>
            <Container>
                {props.chats.map(chat => {
                    //add name if message by different user then last
                    const isYou = chat.uid === props.thisUserUid;
                    let addMessagerName = false 
                    if (lastMessageBy !== chat.uid){
                        lastMessageBy = chat.uid;
                        addMessagerName = true;
                    }
                    return (
                        <Fragment key={chat.timestamp}>
                            {addMessagerName && <MessengerName isYou={isYou} uid={chat.uid}/>}
                            <Message isYou={isYou}>{chat.content}</Message>
                        </Fragment>
                    )
                })}
                <div ref={props.bottomRef} />
            </Container>
        </StyleMessages>
    )
}

const StyleMessages = styled.div`
    background-color: #DDDDDD;
    min-height: 100%;
`

