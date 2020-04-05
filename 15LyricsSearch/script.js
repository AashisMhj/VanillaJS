const URL = 'https://api.lyrics.ovh';
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

//function to search by term
async function searchSongs(term){
    // fetch(`${URL}/suggest/${term}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data));
    const res = await fetch(`${URL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}
//function to show result of fetch in dom
function showData(data){
    // let output = '';
    // data.data.forEach(song =>{
    //     output += `
    //         <li>
    //             <span><strong>${song.artist.name}</strong></span>
    //             <button class="btn" data-artist="${song.artistname}"
    //             data-songtitle="${song.title}">Get Lyrics </button>
    //         </li>
    //     `;
    // })
    // result.innerHTML = `
    //     <ul class="song">
    //         ${output}
    //     </ul>`;
     result.innerHTML = `
        <ul class="songs">
        ${data.data.map(song => `
                <li>
                    <span><strong>${song.artist.name}</strong>--${song.title}</span>
                    <button class="btn" data-artist="${song.artist.name}"
                    data-songtitle="${song.title}">Get Lyrics </button>
                </li>
            `).join('')
        }
        </ul>
     `;

     if(data.prev || data.next){
         more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`:''}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
         `;
     }
}
//function to go to prvious or nxt
async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}
//function to get lyrics
async function getLyrics(artist,songTitle){
    const res = await fetch(`${URL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');
    result.innerHTML = `<h2><strong>${artist}</strong> -${songTitle}</h2><span>${lyrics}</span>`;
    more.innerHTML = '';
}

//event listeners
form.addEventListener('submit', event =>{
    event.preventDefault();

    const searchTerm = search.value.trim();
    if(!searchTerm){
        alert('enter search term');
    }else{
        searchSongs(searchTerm);
    }
})
result.addEventListener('click', event =>{
    const clickedEl = event.target;
    if(clickedEl.tagName === 'BUTTON'){
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artist,songTitle);
    }
})