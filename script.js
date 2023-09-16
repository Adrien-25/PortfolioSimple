const textContainer = document.querySelector(".section__text__p2");
const texts = [
  "Développeur Web Fullstack",
  "Architecte du Web",
  "Maître du clavier",
];
let currentTextIndex = 0;
let currentText = "";
let isWriting = true;

function writeAndEraseText() {
  if (isWriting) {
    currentText += texts[currentTextIndex][currentText.length];
    textContainer.textContent = currentText;
    if (currentText === texts[currentTextIndex]) {
      isWriting = false;
      setTimeout(writeAndEraseText, 2000); // Pause après l'écriture complète
    } else {
      setTimeout(writeAndEraseText, 100); // Délai entre les lettres
    }
  } else {
    if (currentText === "") {
      isWriting = true;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      setTimeout(writeAndEraseText, 0); // Délai avant de commencer à écrire la prochaine phrase
    } else {
      currentText = currentText.slice(0, -1);
      textContainer.textContent = currentText;
      setTimeout(writeAndEraseText, 50); // Délai entre les effacements de lettres
    }
  }
}

writeAndEraseText();

// Toggle menu hamburger
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark / light mode
const btn = document.getElementById("modeToggle");
const btn2 = document.getElementById("modeToggle2");
const themeIcons = document.querySelectorAll(".icon");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  setDarkMode();
}

btn.addEventListener("click", function () {
  setTheme();
});

btn2.addEventListener("click", function () {
  setTheme();
});

function setTheme() {
  let currentTheme = document.body.getAttribute("theme");

  if (currentTheme === "dark") {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function setDarkMode() {
  document.body.setAttribute("theme", "dark");
  localStorage.setItem("theme", "dark");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-dark");
  });
}

function setLightMode() {
  document.body.removeAttribute("theme");
  localStorage.setItem("theme", "light");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-light");
  });
}

// div .presentation
function isElementInMiddleOfScreen() {
  const element = document.querySelector(".presentation > span");
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return rect.bottom >= 0 && rect.bottom <= windowHeight;
}
function activateOnMiddleOfScreen() {
  if (isElementInMiddleOfScreen()) {
    console.log("La div est au milieu de l'écran !");
    pourcentProgress();
  }
}
function pourcentProgress() {
  const presentationDiv = document.querySelector(".presentation > span");
  if (!presentationDiv) return false;
  const rect = presentationDiv.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  var pourcentProgress = (rect.bottom  / (windowHeight-200)) * 100;
  var pourcentProgressNega = ((rect.bottom  / (windowHeight)) * 100)*-1;
  var pourcentProgressVrai=pourcentProgressNega+100;
  console.log(Math.round(pourcentProgressVrai));
  console.log((Math.round(pourcentProgress)));
  pourcentProgressVrai=pourcentProgressVrai*1.5;
  if (pourcentProgressVrai>100){
    pourcentProgressVrai=100;
  }
  backgroundPositionX = `${Math.round(pourcentProgressVrai)}%`;
  

  presentationDiv.style.backgroundPositionX = backgroundPositionX;
}

window.addEventListener("scroll", activateOnMiddleOfScreen);
activateOnMiddleOfScreen();
