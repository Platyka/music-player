import PlayList from "./playlist.js";

const Player = (_ => {

  let isPlaying = false;

  //DOM /////////////////
  const currentSongEl = document.querySelector(".player__current-song");
  const playerControlEL = document.querySelector(".player__control");
  

  // console.log(playPauseButtonEl);

  const init = _ => {
    render();
    listeners();
  }

  const listeners = _ => {
    playerControlEL.addEventListener("click", event => {
      if (event.target && event.target.matches(".player__control--playpause")) {
        isPlaying = isPlaying ? false : true;
        render();
        PlayList.flip();
      } else if (event.target && event.target.matches(".player__control--next")) {       
          PlayList.playNextClick();
          render();
          PlayList.flip();
      } else if (event.target && event.target.matches(".player__control--previous")) {
          PlayList.playPreviousClick();
          render();
          PlayList.flip();
      }
    })
  }

  const setState = (item, songArtist, songName) => {
    isPlaying = item;
    currentSongEl.innerHTML = `${songName} - ${songArtist}`;
    render();
  }

  

  const render = _ => {
    playerControlEL.innerHTML= `
      <i class="fas fa-backward player__control--previous"></i>
      <i class="fas ${isPlaying ? 'fa-pause' : 'fa-play'} player__control--playpause"></i>
      <i class="fas fa-forward player__control--next"></i>
    `;
  }

  return {
    init,
    setState
  }
})();

export default Player;