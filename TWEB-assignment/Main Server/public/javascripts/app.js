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

  document.getElementById("menu-home").addEventListener("click", () => loadCategory("home"));
  document.getElementById("menu-trending").addEventListener("click", () => loadCategory("trending"));
  document.getElementById("menu-top10").addEventListener("click", () => loadCategory("top10"));
  document.getElementById("menu-recent").addEventListener("click", () => loadCategory("recent"));

  async function loadCategory(type) {
    resultsContainer.innerHTML = "<p>Loading...</p>";

  //  const res = await fetch(`/api/category?type=${type}`); // to change
  //  const res = await axios.get(`http://localhost:8081/user/${username}/profile`);

    const data = await res.json();

    renderResults(data.results);
  }
// Anime Cards Features
  function toggleCard(card) {
    card.classList.toggle("open");
  }


// Overlay
  const overlay = document.getElementById("overlay");

  overlay.addEventListener("click", () => {
    menuOffCanvas.classList.remove("open");
    overlay.classList.remove("show");
  });


// Document
  let currentlyOpenCard = null;

  document.addEventListener("click", (event) => {
    const card = event.target.closest(".anime_card");

    // 1) Click On A Card
    if (card) {
      // Clicked On The Same Card → Toggle
      if (card === currentlyOpenCard) {
        card.classList.toggle("open");
        if (!card.classList.contains("open")) {
          currentlyOpenCard = null;
        }
        return;
      }

      // Card Already Opened -> Close It
      if (currentlyOpenCard) {
        currentlyOpenCard.classList.remove("open");
      }

      // Open New Card
      card.classList.add("open");
      currentlyOpenCard = card;
      return;
    }

    // 2) Outside Click → Close Any Opened Card
    if (currentlyOpenCard) {
      currentlyOpenCard.classList.remove("open");
      currentlyOpenCard = null;
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    loadRecentAnime();
  });


// Functions
  //
  async function loadRecentAnime() {
    try {
      const currentYear = new Date().getFullYear();
      await loadTopByYear(currentYear, 10);

    } catch (err) {
      console.error("Errore in loadRecentAnime:", err);
    }
  }
// Query
  async function loadTopByYear(year, max) {
    try {
      const res = await axios.get(`http://localhost:8082/anime/top?year=${year}&max=${max}`);
      const topAnime = res.data;

      renderCatalog(topAnime);
    } catch (err) {
      console.error("Error loading TopByYear anime:", err);
    }
  }

// Render
  function renderCatalog(animeList) {
    console.log("animeList ricevuta:", animeList);
    const templateSource = document.getElementById("anime_card_template").innerHTML;
    const animeCardTemplate = Handlebars.compile(templateSource);

    const container = document.querySelector(".catalog");

    console.log("container trovato:", container);
    console.log("template trovato:", templateSource);       // il template esiste?
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
