const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeSlider = document.getElementById('volume');
const menuBtn = document.getElementById('menu-btn');
const playlistMenu = document.getElementById('playlist-menu');
const videoMenu = document.getElementById('video-menu');
const closeMenu = document.getElementById('close-menu');

// Playlist avec liens directs
const playlist = [
    { title: "Musique 1", src: "https://image2url.com/r2/default/videos/1773437816996-cc370507-aed6-4b0b-88f7-c5a37e451d24.mp4" },
    { title: "Musique 2", src: "https://files.catbox.moe/zwwfjh.mp4" }
];

let current = 0;
let history = [];

// Charger vidéo
function loadVideo(index) {
    if (current !== index) history.push(current); // enregistrer précédente
    current = index;
    video.src = playlist[index].src;
    video.play();
    playBtn.textContent = "⏸️";
}

// Play / Pause
playBtn.addEventListener('click', () => {
    if(video.paused){
        video.play();
        playBtn.textContent = "⏸️";
    } else {
        video.pause();
        playBtn.textContent = "▶️";
    }
});

// Volume
volumeSlider.addEventListener('input', () => video.volume = volumeSlider.value);

// Bouton précédent (avec historique)
prevBtn.addEventListener('click', () => {
    if(history.length > 0){
        const last = history.pop();
        loadVideo(last);
    } else {
        // si pas d'historique, recommence la vidéo courante
        video.currentTime = 0;
    }
});

// Bouton suivant
nextBtn.addEventListener('click', () => {
    current = (current + 1) % playlist.length;
    loadVideo(current);
});

// Quand la vidéo se termine, passer automatiquement à la suivante
video.addEventListener('ended', () => nextBtn.click());

// Ouvrir/fermer menu
menuBtn.addEventListener('click', () => playlistMenu.style.display = 'block');
closeMenu.addEventListener('click', () => playlistMenu.style.display = 'none');

// Remplir le menu
playlist.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.title;
    li.addEventListener('click', () => {
        loadVideo(index);
        playlistMenu.style.display = 'none';
    });
    videoMenu.appendChild(li);
});

// Démarrage
loadVideo(0);
