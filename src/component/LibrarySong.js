//song , artist, song name, and all

import React from 'react';


const LibrarySong = ({song, setCurrentSong,songs,id,audioRef,isPlaying,setSongs}) => {
    const songSelectHandler = async () =>{
        const newSong = songs.map((song) =>{
            if(song.id == id){
                return{
                    ...song,
                    active:true,
                }
            }else{
                return{
                    ...song,
                    active : false,
                }
            }
        })
        setSongs(newSong)
        await setCurrentSong(song)
        if(isPlaying) audioRef.current.play();
        
    }
    return(
        <div onClick={songSelectHandler} className ={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="desciption">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;