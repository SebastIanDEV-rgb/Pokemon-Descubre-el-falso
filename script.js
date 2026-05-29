document.addEventListener('DOMContentLoaded', () => {
    const maxId = 151;
    const id = Math.floor(Math.random() * maxId) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    const img = document.getElementById('pokemonimg');

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('salio mal :v');
            return response.json();
        })
        .then(pokemon => {
            const sprite = pokemon.sprites && pokemon.sprites.front_default;
            if (sprite && img) {
                img.src = sprite;
            } else if (img) {
                img.alt = 'Sprite no disponible :,u';
            }
        })
        .catch(error => {
            console.error('Error al cargar Pokémon:', error);
        });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("boton").addEventListener("click", function () { 
    const maxId = 151;
    const id = Math.floor(Math.random() * maxId) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    const img = document.getElementById('pokemonimg');

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('salio mal :v');
            return response.json();
        })
        .then(pokemon => {
            const sprite = pokemon.sprites && pokemon.sprites.front_default;
            if (sprite && img) {
                img.src = sprite;
            } else if (img) {
                img.alt = 'Sprite no disponible :,u';
            }
        })
        .catch(error => {
            console.error('Error al cargar Pokémon:', error);
        });
        });
});
