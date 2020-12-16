import React, { useEffect, useState } from "react";
import { Button, CardColumns, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CenteredSpinner from "../components/CenteredSpinner";
import ChatCard from "../components/ChatCard";
import { db, dbGetFirstChild, dbGetLastChild } from "../services/firebase";


//TODO make db.ref helper func
export default function ChatsList(props) {
    const [chats, descriptions, lastMessageTimes, ] = useChats()
    return (
        <>
            <Container>
                <br/>
                {chats.length <= 0 ? 
                    <><br/><CenteredSpinner/></>
                :
                    <>
                        <StyleAddButtonRow>
                            <StyleAddButton>
                                <Button as={Link} to="../create"><IconPlus fontSize={20}/>Create Chat</Button>
                            </StyleAddButton>
                        </StyleAddButtonRow>
                        <CardColumns>
                            {chats.map((chat,i) => {
                                return (
                                    <ChatCard key={chat} chat={chat} desc={descriptions[i]} lastMessageTime={lastMessageTimes[i]}/>
                                    )
                                })}
                        </CardColumns>
                    </>
                }
            </Container>
        </>
    )
}

function IconPlus(props){
    return(
        <svg {...props} width="1em" height="1em" viewBox="0 1 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
    )
}

const StyleAddButtonRow = styled.div`
    display: block;
    overflow: auto;
    margin-bottom: 10px;
`

const StyleAddButton = styled.div`
    float: right;
`

function useChats(){
    const [chats, setChats] = useState([])
    const [descriptions, setDescriptions] = useState([])
    const [lastMessageTimes, setLastMessageTimes] = useState([])
    const [readError, setReadError] = useState(null)

    useEffect(() => {
        setReadError(null)
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                let descriptions = [];
                let lastMessageTimes = [];
                snapshot.forEach((snap) => {
                    const desc = dbGetFirstChild(snap).content
                    const last = dbGetLastChild(snap).timestamp
                    chats.push(snap.key);
                    descriptions.push(desc)
                    lastMessageTimes.push(last);
                });
                setChats(chats)
                setDescriptions(descriptions)
                setLastMessageTimes(lastMessageTimes);
            });
        } catch (error) {
            setReadError(error.message)
        }

        return (()=>{
            db.ref("chats").off("value")
        })
    }, [])

    return [chats, descriptions, lastMessageTimes, readError]
}

