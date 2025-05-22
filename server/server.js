const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId:'e45255142a77403ab3a51f0281adf6f2',
        clientSecret:'681ef71939e64566bf6d58254c87c1fc',
    })

    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToke: data.body.access_token,
            refreshToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(()=>{
        res.sendStatus(400)
    })
})

app.listen(3001)