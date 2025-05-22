import React from "react";
import useAuth from "./useAuth";

export default function Dashboard(){
    const access_token = useAuth(code)
    return (
        <div>
            {code}
        </div>
    )
}