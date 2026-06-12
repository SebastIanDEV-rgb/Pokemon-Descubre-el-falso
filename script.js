document.addEventListener('DOMContentLoaded', () => {
    const maxId = 1025;
    const img = document.getElementById('pokemonimg');
    const typeText = document.getElementById('pokemon-type');
   const refreshButtons = document.querySelectorAll('.boton');
   const txtTurnos = document.getElementById('contador-turnos');

   let turnos= 0;
    let aciertos = 0;
    let fallos = 0;

    let fakemons = []; 
    let esPokemonRealActual = true;

    let rachaReales = 0;
    let rachaFalsos = 0;

    const getRandomPokemonId = () => Math.floor(Math.random() * maxId) + 1;

  async function cargarFakemons() {
        try {
            const respuesta = await fetch('fakemons.json');
            fakemons = await respuesta.json();
        } catch (error) {
            console.error("Error al cargar Fakemons, iniciando solo con reales", error);
        }
    }

const iniciarSiguienteTurno = () => {
        if (rachaReales >= 3) {
            esPokemonRealActual = false; 
        } else if (rachaFalsos >= 3 || fakemons.length === 0) {
            esPokemonRealActual = true;  // Forzamos real
        } else {
           
            esPokemonRealActual = Math.random() < 0.5;
        }

        if (esPokemonRealActual) {
            rachaReales++;
            rachaFalsos = 0; 
            fetchPokemon();
        } else {
            rachaFalsos++;
            rachaReales = 0; 

            const indexAleatorio = Math.floor(Math.random() * fakemons.length);
            const fakemonElegido = fakemons[indexAleatorio];
            
            const pokemonAdaptado = {
                sprites: { front_default: fakemonElegido.sprite },
                types: fakemonElegido.tipo.split(' / ').map(t => ({ 
                    type: { name: t.trim() } 
                }))
            };
            
            renderPokemon(pokemonAdaptado);
        }
    };
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
                img.alt = 'Sprite no disponible';
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
                if (!response.ok) throw new Error('salio mal');
                return response.json();
            })
            .then(renderPokemon)
            .catch(error => {
                console.error('Error al cargar Pokémon', error);
                iniciarSiguienteTurno();
            });
    };

   

    const procesarTurno = (botonId) => {
  
        const acertoReal = (botonId === 'botonreal' && esPokemonRealActual);
        const acertoFalso = (botonId === 'botonfalso' && !esPokemonRealActual);

        if (acertoReal || acertoFalso) {
            aciertos++;
        } else {
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
            iniciarSiguienteTurno();
        }
    };

refreshButtons.forEach(boton => {
        boton.addEventListener('click', (e) => {
           
            procesarTurno(e.currentTarget.id);
        });
    });

    async function iniciarJuego() {
        await cargarFakemons();
        rachaReales = 1; 
        fetchPokemon();  
    }
    iniciarJuego();
});

