const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let flippedCards = [];
let matchedCards = [];

function createCard(card) {
  const element = document.createElement('div');
  element.classList.add('card');
  element.innerHTML = `<div class="card-front"></div><div class="card-back">${card}</div>`;
  element.addEventListener('click', () => flipCard(element));
  return element;
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }
}

function checkForMatch() {
  const card1 = flippedCards[0].querySelector('.card-back').textContent;
  const card2 = flippedCards[1].querySelector('.card-back').textContent;
  if (card1 === card2) {
    flippedCards.forEach(card => card.classList.add('matched'));
    matchedCards.push(...flippedCards);
  } else {
    flippedCards.forEach(card => card.classList.remove('flipped'));
  }
  flippedCards = [];
  if (matchedCards.length === cards.length) {
    setTimeout(() => alert('Parabéns, você venceu o jogo!'), 500);
  }
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
  }
}

function initializeGame() {
  const gameContainer = document.querySelector('.memory-game');
  shuffleCards();
  cards.forEach(card => {
    const newCard = createCard(card);
    gameContainer.appendChild(newCard);
  });
}

initializeGame();
