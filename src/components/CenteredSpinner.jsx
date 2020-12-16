import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

export default function CenteredSpinner(props){
    return(
        <Centered>
            <Spinner animation="border" />
        </Centered>
    )
}


const Centered = styled.div`
    height: 100%;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`