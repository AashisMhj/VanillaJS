const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
//song titles
const songs = ['hey','summer','ukulele'];

let songIndex = 1;

//load song details
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpg`
}

//function to play song
function playSong(){
    musicContainer.classList.add('play');
    //change the play button to pause
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
//function to pause song
function pauseSong(){
    musicContainer.classList.remove('play');
    //change the play button to pause
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}
//function to play previous song
function prevSong(){
    songIndex = --songIndex %songs.length;
    loadSong(songs[songIndex]);
    playSong;
}
//function to play the next song
function nextSong(){ 
    songIndex = ++songIndex %songs.length;
    loadSong(songs[songIndex]);
    playSong;
}
//function to update progress
function updateProgress(event){
    const {duration,currentTime}= event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    console.log(progressPercent);
    progress.style.width = `${progressPercent}`;
    console.log(progress);
}
//functin to set progress
function setProgress(event){
    const width = this.clentWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = clickX /width * duration;
}
loadSong(songs[songIndex])

//event listners
playBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
})
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
audio.addEventListener('timeupdate',updateProgress);
progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong);
