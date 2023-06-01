let songIndex = 0;
let audioElement = new Audio('song/1.mp3')
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentPlay = document.getElementById("currentPlay")
let playing =false;

let songs = [
    { songName: "Lip to Lip", filePath: 'song/1.mp3', coverPath: 'cover.jpg' },
    { songName: "Piyo O Re Piya", filePath: 'song/2.mp3', coverPath: 'cover.jpg' },
    { songName: "Samsung Theme", filePath: 'song/3.mp3', coverPath: 'cover.jpg' },
    { songName: "The Humma Song", filePath: 'song/4.mp3', coverPath: 'cover.jpg' },
    { songName: "Titanic Theme", filePath: 'song/5.mp3', coverPath: 'cover.jpg' },
    { songName: "Zara Sa", filePath: 'song/6.mp3', coverPath: 'cover.jpg' },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('fs-6')[0].innerHTML;
})

// Playing The Song

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
        playing = true;
       

    }
    else {
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle')
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
        playing =false;
       
    }
})

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration * 100))
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playIcon')).forEach((element) => {
        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')

    })
}

Array.from(document.getElementsByClassName('playIcon')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (playing==false) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            gif.style.opacity = 1;
            currentPlay.innerText = songs[songIndex - 1].songName;
            e.target.classList.remove('fa-play-circle')
            e.target.classList.add('fa-pause-circle')
            audioElement.src = `song/${songIndex}.mp3`;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            playing = true;

        }
        else {
            audioElement.pause();
            e.target.classList.add('fa-play-circle')
            e.target.classList.remove('fa-pause-circle')
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            gif.style.opacity = 0;
            playing =false;


        }
    })

})

document.getElementById('prev').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 1;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    currentPlay.innerText = songs[songIndex - 1].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('forw').addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 1;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    currentPlay.innerText = songs[songIndex - 1].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})