import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clampString, getTimeDifferenceString } from "../helpers/util";

export default function ChatCard(props){
    const lastMessageTimeStr = getTimeDifferenceString(props.lastMessageTime, Date.now())

    return (
        <Card bg={"light"} >
            <Card.Body>
                <Card.Title>{clampString("#" + props.chat)}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{clampString(props.desc, 50)}</Card.Subtitle>
                <hr/>
                <Button as={Link} to={"chats/" + props.chat} variant="primary">Join Chat</Button>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Active {lastMessageTimeStr} ago</small>
            </Card.Footer>
        </Card>
    )
}
