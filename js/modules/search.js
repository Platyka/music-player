import PlayList from "./playlist.js";

const Search = (_ => {

  //DOM
  const searchInputBodyEl = document.querySelector(".player__body-search");
  const searchIconHeaderEl = document.querySelector(".player__search-icon");
  const searchInputHeaderEl = document.querySelector(".player__search-input");
  const playerSearchEl = document.querySelector(".player__search");

  const init = _ => {
    listeners();
    render();
  }

  const listeners = _ => {
    searchIconHeaderEl.addEventListener("click", _ => {
      playerSearchEl.classList.toggle("player__search--active");
      render();
    });

    searchInputHeaderEl.addEventListener("input", _ => {
      PlayList.filterSongs(searchInputHeaderEl.value);
    });

    searchInputBodyEl.addEventListener("input", _ => {
      PlayList.filterSongs(searchInputBodyEl.value);
    });
  }

  const render = _ => {
    searchIconHeaderEl.innerHTML = `
      <i class="fas ${playerSearchEl.classList.contains("player__search--active") ? "fa-times player__search-btn--times" : "fa-search"} player__search-btn"></i>
    `;
  }

  return {
    init
  }

})();

export default Search;