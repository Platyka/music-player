import { songsList } from "../data/songs.js";

const PlayList = (_ => {

  // DATA /////////////////
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);
  let isPlaying = false;

  // DOM //////////////////
  const playlistEl = document.querySelector(".playlist");

  const init = _ => {
    render();
  }

  const render = _ => {
    let markup = '';
    songs.forEach((songItem, index) => {
      markup += `
        <li class="playlist__song ${index === currentlyPlayingIndex ? 'playlist__song--active' : ''}">
          <div class="playlist__song-details">
            <span class="playlist__song-details--title">${songItem.song}</span>
            <span class="playlist__song-details--artist">${songItem.artist}</span>
          </div>
          <div class="playlist__song-duration">${songItem.time}</div>
        </li>
      `
    });

    playlistEl.innerHTML = markup;
  }

  return {
    init
  }

})();

export default PlayList;