import React, { useState, useRef } from "react";
// * Styles
import "./Styles/app.scss";

// * Components
import Song from "./Components/Song";
import Player from "./Components/Player";
import Library from "./Components/Library";
import Nav from "./Components/Nav";

// * Song Data
import data from "./Data";

const App = () => {
  // * Ref:
  const audioRef = useRef(null);

  // * States
  const [songs, setSongs] = useState(data()); // ? songs from the data file.
  const [currentSong, setCurrentSong] = useState(songs[0]); // ? current song to display and if already playing.
  const [isPlaying, setIsplaying] = useState(false); // ? for play and pause.
  const [songInfo, setSongInfo] = useState({
    // ? State for setting the duration and current time.
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false); //? State for toggling library.

  // * Event Handlers
  //! -> updates the time of song
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    // ? calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animation,
    });
  };

  // ! -> auto play next song:
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        isPlaying={isPlaying}
        setIsplaying={setIsplaying}
        currentSong={currentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler} // ? information updates as it loads up
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default App;
