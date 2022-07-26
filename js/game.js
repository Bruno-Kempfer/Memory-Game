const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.time');

let firstCard = "";
let secondCard = "";

const characters = [
  "beth",
  "jerry",
  "jessica",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const checkEndGame = () => {
  const disableCards = document.querySelectorAll('.disable_card');

  if (disableCards.length == 20) {
    clearInterval(this.loop);
    alert(`Parabens, ${spanPlayer.innerHTML}! Seu tempo foi:${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter == secondCharacter) {
    firstCard.firstChild.classList.add('disable_card');
    secondCard.firstChild.classList.add('disable_card');
    firstCard ='';
    secondCard='';

    checkEndGame();
  } else {
    setTimeout(()=>{
      
    firstCard.classList.remove('revel_card');
    secondCard.classList.remove('revel_card');
    firstCard ='';
    secondCard='';
    },500)
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("revel_card")) {
    return;
  }

  if (firstCard == "") {
    target.parentNode.classList.add("revel_card");
    firstCard = target.parentNode;
  } else if (secondCard == "") {
    target.parentNode.classList.add("revel_card");
    secondCard = target.parentNode;
  }

  checkCards();
};

const creatCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../Imagens/${character}.png')`;

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  card.appendChild(front);
  card.appendChild(back);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = creatCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000)
}

window.onload = () => {
  startTimer()
  spanPlayer.innerHTML = localStorage.getItem('player');
  loadGame();
}


