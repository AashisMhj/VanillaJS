const poke_container = document.getElementById('poke-container')
const after = document.getElementById('after');
const before = document.getElementById('before');


const pokemon_count = 50
const url_string = (window.location.href).toLocaleLowerCase();
let searchParams = new URL(url_string).searchParams;
let page = searchParams.get('p') || 1;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}
// llink setup
if(page > 1){
    before.setAttribute('href', `?p=${parseInt(page)-1}`);
    before.innerText = `${parseInt(page)-1}`;
}
after.setAttribute('href', `?p=${parseInt(page)+1}`);
after.innerText = `${parseInt(page)+1}`;


const main_types = Object.keys(colors)
console.log(page * pokemon_count - 49);
const fetchPokemons = async () => {
    for(let i = (page * pokemon_count - 49) ; i <= pokemon_count * page; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    // add 00 to the string before
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()
