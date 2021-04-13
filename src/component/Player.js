//control player
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import React, { forwardRef, useEffect, useState} from 'react';

const Player = ({currentSong, 
    isPlaying, 
    setPlaying,
    audioRef,
    setsongInfo,
    songInfo,
    songs,
    setCurrentSong,
    setSongs
}) => {
    //use Effect
    useEffect(() =>{
            const newSong = songs.map((song) =>{
                if(song.id ==currentSong.id){
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
           
    },[currentSong])
    //eventhandler
    function playSong(){
      if(isPlaying){
          audioRef.current.pause();
          setPlaying(false)
      }else{
          audioRef.current.play();
          setPlaying(true)
      }
    }


    const getTime = (time) =>{
        return(
            Math.floor(time / 60)+ ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const drag = (e) =>{
        audioRef.current.currentTime= e.target.value;
        setsongInfo({...songInfo, currentTime : e.target.value});
    }

   const skiptrackHandler = async (direction) =>{
        let currentIndex = songs.findIndex((song) =>
            song.id === currentSong.id)

            if(direction === "skip-forward"){
                await setCurrentSong(songs[(currentIndex + 1)% songs.length])
            }
            console.log(currentIndex+1)
            if(direction === "skip-back"){
                if((currentIndex - 1) % songs.length === -1){
                    setCurrentSong(songs[songs.length - 1]);
                    if(isPlaying) audioRef.current.play();
                    return;
                }
                setCurrentSong(songs[(currentIndex - 1)% songs.length])
            }
            if(isPlaying) audioRef.current.play();
   }

   const trankAnim = {
       transform : `translateX(${songInfo.animationPercentage}%)`
   }

    return(
        <div className = "player">

            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}}className="track">
                <input 
                    min={0}
                    max={songInfo.duration || 0} 
                    onChange={drag} 
                    value={songInfo.currentTime} 
                    type="range" 
                />
                    <div style={trankAnim}className="animate-track"></div>
                </div> 
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>

            <div className="play-control">
            <FontAwesomeIcon 
                    className="skip-back" 
                    icon={faAngleLeft}
                    onClick={() => skiptrackHandler('skip-back')}
                    size="2x"
                />
                <FontAwesomeIcon 
                    className="play" 
                    icon={faPlay}
                    size="2x"
                    onClick={playSong}
                    icon = {isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon 
                    className="skip-forward" 
                    icon={faAngleRight}
                    size="2x"
                    onClick={() => skiptrackHandler('skip-forward')}
                />
               
            </div> 
        </div>
    )
}

export default Player;


