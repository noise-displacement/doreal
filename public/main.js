const main = document.querySelector("main");
const navLinks = document.querySelectorAll("nav a");

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
      main.innerHTML = div.querySelector("main").innerHTML;

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
  const buttons = document.querySelectorAll("button");
  const inputs = document.querySelectorAll("input");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const data = {};

      inputs.forEach((input) => {
        data[input.attributes["name"].value] = input.value;
      })

      postData(button.attributes["data-post-url"].value, data, () => {
        loadView("/dashboard");
      });
    })
  })
}

async function postData(url = "", data = {}, callback) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if(response.status === 200) {
    callback();
  } else {
    console.log(response.status);
  }

  return response.json();
}