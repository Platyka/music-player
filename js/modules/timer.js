const Timer = (_ => {

  // state 
  const state = {
    currentTackTime: 0,
    fullTrackTime: 0
  }

  // DOM
  const playerTimerEl = document.querySelector(".player__timer");

  const init = _ => {
    render();
  }

  const setState = obj => {
    state.currentTackTime = obj.currentTime;
    state.fullTrackTime = obj.duration;
    render();
  }

  const getMinutesSeconds = time => {
    let roundedTime = Math.floor(time);
    let minutes = Math.floor(roundedTime / 60);
    let seconds = roundedTime - minutes * 60;

    return {
      minutes,
      seconds
    }
  }

  const render = _ => {
    let minutesCurrentTrack = getMinutesSeconds(state.currentTackTime).minutes;
    let mc = `0${minutesCurrentTrack}`;
    let secondsCurrentTrack = getMinutesSeconds(state.currentTackTime).seconds;
    let sc = `0${secondsCurrentTrack}`;
    let minutesFullTrack = getMinutesSeconds(state.fullTrackTime).minutes;
    let mf = `0${minutesFullTrack}`;
    let secondsFullTrack = getMinutesSeconds(state.fullTrackTime).seconds;
    let sf = `0${secondsFullTrack}`;


    playerTimerEl.innerHTML = `${minutesCurrentTrack < 10 ? mc : minutesCurrentTrack}:${secondsCurrentTrack < 10 ? sc : secondsCurrentTrack} / ${minutesFullTrack < 10 ? mf : minutesFullTrack}:${secondsFullTrack < 10 ? sf : secondsFullTrack}`;
  }

  return {
    init,
    setState
  }

})();

export default Timer;