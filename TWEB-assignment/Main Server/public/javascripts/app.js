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

      console.log("spanUsername:", spanUsername);
      console.log("profile:", profile);


      divWaitingLogin.style.display = "none";

      if (profile) {
        const spanUsername = document.getElementById("spanUsername");
        spanUsername.textContent = profile.username;
        divLoggedIn.style.display = "block";
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
      const res = await axios.get(`http://localhost:3001/user/${username}/profile`);
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
  document.getElementById("menu-trending").addEventListener("click", (e) => {
    e.preventDefault();
    closeLeftMenu()
    offset = 0;
    loadTrending();
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

  async function loadCategory(type) {
    resultsContainer.innerHTML = "<p>Loading...</p>";

  //  const res = await fetch(`/api/category?type=${type}`); // to change
  //  const res = await axios.get(`http://localhost:8081/user/${username}/profile`);

    const data = await res.json();

    renderResults(data.results);
  }
// Anime Cards Features


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
      const details = card.querySelector(".anime_card_details");

      // Clicked On The Same Card → Toggle
      if (card === currentlyOpenCard) {
        card.classList.toggle("open");
        details.classList.toggle("hidden");
        if (!card.classList.contains("open")) {
          currentlyOpenCard = null;
        }
        return;
      }

      // Card Already Opened -> Close It
      if (currentlyOpenCard) {
        const oldDetails = currentlyOpenCard.querySelector(".anime_card_details");
        currentlyOpenCard.classList.remove("open");
        oldDetails.classList.add("hidden");
      }

      // Open New Card
      card.classList.add("open");
      details.classList.remove("hidden");
      currentlyOpenCard = card;
      return;
    }

    // 2) Outside Click → Close Any Opened Card
    if (currentlyOpenCard) {
      currentlyOpenCard.classList.remove("open");
      const oldDetails = currentlyOpenCard.querySelector(".anime_card_details");
      oldDetails.classList.toggle("hidden");
      currentlyOpenCard = null;
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    loadHome();
  });




// Functions
  // Home
  async function loadHome() {
    try {
      const res = await queryTopByYear(2025, 20);
      renderCatalog(res);
    } catch (err) {
      console.error("Errore in loadHome:", err);
    }
  }

  // 🕒 Recent
  async function loadRecentAnime() {
    try {
      const res = await queryRecent(20);
      renderCatalog(res);
    } catch (err) {
      console.error("Errore in loadRecentAnime:", err);
    }
  }
  //
  async function loadTopGlobal(){
    try{
      const res = await queryTopGlobal(20);
      renderCatalog(res);
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

// Query

  async function queryTopByYear(year, max) {
    try {
      const res = await axios.get(`http://localhost:8082/anime/top?offset=${offset}&max=${max}&year=${year}`);
      lastQuery = `http://localhost:8082/anime/top?year=${year}&`; // qui metto & finale
      return res.data;
    } catch (err) {
      console.error("Error loading queryTopByYear anime:", err);
    }
  }

  async function queryTopGlobal(max) {
    try {
      const res = await axios.get(`http://localhost:8082/anime/top?offset=${offset}&max=${max}`);
      lastQuery = `http://localhost:8082/anime/top?`;
      return res.data;
    } catch (err) {
      console.error("Error loading loadTopGlobal anime:", err);
    }
  }

  async function queryRecent(max) {
    try {
      const res = await axios.get(`http://localhost:8082/anime/recent?offset=${offset}&max=${max}`);
      lastQuery = `http://localhost:8082/anime/recent?`;
      return res.data;
    } catch (err) {
      console.error("Error loading loadTopGlobal anime:", err);
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
  function renderCatalog(animeList) {
    const templateSource = document.getElementById("anime_card_template").innerHTML;
    const animeCardTemplate = Handlebars.compile(templateSource);

    const container = document.querySelector(".catalog");

    container.innerHTML = animeList
      .map(a => animeCardTemplate(a))
      .join("");

  }
  function appendToCatalog(animeList) {
    const templateSource = document.getElementById("anime_card_template").innerHTML;
    const animeCardTemplate = Handlebars.compile(templateSource);

    const container = document.querySelector(".catalog");
    container.innerHTML += animeList
      .map(a => animeCardTemplate(a))
      .join("");
  }
})();
