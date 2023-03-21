import UI_ELEMENTS from "./uiElements.mjs";
import { API_ENDPOINTS } from "./apiEndpoints.mjs";

const navLinks = document.querySelectorAll(UI_ELEMENTS.navLinks);
const main = document.querySelector(UI_ELEMENTS.main);
const languageSelectors = document.querySelectorAll("[data-language-key]");
console.log(languageSelectors);

activateButtons();

function loadView(path) {
  console.log("Loading view: " + path);
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
  let path = e.target.getAttribute("href");

  //Sometimes the path is null or undefined, so we need to set it to the root path manually
  if (path === null || path === undefined) {
    path = "/";
  }

  loadView(path);
}

navLinks.forEach((link) => {
  link.addEventListener("click", handleNav);
});

function activateButtons() {
  const buttons = document.querySelectorAll(UI_ELEMENTS.button);
  const inputs = document.querySelectorAll(UI_ELEMENTS.input);;

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const actionValue = button.attributes["data-btn-action"].value;
      //Checks if the button has a context attribute, if it does, it will be added to the data object. If not it will be ignored.
      const context = button.attributes["data-context"]?.value;
      console.log(actionValue);

      const postUrl = API_ENDPOINTS[actionValue];
      console.log(postUrl);

      const data = {};

      inputs.forEach((input) => {
        data[input.attributes["name"].value] = input.value;
        data["context"] = context;
      });

      postData(postUrl, data, loadView("/"));
    });
  });
}

async function postData(url = "", data = {}, callback, method = "POST") {
  const response = await fetch(url, {
    method,
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
