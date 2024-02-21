import React, { useState, useEffect } from 'react';
import './library.css';

function AudioPlayer() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Load playlist and current track from localStorage on initial render
  useEffect(() => {
    const savedPlaylist = JSON.parse(window.localStorage.getItem('playlist'));

    const savedCurrentTrackIndex = window.localStorage.getItem('currentTrackIndex');
    if (savedPlaylist) {
      setPlaylist(savedPlaylist);
      setCurrentTrackIndex(savedCurrentTrackIndex ? parseInt(savedCurrentTrackIndex) : 0);
    }
  }, []);

  // Save playlist and current track to localStorage whenever they change
  useEffect(() => {
    window.localStorage.setItem('playlist', JSON.stringify(playlist));
    window.localStorage.setItem('currentTrackIndex', currentTrackIndex);
  }, [playlist, currentTrackIndex]);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPlaylist([...playlist, file]);
  };

  // Play the selected track
  const playTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  // Play the next track when the current track ends
  const handleTrackEnd = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // const handleTrackSelect = (track) => {
  //   const index = playlist.indexOf(track);
  //   setCurrentTrackIndex(index);
  //   localStorage.setItem('currentTrackIndex', index);
  // };

  return (
    <div className='pn'>
      <h3 id='pn0'>Add Audio</h3>
      <input type="file" accept=".mp3" onChange={handleFileUpload} />
      <h2 id='pn1'>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index} onClick={() => playTrack(index)}>
            {track.name}
          </li>
        ))}
      </ul>
      <h2 id='pn2'>Now Playing</h2>
      <p >{playlist[currentTrackIndex]?.name}</p>
      <audio
        src={playlist[currentTrackIndex] && URL.createObjectURL(playlist[currentTrackIndex])}
        controls
        onEnded={handleTrackEnd}
        autoPlay
      />
    </div>
  );
}

export default AudioPlayer;
