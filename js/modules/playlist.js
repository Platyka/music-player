import { songsList } from "../data/songs.js";
import Player from "./player.js";
import Trackbar from "./trackbar.js";
import Timer from "./timer.js";


const PlayList = (_ => {

  // DATA /////////////////
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);

  // console.log(songs.filter(item => item.song.includes("ar")));

  // currentSong.currentTime = 230;

  // DOM //////////////////
  const playlistEl = document.querySelector(".playlist");
  // const playerSong = document.querySelector(".player__current-song");

  const init = _ => {
    render();
    listeners();
    Player.setState(!currentSong.paused, 
                    songs[currentlyPlayingIndex].artist,
                    songs[currentlyPlayingIndex].song);
  }

  const flip = _ => {
    togglePlayPause();
    render(); 
  }

  const togglePlayPause = _ => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  }

  const changeAudioSrc = _ => {
    currentSong.src = songs[currentlyPlayingIndex].url;
  }

  const mainPlay = clickedIndex => {
    if (currentlyPlayingIndex === clickedIndex) {
      togglePlayPause();
      // renderSong();
    } else {
      currentlyPlayingIndex = clickedIndex;
      changeAudioSrc();
      // renderSong();
      togglePlayPause();
    }

    Player.setState(!currentSong.paused, 
                    songs[currentlyPlayingIndex].artist,
                    songs[currentlyPlayingIndex].song);
  }

  const playNext = _ => {
    if (songs[currentlyPlayingIndex + 1]) {
      currentlyPlayingIndex++;
      changeAudioSrc();
      togglePlayPause();
      // renderSong();
      render();
    }
  }

  const playNextClick = _ => {
    if (songs[currentlyPlayingIndex + 1]) {
      currentlyPlayingIndex++;
      changeAudioSrc();
      render();
      Player.setState(currentSong.paused, 
        songs[currentlyPlayingIndex].artist,
        songs[currentlyPlayingIndex].song);
    }
  }

  const playPreviousClick = _ => {
    if (songs[currentlyPlayingIndex - 1]) {
      currentlyPlayingIndex--;
      changeAudioSrc();
      render();
      Player.setState(currentSong.paused, 
        songs[currentlyPlayingIndex].artist,
        songs[currentlyPlayingIndex].song);
    }
  }

  const listeners = _ => {
    // 1.get the index of the li tag
    // 2. change the currentPlayingIndex to index of the li tag
    // 3. play or pause
    // 4. if it's not the same song, then change the source
    playlistEl.addEventListener("click", event => {
      if (event.target && event.target.matches(".playlist__song")) {
        const listElem = event.target;
        const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
        console.log(listElemIndex);
        mainPlay(listElemIndex);
        render();
      }
    });

    currentSong.addEventListener("ended", _ => {
      playNext();
    });

    currentSong.addEventListener("timeupdate", _ => {
      Trackbar.setState(currentSong);
      Timer.setState(currentSong);
    })
  }

  const filterSongs = search => {
    songs = songsList.filter(item => item.song.includes(search));
    render(); 
    // console.log(songs);
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
    init,
    flip,
    playNextClick,
    playPreviousClick,
    filterSongs
  }

})();

export default PlayList;