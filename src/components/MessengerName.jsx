import React from "react";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import { useUserEntry } from "../helpers/usersStore";
import { clampString } from "../helpers/util";

//to display the name of the messager above his messages
export default function MessengerName(props){
    const className = props.isYou ? "d-flex flex-row-reverse" : ""
    const [user, ] = useUserEntry(props.uid)
    const name = user === "" ? "" : clampString((user && user.name) || "deleted_user")
    return(
        <Row className={className}>
            <MessengerInfoOverlay name={name} bio={user && user.bio} uid={props.uid}>
            <StyleMessengerName>
                {name}
            </StyleMessengerName>
            </MessengerInfoOverlay>
        </Row>
    )

}

function MessengerInfoOverlay(props){
    return (
        <OverlayTrigger
            placement={'top'}
            overlay={
                <Tooltip id={`tooltip-${'top'}`}>
                    <strong>{clampString(props.name || "deleted_user", 100)}</strong><br/>
                    {clampString(props.bio, 100)}
                </Tooltip>
            }
        >
            {props.children}
        </OverlayTrigger>
    )
}

//important to set min height here to take up same amount of space before text loaded and avoid stuff moving around
const StyleMessengerName = styled.div`
    margin-top: 15px;
    font-size: 80%;
    color: gray;
    min-height: 1.25em;
    line-height: 1.25;
`
