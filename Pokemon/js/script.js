const containerDiv =document.getElementById('container');
function createPokeImage(pokeID){
    let pokeImage = document.createElement('img')
    pokeImage.srcset =    `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
    containerDiv.append(pokeImage);
}

for(let i =1; i <= 30; i++){
    createPokeImage(i);
}

const URL = "https://pokeapi.co/api/v2/pokemon/44/";