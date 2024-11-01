/*---------------------------------------------------
  WRITING TEXT
*/
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

/*---------------------------------------------------
  TOGGLE MENU HAMBURGER
*/
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const bodyContent = document.querySelector("body");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  bodyContent.classList.toggle("no-scroll");
}

/*---------------------------------------------------
  DARK / LIGHT MODE
*/
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
  // document.body.removeAttribute("theme");
  document.body.setAttribute("theme", "light");

  localStorage.setItem("theme", "light");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-light");
  });
}

/*---------------------------------------------------
  AJOUT ANIMATION SUR TEXTE 'perfectionniste' 
*/
function isElementInMiddleOfScreen() {
  const element = document.querySelector(".presentation > span");
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return rect.bottom >= 0 && rect.bottom <= windowHeight;
}
function activateOnMiddleOfScreen() {
  if (isElementInMiddleOfScreen()) {
    // console.log("La div est au milieu de l'écran !");
    pourcentProgress();
  }
}
function pourcentProgress() {
  const presentationDiv = document.querySelector(".presentation > span");
  if (!presentationDiv) return false;
  const rect = presentationDiv.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  var pourcentProgress = (rect.bottom / (windowHeight - 200)) * 100;
  var pourcentProgressNega = (rect.bottom / windowHeight) * 100 * -1;
  var pourcentProgressVrai = pourcentProgressNega + 100;
  pourcentProgressVrai = pourcentProgressVrai * 1.5;
  if (pourcentProgressVrai > 100) {
    pourcentProgressVrai = 100;
  }
  backgroundPositionX = `${Math.round(pourcentProgressVrai)}%`;

  presentationDiv.style.backgroundPositionX = backgroundPositionX;
}

window.addEventListener("scroll", activateOnMiddleOfScreen);
activateOnMiddleOfScreen();

/*---------------------------------------------------
  AJOUT BACKGROUND SUR LA NAVBAR APRES LE SCROLL 
*/
const desktopNav = document.getElementById("desktop-nav");
const hamburgerNav = document.getElementById("hamburger-nav");

window.addEventListener("scroll", function () {
  // Vérifiez la position de défilement
  if (window.scrollY > 20) {
    desktopNav.classList.add("scrolled");
    hamburgerNav.classList.add("scrolled");
  } else {
    desktopNav.classList.remove("scrolled");
    hamburgerNav.classList.remove("scrolled");
  }
});
/*---------------------------------------------------
  PROGRESS BAR
*/
window.onscroll = function () {
  const progressBar = document.getElementById("progress-bar");
  const scrollTop = document.documentElement.scrollTop;
  const documentHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / documentHeight) * 100;

  progressBar.style.width = scrollPercent + "%";
};

/*---------------------------------------------------
  CANVAS TERMINAL EFFECT
*/
// script.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caractères à utiliser pour l'effet terminal
const characters = "abcdefghijklmnopqrstuvwxyz,"; // Caractères spécifiés

// Paramètres de mise en page
const lineHeight = 15; // Réduit la hauteur entre chaque ligne (de 20 à 10)
const columns = Math.floor(canvas.width / 15); // Nombre de colonnes en fonction de la largeur du canvas
const rows = Math.floor(canvas.height / lineHeight); // Nombre de lignes en fonction de la hauteur du canvas

// Créer un tableau pour stocker les caractères
let characterMatrix = [];

// Initialiser la matrice de caractères avec des caractères aléatoires et des espaces
for (let i = 0; i < rows; i++) {
  characterMatrix[i] = [];
  for (let j = 0; j < columns; j++) {
    // Ajouter un espace aléatoirement
    if (Math.random() < 0.6) {
      // 60% de chance de mettre un espace (augmenter de 40% à 60%)
      characterMatrix[i][j] = " "; // Un espace
    } else {
      characterMatrix[i][j] =
        characters[Math.floor(Math.random() * characters.length)];
    }
  }
}

// Fonction pour dessiner des caractères en lignes
function drawRandomCharacters() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      ctx.font = "13px Courier"; // Taille du texte
      ctx.fillStyle = "rgba(0, 255, 0, 0.7)"; // Couleur des caractères
      ctx.fillText(characterMatrix[i][j], j * 15, i * lineHeight); // Dessiner le caractère
    }
  }

  // Mettre à jour les caractères aléatoirement
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // 30% de chance de changer un caractère ou de le rendre vide (augmenter de 20% à 30%)
      if (Math.random() < 0.3) {
        // Pour remplacer par un espace ou un caractère aléatoire
        characterMatrix[i][j] =
          Math.random() < 0.6
            ? " "
            : characters[Math.floor(Math.random() * characters.length)];
      }
    }
  }
}

// Créer des caractères à intervalles réguliers
setInterval(drawRandomCharacters, 50); // Générer des caractères toutes les 50 ms pour une mise à jour plus rapide
