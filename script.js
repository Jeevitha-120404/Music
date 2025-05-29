// Songs array with titles, artists and source files
const songs = [
  {
    title: "Thathi Thathi",
    artist: "Yuvan Shankar Raja",
    src: "songs/song1.mp3",
    albumArt: "images/album1.jpg"
  },
  {
    title: "Mun Andhi",
    artist: "Harris Jayaraj",
    src: "songs/song2.mp3",
    albumArt: "images/album2.jpg"
  },
  {
    title: "Kadhal Konden BGM",
    artist: "Yuvan Shankar Raja",
    src: "songs/song3.mp3",
    albumArt: "images/album3.jpg"
  },
];

// DOM Elements
const audio = document.getElementById("audio");
const titleText = document.getElementById("title-text");
const artist = document.getElementById("artist");
const albumArt = document.getElementById("album-art");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let currentSongIndex = 0;
let isPlaying = false;

// Load a song into the player
function loadSong(song) {
  titleText.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  albumArt.src = song.albumArt || "images/album-placeholder.jpg";
}

// Play the loaded song
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = "&#10074;&#10074;"; // Pause icon
}

// Pause the song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = "&#9654;"; // Play icon
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Play next song in array
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

// Play previous song in array
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

// Update progress bar and time display
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    // Update time display
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

// Seek audio when progress bar is changed
progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

// Format seconds into MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Load initial song
loadSong(songs[currentSongIndex]);
