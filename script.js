/*  ÉTAPE 5 : NAVBAR AU SCROLL + BOUTON ESCAPADE + RETOUR EN HAUT 
   1. ON RÉCUPÈRE LES ÉLÉMENTS DE LA PAGE */

console.log("Le JavaScript démarre");

const navbar = document.getElementById("navbar");
const btnEscapade = document.getElementById("btn-escapade");
const sectionDestinations = document.getElementById("destinations");
const btnTop = document.getElementById("btn-top");

/* 2. NAVBAR ET BOUTON RETOUR EN HAUT AU SCROLL
   L'événement "scroll" se déclenche chaque fois que
   l'utilisateur fait défiler la page.
   window.scrollY = combien de pixels on a descendu. */
window.addEventListener("scroll", function () {

  // --- La navbar ---
  // Si on a descendu de plus de 50 pixels : on ajoute la classe "scrolled"
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    // Sinon on la retire (on est revenu en haut)
    navbar.classList.remove("scrolled");
  }

  // --- Le bouton retour en haut ---
  // Si on a descendu de plus de 400 pixels : on retire "hidden" (le bouton apparaît)
  if (window.scrollY > 400) {
    btnTop.classList.remove("hidden");
  } else {
    // Sinon on remet "hidden" (le bouton disparaît)
    btnTop.classList.add("hidden");
  }

});

/*3. BOUTON "TROUVER MON ESCAPADE"
   Au clic, la page descend doucement vers la section Destinations. */
btnEscapade.addEventListener("click", function () {
  sectionDestinations.scrollIntoView({ behavior: "smooth" });
});


/* 4. BOUTON "RETOUR EN HAUT"
Au clic, la page remonte doucement tout en haut. */
btnTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
 
/* ÉTAPE 6 : FILTRES + VOIR PLUS / VOIR MOINS
   À COLLER À LA FIN DE TON FICHIER script.js */

/*5. LES FILTRES*/

// querySelectorAll(".filter-btn") récupère TOUS les éléments qui ont cette classe.
// On obtient une liste (comme un tableau) de boutons.
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

// forEach = "pour chaque bouton de la liste, fais ceci"
filterButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    // 1) On retire la classe "active" de TOUS les boutons
    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });

    // 2) On l'ajoute seulement au bouton cliqué
    button.classList.add("active");

    // 3) On lit la catégorie choisie : data-filter="plage" dans le HTML
    //    devient button.dataset.filter en JavaScript
    const choix = button.dataset.filter;

    // 4) Pour chaque carte, on décide si on la montre ou on la cache
    cards.forEach(function (card) {

      // card.dataset.category = la valeur de data-category="..." de la carte
      if (choix === "tout" || card.dataset.category === choix) {
        card.classList.remove("hidden");   // on montre la carte
      } else {
        card.classList.add("hidden");      // on cache la carte
      }

    });

  });

});

/* 6. VOIR PLUS / VOIR MOINS*/
const moreButtons = document.querySelectorAll(".more-btn");

moreButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    // closest(".card") remonte dans le HTML jusqu'à la carte qui contient ce bouton
    const card = button.closest(".card");

    // On cherche, DANS cette carte seulement, le bloc des infos cachées
    const extra = card.querySelector(".card-extra");

    // toggle = "bascule" : si la classe est là, il la retire ; sinon, il l'ajoute
    extra.classList.toggle("hidden");

    // On change le texte du bouton selon l'état
    if (extra.classList.contains("hidden")) {
      button.textContent = "Voir plus";     // infos cachées
    } else {
      button.textContent = "Voir moins";    // infos visibles
    }

  });

});

/* ÉTAPE 7 : FAVORIS + COMPTEUR DANS LA NAVBAR
/*7. LES FAVORIS */

// Tous les boutons cœur des cartes
const favButtons = document.querySelectorAll(".fav-btn");

// Le petit chiffre dans la navbar : <span id="fav-count">0</span>
const favCount = document.getElementById("fav-count");


// Cette fonction compte les favoris et affiche le nombre dans la navbar
function mettreAJourCompteur() {

  // ".fav-btn.active" = les boutons cœur qui ont la classe "active"
  // (donc les destinations en favori).
  // .length = combien il y en a.
  const nombre = document.querySelectorAll(".fav-btn.active").length;

  // On écrit ce nombre dans la navbar
  favCount.textContent = nombre;
}

// Pour chaque bouton cœur...
favButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    // toggle : 1er clic = ajoute "active" (cœur rouge)
    //          2e clic = retire "active" (cœur normal)
    button.classList.toggle("active");

    // On change aussi le dessin du cœur : ♥ (plein) ou ♡ (vide)
    if (button.classList.contains("active")) {
      button.textContent = "♥";
    } else {
      button.textContent = "♡";
    }

    // Et on met à jour le chiffre dans la navbar
    mettreAJourCompteur();

  });
 
});
// console.log("Clic sur un favori");
/*ÉTAPE 8 : MODE SOMBRE + FAQ
   À COLLER À LA FIN DE TON FICHIER script.js */


/* 8. MODE SOMBRE */
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function () {

  // document.body = la balise <body> de la page.
  // On ajoute / retire la classe "dark".
  // Le CSS (body.dark) change alors toutes les couleurs d'un coup.
  document.body.classList.toggle("dark");

  // On change le dessin du bouton : soleil en mode sombre, lune en mode clair
  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }

});

/* 9. FAQ (questions / réponses)  */
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

  question.addEventListener("click", function () {

    // On remonte jusqu'au bloc .faq-item qui contient cette question
    const item = question.closest(".faq-item");

    // On cherche, DANS ce bloc, la réponse et l'icône (+ ou −)
    const reponse = item.querySelector(".faq-answer");
    const icone = item.querySelector(".faq-icon");

    // On montre ou on cache la réponse
    reponse.classList.toggle("hidden");

    // On change l'icône selon l'état
    if (reponse.classList.contains("hidden")) {
      icone.textContent = "+";     // réponse cachée
    } else {
      icone.textContent = "−";     // réponse visible
    }

  });

});





/* =====================================================
   ÉTAPE 9 : MENU ☰ SUR TÉLÉPHONE
   À COLLER À LA FIN DE TON FICHIER script.js
   ===================================================== */

// const menuBtn = document.getElementById("menu-btn");
// const navLinks = document.querySelector(".nav-links");

// // Au clic sur ☰ : on ouvre ou on ferme le menu
// menuBtn.addEventListener("click", function () {

//   // toggle : ajoute "open" si absente, la retire si présente
//   navLinks.classList.toggle("open");

//   // On change le dessin du bouton : ✕ quand le menu est ouvert, ☰ sinon
//   if (navLinks.classList.contains("open")) {
//     menuBtn.textContent = "✕";
//   } else {
//     menuBtn.textContent = "☰";
//   }

// });

// // Quand on clique sur un lien du menu, on referme le menu
// navLinks.querySelectorAll("a").forEach(function (lien) {

//   lien.addEventListener("click", function () {
//     navLinks.classList.remove("open");
//     menuBtn.textContent = "☰";
//   });

// });
