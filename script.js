document.addEventListener('DOMContentLoaded', () => {
    const maxId = 220;
    const img = document.getElementById('pokemonimg');
    const typeText = document.getElementById('pokemon-type');
    const refreshButtons = document.querySelectorAll('.boton');

    const getRandomPokemonId = () => Math.floor(Math.random() * maxId) + 1;

    const renderPokemon = pokemon => {
        const sprite = pokemon.sprites?.front_default;
        const types = pokemon.types?.map(typeInfo => typeInfo.type.name) || [];

        if (img) {
            if (sprite) {
                img.src = sprite;
                img.alt = pokemon.name || 'Pokemon';
            } else {
                img.src = '';
                img.alt = 'Sprite no disponible :,u';
            }
        }

        if (typeText) {
            typeText.textContent = types.length
                ? `Tipo${types.length > 1 ? 's' : ''}: ${types.join(' / ')}`
                : 'Tipo no disponible xd';
        }
    };

    const fetchPokemon = () => {
        const id = getRandomPokemonId();
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('salio mal :v');
                return response.json();
            })
            .then(renderPokemon)
            .catch(error => {
                console.error('Error al cargar Pokémon :v', error);
            });
    };

    fetchPokemon();

    refreshButtons.forEach(document.getElementById("boton") 
        Image.addEventListener('click', fetchPokemon);
    });
