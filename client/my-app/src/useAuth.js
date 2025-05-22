import React, { useEffect, useState } from "react";
import axios from "axios"

export default function useAuth(code) {
    const [access_token, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expires_in, setExpiresIn] = useState()

    useEffect(() => {
        axios.post('http://localhost:3001/login', {
            code,
        }).then(res =>{
            setAccessToken(res.data.accesstoken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, "/")
        }).catch(()=>{
            window.location = "/"
        })

    },[code])
}