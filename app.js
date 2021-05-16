const container = document.querySelector(".container");
const guessButton = document.querySelector("#guess");
const resetButton = document.querySelector("#reset");
const guessField = document.querySelector("#guessField");
const card = document.querySelector("#card");
const image = document.querySelector("#image");

const scoreLabel = document.querySelector('#score');
const imgUrlBase = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

let score = 0;
let click = 0;
const rounds = 10;
let isGameOver = false;

function generatePokeImg(randomPokeId) {
    image.src = `${imgUrlBase}${randomPokeId}.png`;
}

async function generatePokemon() {
    if (!isGameOver) {
        const randomPokeId = Math.floor(Math.random() * 151 + 1);
        const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeId}`)
            .then(response => response.json());
        generatePokeImg(pokemonInfo.id);
        scoreLabel.innerText = `${score} / ${rounds}`;
        check(pokemonInfo.name);
    }
    if (click === rounds) {
        isGameOver = true;
        guessButton.disabled = true;
        guessButton.style.visibility = 'hidden';
        card.removeChild(image);
        (score >= 5) ? scoreLabel.innerText = `You got ${score} / ${rounds}! Well done.` : scoreLabel.innerText = `You got ${score} / ${rounds}! Better luck next time.`;

    }
}

function check(pokemonName) {
    guessButton.onclick = () => {
        click++;
        if (guessField.value.toLowerCase() === pokemonName) {
            score++;
        }
        guessField.value = "";
        generatePokemon();
    }
}
resetButton.onclick = () => {
    isGameOver = false;
    guessButton.disabled = false;
    click = 0;
    score = 0;
    scoreLabel.innerText = `${score} / ${rounds}`;
    guessField.value = "";
    guessButton.style.visibility = 'visible';
    card.appendChild(image);
}

generatePokemon();


