(function () {

// Login features
  const buttonSubmitLogin = document.getElementById("buttonSubmitLogin");
  const inputName = document.getElementById("inputName");
  const inputPassword = document.getElementById("inputPassword");

  const divLogin = document.getElementById("divLogin");
  const divLoggedIn = document.getElementById("divLoggedIn");
  const divWaitingLogin = document.getElementById("divWaitingLogin");


  /**
   * Login section
   */
  buttonSubmitLogin.addEventListener("click",  (e) => {
    e.preventDefault();
    const username = inputName.value.trim();
    const password = inputPassword.value.trim();

    login(username, password);
  });

  /**
   * Login function, checking if the user exists, loads the personal space.
   * @param username Username to login
   * @param password Fake password, not required
   * @returns {Promise<void>}
   */
  async function login(username, password) {
    try {
      divLogin.style.display = "none";
      divWaitingLogin.style.display = "block";

      const profile = await getUserProfile(username);

      divWaitingLogin.style.display = "none";

      if (profile) {
        const spanUsername = document.getElementById("spanUsername");
        spanUsername.textContent = profile.username;
        divLoggedIn.style.display = "block";

        loadPersonalHome(profile.username);

      } else {
        inputName.value = "";
        inputName.placeholder = "Try Again";
        divLogin.style.display = "block";
      }

    } catch (error) {
      divWaitingLogin.style.display = "none";
      inputName.value = "";
      inputName.placeholder = "Server Error";
      divLogin.style.display = "block";
    }
  }

  /**
   * Function to get user profile from the server, if the user doesn't exist, returns null.'
   * @param username
   * @returns {Promise<*|null>}
   */
  async function getUserProfile(username) {
    try {
      const res = await axios.get(`http://localhost:3000/user/${username}/profile`);
      return res.data;
    } catch (err) {
      if (err.response.status === 404) {
        return null;
      }
      throw err;
    }
  }


  /**
   * Side menu features
   *
   */
  const menuOffCanvas = document.getElementById("menuOffCanvas");
  const btnHamburger = document.getElementById("btnHamburger");

  btnHamburger.addEventListener("click", () => {
    menuOffCanvas.classList.toggle("open");
    overlay.classList.toggle("show");
  });

  document.getElementById("menu-home").addEventListener("click", (e) => {
    e.preventDefault();
    closeLeftMenu()
    offset = 0;
    loadHome();
  });
  document.getElementById("menu-top").addEventListener("click", (e) => {
    e.preventDefault();
    closeLeftMenu()
    offset = 0;
    loadTopGlobal();
  });
  document.getElementById("menu-recent").addEventListener("click", (e) => {
    e.preventDefault();
    closeLeftMenu()
    offset = 0;
    loadRecentAnime();
  });


  /**
   * Search features
   *
   * Search button to send the search query to the server.
   */
  const btnAnimeSearch = document.getElementById("btnAnimeSearch");
  btnAnimeSearch.addEventListener("click", (e) => {
    e.preventDefault();
    loadAnimeByTitle();
  })

  /**
   * Reset the search button, clears the search input and loads the home page.
   *
   */
  const btnResetSearch = document.getElementById("btnResetSearch");
  const inputAnimeSearch = document.getElementById("inputAnimeSearch");
  btnResetSearch.addEventListener("click", (e) => {
    e.preventDefault();
    inputAnimeSearch.value = "";
    inputAnimeSearch.placeholder = "Search anime...";
    loadHome();
  })

  /**
   * Overlay to close the menu when clicking outside of it.
   * @type {HTMLElement}
   */
  const overlay = document.getElementById("overlay");

  overlay.addEventListener("click", () => {
    closeLeftMenu();
  });


  /**
   * Document section
   *
   * Anime Cards Expansion
   */
  let currentlyOpenCard = null;

  /**
   * Click listener for anime cards.
   * Clicking on a card expands it, clicking outside closes it, toggle if the same card clicked.
   */
  document.addEventListener("click", (event) => {
    const card = event.target.closest(".anime_card");

    // 1) Click On A Card
    if (card) {

      // Clicked On The Same Card → Toggle
      if (card === currentlyOpenCard) {
        toggleCard(card);
        if (!card.classList.contains("open")) {
          currentlyOpenCard = null;
        }
        return;
      }

      // Card Already Opened -> Close It
      if (currentlyOpenCard) {
        toggleCard(currentlyOpenCard);
      }

      // Open New Card
      toggleCard(card);
      currentlyOpenCard = card;

      // -----
      // STATS
      // -----
      if (card.dataset.statsloaded !== "true") {
        const cachedStats = localLoadCard(card.dataset.id, "stats");
        if (cachedStats) {
          const statsContainer = card.querySelector("#anime_card_stats");
          statsContainer.innerHTML = cachedStats;
        } else {
          loadAnimeStats(card.dataset.id, card);
        }
      }

      // -----
      // VOICES
      // -----
      if (card.dataset.voicesloaded !== "true"){
        const cachedVoices = localLoadCard(card.dataset.id, "voices");
        if (cachedVoices) {
          const voicesContainer = card.querySelector("#anime_card_voices");
          voicesContainer.innerHTML = cachedVoices;
        } else {
          loadAnimeVoices(card.dataset.id, card);
        }
      }
      return;
    }

    // 2) Outside Click → Close Any Opened Card
    if (currentlyOpenCard) {
      toggleCard(currentlyOpenCard);
      currentlyOpenCard = null;
    }
  });

  /**
   * Load the home page when the document is ready.
   */
  document.addEventListener("DOMContentLoaded", () => {
    loadHome();
  });

  /**
   * Filter section to send advanced query
   */
  document.getElementById("btnApplyFilters").addEventListener("click", async (e) => {
    e.preventDefault();

    const status = document.getElementById("filterStatus").value;
    const orderBy = document.getElementById("filterOrder").value;
    const type = document.getElementById("filterType").value;
    const genres = document.getElementById("inputGenre").value;
    const source = document.getElementById("filterSource").value;
    const year = document.getElementById("filterYear").value;

    const params = {
      offset,
      max
    };

    if (status) params.status = status;
    if (orderBy){ params.orderBy = orderBy; params.direction = orderDirection;}
    if (type) params.type = type;
    if (genres) params.genres = genres;
    if (source) params.source = source;
    if (year) params.year = year;

    const res = await queryWithFilters(params);

    const catalog = document.querySelector("#mainCatalog");
    renderCatalog(res, catalog);
  });


  /**
   * Function section
   *
   *
   */

  /**
   * Toggles the card divs, open and closes it.
   */
  function toggleCard(card){
    const details = card.querySelectorAll(".anime_card_details");
    card.classList.toggle("open");
    details.forEach(detail => detail.classList.toggle("open"));
  }

  function updateOffset() {
    offset += 1;
    const url = new URL(lastQuery);
    url.searchParams.set("offset", offset);
    lastQuery = url.toString();
  }

  /**
   * Reset the filters, clearing the input fields.
   */
  function resetFilters(){
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterOrder").value = "";
    document.getElementById("filterType").value = "";
    document.getElementById("inputGenre").value = "";
    document.getElementById("filterSource").value = "";
    document.getElementById("filterYear").value = "xxxx";
  }
  const btnResetFilters = document.getElementById("btnResetFilters");
  btnResetFilters.addEventListener("click", resetFilters);

  /**
   * Saving the cards in the local storage, to avoid reloading them.
   * @param animeId Anime Id to save the card
   * @param content Content of the card to save
   * @param type Type of the card to save, like voices or stats
   */
  function localSaveCard(animeId, content, type){
    localStorage.setItem(`${type}_${animeId}`, content);
  }

  /**
   * Loading the cards from the local storage, to avoid reloading them.
   * @param animeId Anime Id to load the card
   * @param type Type of the card to load, like voices or stats
   * @returns {string|null}
   */
  function localLoadCard(animeId, type){
    return localStorage.getItem(`${type}_${animeId}`);
  }


  /**
   * In the OrderBy Filter section, changing the order of the anime cards.
   * @type {string}
   */
  let orderDirection = "asc";

  document.getElementById("btnOrderDirection").addEventListener("click", () => {
    orderDirection = orderDirection === "asc" ? "desc" : "asc";

    // aggiorna la freccia
    document.getElementById("btnOrderDirection").textContent =
      orderDirection === "asc" ? "▲" : "▼";
  });


  /**
   * Loading the home page, querying top anime then rendering them in the catalog.
   * @returns {Promise<void>}
   */
  async function loadHome() {
    try {
      const res = await queryTop(2025);
      const catalog = document.querySelector("#mainCatalog");
      renderCatalog(res, catalog);
    } catch (err) {
      console.error("Errore in loadHome:", err);
    }
  }

  /**
   * Loading users personal space, querying ratings then taking the animeId to receive animeDetails
   * to create animeCards.
   * @param username
   * @returns {Promise<void>}
   */
  async function loadPersonalHome(username){
    try{
      // Querying ratings of the user logged in, slicing 10 of them to render them in the catalog.
      const res = await queryRatingsByUser(username);
      const ratings = res.slice(0, 10);

      // Making promises to query the anime details of the animeIds of the ratings,
      const promises = ratings.map( r => queryAnimeById(r.anime_id) );
      const animeList = await Promise.all(promises);

      // Rendering the catalog with the animeCards created from the animeDetails.
      const catalog = document.querySelector("#personalCatalog");
      renderCatalog(animeList, catalog);
      renderRatings(res, catalog);

      // Showing the personal catalog container.
      const catalogContainer = document.querySelector("#personalCatalogContainer");
      catalogContainer.classList.remove("hidden");

    } catch (err) {
      console.error("Errore in loadPersonalHome:", err);
    }
  }

  /**
   * Loading anime by title, querying the server, and rendering the results in the catalog.
   * @returns {Promise<void>}
   */
  async function loadAnimeByTitle(){
    try{
      const inputAnimeSearch = document.getElementById("inputAnimeSearch");
      const animeTitle = inputAnimeSearch.value.trim();
      const res = await queryAnimeByTitle(animeTitle);

      if(res.length === 0){
        const inputAnimeSearch = document.getElementById("inputAnimeSearch");
        inputAnimeSearch.value = "";
        inputAnimeSearch.placeholder = "No Anime Found";
        return;
      }

      const catalog = document.querySelector("#mainCatalog");
      renderCatalog(res, catalog);
    } catch (err) {
      console.error("Errore in loadAnimeByTitle:", err);
    }
  }

  /**
   * Loading the recent anime, querying the server, and rendering the results in the catalog.
   * @returns {Promise<void>}
   */
  async function loadRecentAnime() {
    try {
      const res = await queryRecent();
      const catalog = document.querySelector("#mainCatalog");
      renderCatalog(res, catalog);
    } catch (err) {
      console.error("Errore in loadRecentAnime:", err);
    }
  }

  /**
   * Loading the top anime, querying the server, and rendering the results in the catalog.
   * @returns {Promise<void>}
   */
  async function loadTopGlobal(){
    try{
      const res = await queryTop();
      const catalog = document.querySelector("#mainCatalog");
      renderCatalog(res, catalog);
    } catch (err) {
      console.error("Errore in loadTopGlobal:", err);
    }
  }

  /**
   * Closing the left menu.
   * @returns {Promise<void>}
   */
  async function closeLeftMenu(){
    menuOffCanvas.classList.toggle("open");
    overlay.classList.toggle("show");
  }

  /**
   * Loading more anime, querying the server, and appending the results to the catalog.
   * Using the last query to create the url to query the server.
   */
  let lastQuery = "";
  let offset = 0;
  let max = 20;

  async function loadMore(){
    try{
      if(lastQuery === ""){
        return;
      }
      const res = await queryMore();

      const catalog = document.querySelector("#mainCatalog");
      appendToCatalog(res, catalog);
    } catch (err) {
      console.error("Errore in loadMore:", err);
    }
  }

  const btnLoadMore = document.getElementById("btnLoadMore");
  btnLoadMore.addEventListener("click", loadMore);


  /**
   * Loading anime stats, querying the server, and rendering the results in the card.
   * @param animeId Anime Id to query the stats
   * @param card Card to render the stats in
   * @returns {Promise<void>}
   */
  async function loadAnimeStats(animeId, card){
    const statsContainer = card.querySelector("#anime_card_stats");

    try{
      const res = await queryAnimeStats(animeId);

      statsContainer.innerHTML =  `
            <p>Watching: ${res.watching}</p>
            <p>Completed: ${res.completed}</p>
            <p>Users on hold: ${res.on_hold}</p>
            <p>Planned to watch: ${res.plan_to_watch}</p>
            <p>Total users: ${res.total}</p>
            <p>Dropped by: ${res.dropped}</p>
        `;

      card.dataset.statsloaded = "true";

      localSaveCard(animeId, statsContainer.innerHTML, "stats"); // Caching the stats

    } catch (err) {
      console.error("Errore in loadAnimeStats:", err);
    }
  }

  /**
   * Loading anime voices, querying the server, and rendering the results in the card.
   * @param animeId Anime Id to query the voices
   * @param card Card to render the voices in
   * @returns {Promise<void>}
   */
  async function loadAnimeVoices(animeId, card){
    const voicesContainer = card.querySelector("#anime_card_voices");

    try{
      const res = await queryAnimeVoices(animeId);
      const topActors = res
        .sort((a, b) => b.favorites - a.favorites)
        .slice(0, 5);

      voicesContainer.innerHTML =  topActors.map(actor => `
        <div>
            <img src="${actor.image_url}" class="actor_img">
            <p>Name: ${actor.name}</p>
            <p>Famous in:: ${actor.relevant_location}</p>
            <p>Favorites: ${actor.favorites}</p>
        </div>
        `).join("");

      card.dataset.voicesloaded = "true";

      localSaveCard(animeId, voicesContainer.innerHTML, "voices"); // Caching the voices

    } catch (err) {
      console.error("Errore in loadAnimeVoices:", err);
    }
  }

  /**
   * Querying functions
   *
   */

  /**
   * Querying the server for the top anime, with the given max and year.
   * @param year Year to query the anime
   * @returns {Promise<*>}
   */
  async function queryTop(year) {
    try {
      const params = { offset, max };
      if (year) params.year = year;

      const res = await axios.get("http://localhost:3000/anime/top", { params });
      return res.data;

    } catch (err) {
      console.error("Error loading queryTop anime:", err);
    }
  }

  /**
   * Querying the server for the recent anime, with the given max.
   * Year is not required, returns DESC.
   * @returns {Promise<*>}
   */
  async function queryRecent() {
    try {
      const res = await axios.get(`http://localhost:3000/anime/recent?offset=${offset}&max=${max}`);
      lastQuery = `http://localhost:3000/anime/recent?`;
      return res.data;
    } catch (err) {
      console.error("Error loading loadTopGlobal anime:", err);
    }
  }

  /**
   * Querying the server for the anime by title, with the given title.
   * @param animeTitle Title of the anime to query
   * @returns {Promise<*>}
   */
  async function queryAnimeByTitle(animeTitle) {
    try{
      const res = await axios.get(`http://localhost:3000/anime/title?title=${animeTitle}`);
      lastQuery = ``;
      offset = 0;
      return res.data;
    } catch (err) {
    }
  }

  /**
   * Querying the server for the anime by id, with the given id.
   * @param animeId Id of the anime to query
   * @returns {Promise<*>}
   */
  async function queryAnimeById(animeId) {
    try{
      const res = await axios.get(`http://localhost:3000/anime/${animeId}`);
      lastQuery = ``;
      offset = 0;
      return res.data;
    } catch (err) {
    }
  }

  /**
   * Querying the server for the anime stats, with the given animeId.
   * @param animeId Id of the anime to query
   * @returns {Promise<*>}
   */
  async function queryAnimeStats(animeId) {
    try{
      const res = await axios.get(`http://localhost:3000/anime/${animeId}/stats`);
      return res.data;
    } catch (err) {
      console.error("Error loading anime stats:", err);
    }
  }

  /**
   * Querying the server for the anime voices, with the given animeId.
   * @param animeId Id of the anime to query
   * @returns {Promise<*>}
   */
  async function queryAnimeVoices(animeId) {
    try{
      const res = await axios.get(`http://localhost:3000/actors/byAnime?animeId=${animeId}`);
      return res.data;
    } catch (err) {
      console.error("Error loading anime voices:", err);
    }
  }

  /**
   * Querying the server for the ratings of the user, with the given username.
   * @param username Username of the user to query
   * @returns {Promise<*>}
   */
  async function queryRatingsByUser(username) {
    try{
      const res = await axios.get(`http://localhost:3000/user/${username}/ratings`);
      return res.data;
    } catch (err) {
      console.error("Error loading anime by user:", err);
    }
  }

  /**
   * Querying the server for the anime by user, with the given filters.
   * @param params
   * @returns {Promise<*>}
   */
  async function queryWithFilters(params){
    try{
      console.log(params);
      offset = 0;
      const res = await axios.get("http://localhost:3000/anime/advanced", { params })

      const qs = new URLSearchParams(params).toString();
      lastQuery = `http://localhost:3000/anime/advanced?${qs}`;

      return res.data;
    } catch (err) {
      console.error("Error loading anime by user:", err);
      resetFilters();
      await loadHome();
    }
  }

  /**
   * Querying the server for the more anime, with the given lastQuery.
   * @returns {Promise<*>}
   */
  async function queryMore() {
    try {
      updateOffset();
      const res = await axios.get(lastQuery);
      return res.data;
    } catch (err) {
      console.error("Error loading loadTopGlobal anime:", err);
    }
  }


  /**
   * Rendering functions
   *
   */

  /**
   * Rendering the catalog with the animeCards created from the animeDetails.
   * @param animeList AnimeDetails to create the animeCards
   * @param catalog Catalog to render the animeCards in
   */
  function renderCatalog(animeList, catalog) {
    const templateSource = document.getElementById("anime_card_template").innerHTML;
    const animeCardTemplate = Handlebars.compile(templateSource);

    catalog.innerHTML = animeList
      .map(a => animeCardTemplate(a))
      .join("");

  }

  /**
   * Appending the animeCards created from the animeDetails to the catalog.
   * @param animeList AnimeDetails to create the animeCards
   * @param catalog Catalog to append the animeCards to
   */
  function appendToCatalog(animeList, catalog) {
    const templateSource = document.getElementById("anime_card_template").innerHTML;
    const animeCardTemplate = Handlebars.compile(templateSource);

    catalog.innerHTML += animeList
      .map(a => animeCardTemplate(a))
      .join("");
  }

  /**
   * Rendering the ratings of the user in the catalog.
   * For each rating, it finds the card with the same animeId and renders the ratings in it.
   * @param ratings Ratings to render in the catalog
   * @param catalog Catalog to render the ratings in
   */
  function renderRatings(ratings, catalog){
    ratings.forEach(rating => {
      const card = catalog.querySelector(`.anime_card[data-id="${rating.anime_id}"]`);
      if (!card) return;

      const ratingBox = card.querySelector("#anime_card_ratings");
      if (ratingBox) {
        ratingBox.classList.remove("hidden");

        ratingBox.innerHTML = `
      <p>Status: ${rating.status}</p>
      <p>Score given: ${rating.score}</p>
      <p>Episodes Watched: ${rating.num_watched_episodes}</p>
    `;
      }
    });
  }




})();
