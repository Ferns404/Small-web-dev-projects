const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const volumeSlider = document.getElementById('volumeSlider');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const albumImage = document.getElementById('albumImage');
const songList = document.getElementById('songList');
const searchInput = document.getElementById('searchInput');

let isPlaying = false;
let currentSongIndex = 0;
let audio = new Audio();
let songs = [];

// Fetch songs using iTunes API
async function fetchSongs(query) {
    const apiUrl = `https://itunes.apple.com/search?term=${query}&media=music&limit=10`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results.map(song => ({
            title: song.trackName,
            artist: song.artistName,
            albumArt: song.artworkUrl100,
            preview: song.previewUrl // song preview link
        }));
    } catch (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
}

// Load song details
function loadSong(song) {
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist;
    albumImage.src = song.albumArt || 'default.jpg';
    audio.src = song.preview;
}

// Play or Pause the song
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerText = '▶️';
    } else {
        audio.play();
        playPauseBtn.innerText = '⏸️';
    }
    isPlaying = !isPlaying;
}

// Update progress bar and time
audio.addEventListener('timeupdate', function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTimeDisplay.innerText = formatTime(audio.currentTime);
    totalTimeDisplay.innerText = formatTime(audio.duration);
});

// Volume control
volumeSlider.addEventListener('input', function () {
    audio.volume = volumeSlider.value;
});

// Format time in minutes:seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Search for songs and display suggestions
searchInput.addEventListener('input', async function () {
    const query = searchInput.value.toLowerCase();
    if (query.length > 2) {
        songs = await fetchSongs(query);
        displaySongList(songs);
    } else {
        songList.innerHTML = '';
    }
});

function displaySongList(songs) {
    songList.innerHTML = '';
    songs.forEach(song => {
        const li = document.createElement('li');
        li.innerText = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            loadSong(song);
            audio.play();
            isPlaying = true;
            playPauseBtn.innerText = '⏸️';
        });
        songList.appendChild(li);
    });
}

// Initial load with empty song list
loadSong({
    title: "No song selected",
    artist: "Unknown",
    albumArt: "default.jpg",
    preview: ""
});

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
});
