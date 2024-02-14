document.addEventListener('DOMContentLoaded', function () {
    const pokedexContainer = document.getElementById('pokedex');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');

    let currentIndex = 0;
    let pokemonData = [];

    // Fetch data from the API
    fetch('https://pokedexdb-api-0eb8c1c33e72.herokuapp.com/api/pokemon')
        .then(response => response.json())
        .then(data => {
            pokemonData = data;
            renderPokemon(currentIndex);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    // Cycle through the JSON data and assemble the Pokémon cards
    function renderPokemon(index) {
        const pokemon = pokemonData[index];

        if (pokemon) {
            const card = document.createElement('div');
            card.classList.add('pokemon-card');

            card.innerHTML = `
                <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p>Type: ${pokemon.strength}</p>
            `;

            pokedexContainer.innerHTML = '';
            pokedexContainer.appendChild(card);
        }
    }
    // 'Next' Button
    function showNextPokemon() {
        currentIndex = (currentIndex + 1) % pokemonData.length;
        renderPokemon(currentIndex);
    }
    // 'Previous' Button
    function showPrevPokemon() {
        currentIndex = (currentIndex - 1 + pokemonData.length) % pokemonData.length;
        renderPokemon(currentIndex);
    }

    nextButton.addEventListener('click', showNextPokemon);
    prevButton.addEventListener('click', showPrevPokemon);
});
