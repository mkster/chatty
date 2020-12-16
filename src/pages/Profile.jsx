
import React, { useMemo } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Redirect, Route } from 'react-router-dom';
import LoginInfo from '../components/LoginInfo';
import UserProfile from '../components/UserProfile';
import { useUserEntry } from '../helpers/usersStore';
import { auth } from "../services/firebase";


//profile Page
export default function Profile(props){
    return(
        <>
            <Route exact path="/profile" component={RedirectToCurrentUser}></Route>
            <Route path="/profile/:username" component={PageProfile} />
        </>
    )
}

function RedirectToCurrentUser(props){
    const user = useMemo(()=>auth().currentUser, []);
    return (
        <Redirect to={"/profile/"+user.uid}/>
    )
}

function PageProfile(props){
    const uid = props.match.params.username;
    const [user, ] = useUserEntry(uid);
    const isCurrentUser = auth().currentUser.uid === uid;
    const bio = (user && user.bio !== "" && user.bio) || "I have no bio";
    return (
        <Jumbotron>
            {user ? 
                <>
                    <UserProfile bio={bio} name={user.name} uid={uid} isCurrentUser={isCurrentUser} />
                </>
            : 
                "user not found" 
            }
            <br/>
            <hr/>
            <LoginInfo/>
        </Jumbotron>
    )
}
