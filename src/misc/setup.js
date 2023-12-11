import links from "/src/assets/data-objects/links";

// assign link to source code link
document.getElementById('source-link').href = links.src;

// get current year for copyright
document.getElementById('date-span').innerText = `${new Date().getFullYear()}`;