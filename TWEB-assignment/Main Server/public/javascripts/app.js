(function () {

// Login features
  const buttonSubmitLogin = document.getElementById("buttonSubmitLogin");
  const inputName = document.getElementById("inputName");
  const inputPassword = document.getElementById("inputPassword");

  const divLogin = document.getElementById("divLogin");
  const divLoggedIn = document.getElementById("divLoggedIn");
  const divWaitingLogin = document.getElementById("divWaitingLogin");


// Login Btn
  buttonSubmitLogin.addEventListener("click",  (e) => {
    e.preventDefault();
    const username = inputName.value.trim();
    const password = inputPassword.value.trim();

    login(username, password);
  });

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


// Hamburger btn with menu animation
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

// Anime Cards Features

// Search Bar Features

  const btnAnimeSearch = document.getElementById("btnAnimeSearch");

  btnAnimeSearch.addEventListener("click", (e) => {
    e.preventDefault();

    loadAnimeByTitle();
  })

  const btnResetSearch = document.getElementById("btnResetSearch");
  const inputAnimeSearch = document.getElementById("inputAnimeSearch");

  btnResetSearch.addEventListener("click", (e) => {
    e.preventDefault();
    inputAnimeSearch.value = "";
    inputAnimeSearch.placeholder = "Search anime...";
    loadHome();
  })

// Overlay
  const overlay = document.getElementById("overlay");

  overlay.addEventListener("click", () => {
    closeLeftMenu();
  });


// Document
  let currentlyOpenCard = null;

  // Anime Cards Expansion
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
      if(card.dataset.statsloaded === "false")
        loadAnimeStats(card.dataset.id, card);
      if(card.dataset.voicesloaded === "false")
        loadAnimeVoices(card.dataset.id, card);

      return;
    }

    // 2) Outside Click → Close Any Opened Card
    if (currentlyOpenCard) {
      toggleCard(currentlyOpenCard);
      currentlyOpenCard = null;
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    loadHome();
  });




// Functions
  function toggleCard(card){
    const details = card.querySelectorAll(".anime_card_details");
    card.classList.toggle("open");
    details.forEach(detail => detail.classList.toggle("open"));
  }
  // Home
  async function loadHome() {
    try {
      const res = await queryTop(20, 2025);
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
      const res = await queryRatingsByUser(username);
      const ratings = res.slice(0, 10);

      const promises = ratings.map( r => queryAnimeById(r.anime_id) );
      const animeList = await Promise.all(promises);

      const catalog = document.querySelector("#personalCatalog");
      renderCatalog(animeList, catalog);

      renderRatings(res, catalog);

      const catalogContainer = document.querySelector("#personalCatalogContainer");
      catalogContainer.classList.remove("hidden");

    } catch (err) {
      console.error("Errore in loadPersonalHome:", err);
    }
  }



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

  // 🕒 Recent
  async function loadRecentAnime() {
    try {
      const res = await queryRecent(20);
      const catalog = document.querySelector("#mainCatalog");
      renderCatalog(res, catalog);
    } catch (err) {
      console.error("Errore in loadRecentAnime:", err);
    }
  }

  //
  async function loadTopGlobal(){
    try{
      const res = await queryTop(20);
      const catalog = document.querySelector("#mainCatalog");
      renderCatalog(res, catalog);
    } catch (err) {
      console.error("Errore in loadTopGlobal:", err);
    }
  }

  //
  async function closeLeftMenu(){
    menuOffCanvas.classList.toggle("open");
    overlay.classList.toggle("show");
  }

  //
  let lastQuery = "";
  let offset = 0;

  async function loadMore(){
    try{
      if(lastQuery === ""){
        return;
      }
      offset += 1;
      const res = await queryMore();
      appendToCatalog(res);
    } catch (err) {
      console.error("Errore in loadMore:", err);
    }
  }

  //
  const btnLoadMore = document.getElementById("btnLoadMore");
  btnLoadMore.addEventListener("click", loadMore);

  function createLoadMoreBtn(){
    const catalog = document.getElementById("mainCatalog");
    const btn = document.createElement("button");
    btn.textContent = "Load More";
    btn.id = "btnLoadMore";
    btn.addEventListener("click", loadMore);
    catalog.appendChild(btn);
  }

  //
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

      card.dataset.statsLoaded = "true"

    } catch (err) {
      console.error("Errore in loadAnimeStats:", err);
    }
  }

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

      card.dataset.voicesloaded = "true"

    } catch (err) {
      console.error("Errore in loadAnimeVoices:", err);
    }
  }
// Query

  async function queryTop(max, year) {
    try {
      const params = { offset, max };
      if (year) params.year = year;

      const res = await axios.get("http://localhost:3000/anime/top", { params });
      return res.data;

    } catch (err) {
      console.error("Error loading queryTop anime:", err);
    }
  }

  async function queryRecent(max) {
    try {
      const res = await axios.get(`http://localhost:3000/anime/recent?offset=${offset}&max=${max}`);
      lastQuery = `http://localhost:3000/anime/recent?`;
      return res.data;
    } catch (err) {
      console.error("Error loading loadTopGlobal anime:", err);
    }
  }

  async function queryAnimeByTitle(animeTitle) {
    try{
      const res = await axios.get(`http://localhost:3000/anime/title?title=${animeTitle}`);
      lastQuery = ``;
      offset = 0;
      return res.data;
    } catch (err) {
    }
  }

  async function queryAnimeById(animeId) {
    try{
      const res = await axios.get(`http://localhost:3000/anime/${animeId}`);
      lastQuery = ``;
      offset = 0;
      return res.data;
    } catch (err) {
    }
  }

  async function queryAnimeStats(animeId) {
    try{
      const res = await axios.get(`http://localhost:3000/anime/${animeId}/stats`);
      return res.data;
    } catch (err) {
      console.error("Error loading anime stats:", err);
    }
  }

  async function queryAnimeVoices(animeId) {
    try{
      const res = await axios.get(`http://localhost:3000/actors/byAnime?animeId=${animeId}`);
      return res.data;
    } catch (err) {
      console.error("Error loading anime voices:", err);
    }
  }

  async function queryRatingsByUser(username) {
    try{
      const res = await axios.get(`http://localhost:3000/user/${username}/ratings`);
      return res.data;
    } catch (err) {
      console.error("Error loading anime by user:", err);
    }
  }

  async function queryMore() {
    try {
      const max = 15;
      const url = `${lastQuery}offset=${offset}&max=${max}`
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error("Error loading loadTopGlobal anime:", err);
    }
  }


// Render
  function renderCatalog(animeList, catalog) {
    const templateSource = document.getElementById("anime_card_template").innerHTML;
    const animeCardTemplate = Handlebars.compile(templateSource);

 //   const container = document.querySelector(".catalog");

    catalog.innerHTML = animeList
      .map(a => animeCardTemplate(a))
      .join("");

  }
  function appendToCatalog(animeList, catalog) {
    const templateSource = document.getElementById("anime_card_template").innerHTML;
    const animeCardTemplate = Handlebars.compile(templateSource);

  //  const container = document.querySelector(".catalog");
    catalog.innerHTML += animeList
      .map(a => animeCardTemplate(a))
      .join("");
  }

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
