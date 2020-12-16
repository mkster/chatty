import React from 'react';
import styled from 'styled-components';
import { clampString } from '../helpers/util';

export default function ChatHeader(props){
    return (
        <Box>
            <h1>#{clampString(props.name, 30)}</h1>
            {clampString(props.description)}
        </Box>
    )
}

const Box = styled.div`
    background-color: #cccccc;
    height: 100%;
    overflow: hidden;
`
