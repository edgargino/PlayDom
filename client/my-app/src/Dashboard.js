import React from "react";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi(
    clientId: e45255142a77403ab3a51f0281adf6f2,

)

useEffect(() =>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
}, [accessToken])

useEffect(() =>{
    if(!search) return setSearchResults([])
    if(!accessToken) return

    let cancel = false

    spotifyApi.searchTracks(search).then(res=>{
        if(cancel) return
        setSearchResults(res.body.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) =>{
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0]
            )

            return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url
            }
        }))
        return cancel=true
    }, [search, accessToken])

export default function Dashboard(){
    const access_token = useAuth(code)
    const [search, setSearch] = useState("")
    return (
        <>
        <Container className="d-flex flex-column py-2" style={{height:"100vh"}}>
            <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e =>setSearch(e.target.value)}/>
        </Container>
        <div className="flex-grow-1 my-2" style={{overflowY:"auto"}}></div>
        </>
    )
}