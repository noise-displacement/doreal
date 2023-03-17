import UI_ELEMENTS from "./uiElements.mjs";

const navLinks = document.querySelectorAll(UI_ELEMENTS.navLinks);
const main = document.querySelector(UI_ELEMENTS.main);

activateButtons();

function loadView(path) {
  fetch(path)
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      // Parses the result to HTML so we can querySelect the contents of main
      const div = document.createElement("div");
      div.innerHTML = html;
      main.innerHTML = div.querySelector(UI_ELEMENTS.main).innerHTML;

      activateButtons();
    });
}

function handleNav(e) {
  e.preventDefault();
  const path = e.target.getAttribute("href");
  loadView(path);
}

navLinks.forEach((link) => {
  link.addEventListener("click", handleNav);
});

function activateButtons() {
  const buttons = document.querySelectorAll(UI_ELEMENTS.button);
  const inputs = document.querySelectorAll(UI_ELEMENTS.input);
  console.log(inputs, buttons);

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const actionValue = button.attributes["data-btn-action"].value;
      const postUrl = button.attributes["data-post-url"].value;

      const data = {};

      inputs.forEach((input) => {
        data[input.attributes["name"].value] = input.value;
      });

      if (actionValue === "login") {
        login(postUrl, data);
      } else if (actionValue === "logout") {
        logout(postUrl);
      } else if(actionValue === "register") {
        register(postUrl, data);
      } else if(actionValue === "sendPost") {
        sendPost(postUrl, data);
      }
    });
  });
}

function login(btnPostUrl, data) {
  postData(btnPostUrl, data, loadView("/"));
}

function logout(btnPostUrl) {
  postData(btnPostUrl, undefined, loadView("/users/login"));
}

function register(btnPostUrl, data) {
  postData(btnPostUrl, data, loadView("/users/onRegisterComplete"));
}

function sendPost(btnPostUrl, data) {
  console.log("button clicked");
  postData(btnPostUrl, data, loadView("/"));
}

async function postData(url = "", data = {}, callback) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
      callback;
  } else {
    console.log(response.status);
  }

  return response.json();
}
