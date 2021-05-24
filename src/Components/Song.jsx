import React from "react";

//* Song in the Music player:

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-container">
      <img
        alt={currentSong.name}
        src={currentSong.cover}
        className={`${isPlaying ? "rotate" : ""}`}
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
