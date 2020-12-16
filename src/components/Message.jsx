import React from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";

export default function Message(props){
    return(
        props.isYou ? MessageYou(props) : MessageOther(props)
    )
}

function MessageYou(props) {
    return (
        <Row className="d-flex flex-row-reverse">
            <StyleMessageYou>
                {props.children}
            </StyleMessageYou>
        </Row>
    )
}

function MessageOther(props) {
    return (
        <Row>
            <StyleMessageOther>
                {props.children}
            </StyleMessageOther>
        </Row>
    )
}



const styleMessageDefault = `
    max-width: 80%;
    min-width: 10%;
    border-radius: 10px;
    margin-bottom: 4px;
    padding-right: 10px;
    padding-left: 10px;
    word-break: break-word;
`

const StyleMessageYou = styled.div`
    ${styleMessageDefault}
    background-color: #28a745;
    text-align: right;
`

const StyleMessageOther = styled.div`
    ${styleMessageDefault}
    background-color: #2dae4a;
    text-align: left;
`
