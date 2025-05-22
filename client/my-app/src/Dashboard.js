import React, { useState } from "react";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResults from './TrackSearchResults'
import Player from "./Player";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
    clientId: e45255142a77403ab3a51f0281adf6f2,
})

useEffect(() =>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
}, [accessToken])

useEffect(()=>{
    if(!playingTrack) return
    axios.get('http://localhost:3001/lyrics', {
        params:{
            tracks: playingTrack.title,
            artist: playingTrack.artist
        }
    }).then(res=>
        setLyrics(res.data.lyrics)
    )
}, [playingTrack])

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
    const [searchResults, setSearchResults] = useState([])
    const [search, setSearch] = useState("")
    const [playingTrack, setPlayingTrack] = useState([])
    const [lyrics, setLyrics] = useState("")

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    return (
        <>
        <Container className="d-flex flex-column py-2" style={{height:"100vh"}}>
            <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e =>setSearch(e.target.value)}/>
        </Container>
        <div className="flex-grow-1 my-2" style={{overflowY:"auto"}}>{searchResults.map(track=>(
            <TrackSearchResults track={track} key={track.uri} chooseTrack={chooseTrack}/>))}
            {searchResults.length===0 && (
                <div className="text-center" style={{whiteSpace:"pre"}}>
            )}</div>
        <div><Player accessToken={accessToken} trackUri={playingTrack?uri}/></div>
        </>
    )
}