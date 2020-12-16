import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import Messages from "../components/Messages";
import useInput from "../helpers/useInput";
import { spaceToUnderscore, stringIsEmpty } from "../helpers/util";
import { auth, db } from "../services/firebase";

export default function Chat(props) {
    const user = useMemo(() => auth().currentUser, []);
    const [chats, setChats] = useState([])        
    const [readError, setReadError] = useState(null)        
    const [writeError, setWriteError] = useState(null)        
    const bottomOfChatRef = useRef(null)
    const [typeMessageInputProps, typedMessage, setTypedMessage] = useInput();
    const location = useLocation();
    const chatPath = formatChatName(location.pathname) //path is also db path i.e. /chats/public
    const chatName = formatChatName(props.match.params.chatID) //i.e public

    const chatDescription = useMemo(()=>{
        return (chats && chats[0] && chats[0].content) || "";
    }, [chats])

    useEffect(() => {
        setReadError(null)
        try {
            db.ref(chatPath).on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                setChats(chats)
                scrollToTarget(bottomOfChatRef);
            });
        } catch (error) {
            setReadError(error.message)
        }
    }, [chatPath])

    async function handleSubmit(e) {
        e.preventDefault();
        if (stringIsEmpty(typedMessage)) return;
        setWriteError(null)
        try {
            setTypedMessage('');
            await db.ref(chatPath).push({
                content: typedMessage,
                timestamp: Date.now(),
                uid: user.uid
            });
        } catch (error) {
            setWriteError(error.message)
        }

        scrollToTarget(bottomOfChatRef);
    }
   
    return (
        <StyleStretchFull>
            <ContainerChatHeader>
                <ChatHeader name={chatName} description={chatDescription }/>
            {(readError || writeError) && <Alert variant="warning">{readError || writeError}</Alert>}
            </ContainerChatHeader>
            <ContainerMessages>
                <Messages chats={chats} thisUserUid={user.uid} bottomRef={bottomOfChatRef}/>
            </ContainerMessages>
            <ContainerMessageInput>
                <MessageInput onSubmit={handleSubmit} writeError={writeError} typeMessageInputProps={typeMessageInputProps}/>
            </ContainerMessageInput>
        </StyleStretchFull>
    )
    
}

const navHeaderHeight = "56px";
const messageInputHeight = "60px";
const messageInputMargin = "10px";
const messageInputMarginOffset = "20px"; //abovr *2

const StyleStretchFull = styled.div`
    height: calc(100vh - ${navHeaderHeight});
`

const ContainerChatHeader = styled.div`
    width: 100%;
    height: 15%;
`
const ContainerMessages = styled.div`
    width: 100%;    
    min-height: calc(85% - ${messageInputHeight} - ${messageInputMarginOffset});
    height: calc(85% - ${messageInputHeight} - ${messageInputMarginOffset});
    overflow-x: hidden;
    overflow-y: scroll;
`
const ContainerMessageInput = styled.div`
    width: calc(100% - 20px);    
    height: ${messageInputHeight};
    margin: ${messageInputMargin};
`

function scrollToTarget(ref, smooth=true) {
    if (smooth){
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }else{
        ref.current.scrollIntoView();
    }
}

function formatChatName(str){
    return spaceToUnderscore(str).toLowerCase();
}

