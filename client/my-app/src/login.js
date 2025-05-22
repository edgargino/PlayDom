import React from "react";

import {Container} from "react-bootstrap"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=e45255142a77403ab3a51f0281adf6f2&response_type=code&redirect+uri=http://localhost:3000&scope=%20streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%220user-modify-playback-state"

export default function login(){
    return(
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>Login With Spotify</a>
        </Container>
    )
}