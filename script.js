const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeSlider = document.getElementById('volume');
const menuBtn = document.getElementById('menu-btn');
const playlistMenu = document.getElementById('playlist-menu');
const videoMenu = document.getElementById('video-menu');
const closeMenu = document.getElementById('close-menu');

// Playlist avec liens directs (vidéo + son)
const playlist = [
    { title: "Musique Lapin", src: "https://files.catbox.moe/zwwfjh.mp4" },
    { title: "Musique Ours", src: "https://files.catbox.moe/abcd123.mp4" } // remplacer par le vrai lien
];

let current = 0;
let history = [];

// Charger vidéo + son
function loadVideo(index) {
    if(current !== index) history.push(current);
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

// Bouton précédent
prevBtn.addEventListener('click', () => {
    if(history.length > 0){
        const last = history.pop();
        loadVideo(last);
    } else {
        video.currentTime = 0;
    }
});

// Bouton suivant
nextBtn.addEventListener('click', () => {
    current = (current + 1) % playlist.length;
    loadVideo(current);
});

// Auto next quand la vidéo se termine
video.addEventListener('ended', () => nextBtn.click());

// Menu Playlist
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
