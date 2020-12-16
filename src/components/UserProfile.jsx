import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { setUserBio, setUserName } from '../helpers/usersStore';
import { clampString, removeExtraSpaces, spaceToUnderscore } from '../helpers/util';


export default function UserProfile(props){
    const [nameInputProps, bioInputProps, handleSubmit, isEditing, setIsEditing] = useBioProps(props.name, props.bio, props.uid)

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProfile">
                    <h1>Hi, {clampString(nameInputProps.value || props.uid)}</h1>
                    <Form.Control disabled={!isEditing} plaintext={!isEditing} type="" {...nameInputProps}/>
                    <br />
                    <Form.Control disabled={!isEditing} plaintext={!isEditing} type="" {...bioInputProps} />
                    <br/>
                    {props.isCurrentUser && 
                        <>
                            {isEditing ? 
                                <Button key={"a"} variant="primary" type="submit">Update</Button>
                            :
                                <Button key={"b"} onClick={() => setIsEditing(!isEditing)}>Edit</Button>
                            }
                        </>
                    }
                </Form.Group>
            </Form>
        </>
    )
}

function useBioProps(name, bio, uid){
    const [isEditing, setIsEditing] = useState(false);
    const [bioStr, setBioStr] = useState(bio || "");
    const [nameStr, setNameStr] = useState(name || "");


    function handleChangeBio(event) {
        if (!isEditing) return;
        setBioStr((event.target.value))
    }

    function handleChangeName(event) {
        if (!isEditing) return;
        setNameStr(formatName(event.target.value))
    }

    function handleSubmit(event) {
        event.preventDefault();
        setBioStr(formatBio(bioStr))
        setUserBio(uid, formatBio(bioStr))
        setUserName(uid, nameStr)
        setIsEditing(false)
    }

    const bioInputProps = { value : bioStr, onChange : handleChangeBio }
    const nameInputProps = { value: nameStr, onChange: handleChangeName }

    return [nameInputProps, bioInputProps, handleSubmit, isEditing, setIsEditing];
}


function formatName(str){
    return spaceToUnderscore(str.toLowerCase())
}

function formatBio(str) {
    return removeExtraSpaces(str)
}