document.addEventListener('DOMContentLoaded', () => {
    const maxId = 1025;
    const img = document.getElementById('pokemonimg');
    const typeText = document.getElementById('pokemon-type');
   const refreshButtons = document.querySelectorAll('.boton');
   const txtTurnos = document.getElementById('contador-turnos');

   let turnos= 0;
    let aciertos = 0;
    let fallos = 0;

    const getRandomPokemonId = () => Math.floor(Math.random() * maxId) + 1;

    const renderPokemon = pokemon => {
        const sprite = pokemon.sprites?.front_default;
        const name = pokemon.name || 'Desconocido';
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

        if (name) {
        name.textContent = name.toUpperCase(); 
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

   
    const procesarTurno = (botonId) => {

        if (botonId === 'botonreal') {
            aciertos++;
        } else if (botonId === 'botonfalso') {
            fallos++;
        }
        turnos++;
        if (txtTurnos) {
            txtTurnos.textContent = `10/${turnos}`;
        }
        if (turnos >= 10) {
       
            localStorage.setItem('aciertos', aciertos);
            localStorage.setItem('fallos', fallos);

        
            window.location.href = 'resultados.html';
        } else {
    
            fetchPokemon();
        }
    };

    fetchPokemon();

   refreshButtons.forEach(boton => {
    boton.addEventListener('click', () => {
        procesarTurno(boton.id); 
    });
});
});
