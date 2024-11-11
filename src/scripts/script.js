const songsDisplay = document.getElementById("songDisplay");
const genreSelector = document.getElementById("genreSelector");
const selectedGenre = genreSelector.value;
const genreTitle = document.getElementById("genreTitle");
const albumart = document.getElementById("albumArt");
const songName = document.getElementById("songName");
const artistName = document.getElementById("artistName");
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const addToPlaylisbtn = document.getElementById("addToPlaylisbtn");
const playPreviousSongbtn = document.getElementById("playPreviousSongbtn");
const playNextSongbtn = document.getElementById("playNextSongbtn");
const createPlaylistbtn = document.getElementById("createPlaylistbtn");
const createPlaylistInput = document.getElementById("createPlaylistInput");
const playlistsContainer = document.getElementById("playlistsContainer");
const playlistNameDisplay = document.getElementById("playlistNameDisplay");
const currentPlaylistDisplay = document.getElementById(
  "currentPlaylistDisplay"
);
const checkbox = document.getElementById("switch");
const htmlElement = document.documentElement;
const songSearchDisplay = document.getElementById("songSearchDisplay");
const songSearchInput = document.getElementById("songSearchInput");
const songSearchbtn = document.getElementById("songSearchbtn");

const playlistSearchDisplay = document.getElementById("playlistSearchDisplay");
const playlistSearchInput = document.getElementById("playlistSearchInput");
const playlistSearchbtn = document.getElementById("playlistSearchbtn");

const removebtn = document.getElementById("removebtn");

//Song data
const songList = [
  {
    id: 1,
    name: "The Real Slim Shady",
    artist: "Eminem",
    img: "../assets/albumArt/EmRealSlim.webp",
    genre: "Pop",
    source: "../assets/Songs/The-Real-Slim-Shady.mp3",
  },
  {
    id: 2,
    name: "Superman",
    artist: "Eminem",
    img: "../assets/albumArt/EmSuperman.jpeg",
    genre: "Pop",
    source: "../assets/Songs/EmSuperman.mp3",
  },
  {
    id: 3,
    name: "Kamikaze",
    artist: "Eminem",
    img: "../assets/albumArt/EmKamikaze.jpg",
    genre: "Pop",
    source: "../assets/Songs/emvenomkamikaze.mp3",
  },
  {
    id: 4,
    name: "Arjan Vailey",
    artist: "Bhupinder Babbal",
    img: "../assets/albumArt/lr1.jpeg",
    genre: "Bollywood",
    source: "../assets/Songs/arjanvalley.mp3",
  },
  {
    id: 5,
    name: "Jamal Kudu",
    artist: "Harshwardhan Rameshewar",
    img: "../assets/albumArt/lr3.jpeg",
    genre: "Bollywood",
    source: "../assets/Songs/JamalJamal.mp3",
  },
  {
    id: 6,
    name: "Dzanum",
    artist: "Tera Doya",
    img: "../assets/albumArt/moye.jpeg",
    genre: "Indi",
    source: "../assets/Songs/Moye.mp3",
  },
];

const playlists = [
  {
    name: "MyPlaylist",
    songs: [1, 5, 6],
  },
  {
    name: "Running",
    songs: [1, 3, 2],
  },
];

let currentSong;
let currentPlaylist = [];

//Genre selection logic

function showSongs(genre) {
  //Clear previous content
  songsDisplay.innerHTML = "";

  //Loop through each song in array
  songList.forEach((song) => {
    if (song.genre === genre || genre === "All") {
      const songElement = document.createElement("button");
      songElement.textContent = song.name;
      //Adding the event Listener to play the song
      songElement.addEventListener("click", function () {
        playSong(song.id);
      });
      //Append the paragraph element to the songsDisplay div
      songsDisplay.appendChild(songElement);
    }
  });
}

genreSelector.addEventListener("change", function () {
  //Call the showSongs function with the selected genre value
  showSongs(this.value); // this  refers to genreselector
  genreTitle.innerHTML = this.value;
});

//Function logic to render and play song passed via song index

function playSong(songIndex) {
  if (songIndex === undefined) {
    //Silent return
    return;
  }
  songToBePlayed = songList[songIndex - 1];
  //Change album art
  albumart.src = songToBePlayed.img;
  //Change text content of song details
  songName.innerHTML = songToBePlayed.name;
  artistName.innerHTML = songToBePlayed.artist;
  //Play song
  audioSource.src = songToBePlayed.source;
  audioPlayer.load(); //Load new source
  audioPlayer.play(); //Play song
  currentSong = songToBePlayed; //Current song selected
}

//Function to add song to current playlist

addToPlaylisbtn.addEventListener("click", addSongToCurrentPlaylist);

function addSongToCurrentPlaylist() {
  if (currentPlaylist === undefined) {
    alert("No Current Playlist");
    return;
  }
  if (currentSong === undefined) {
    alert("No Current Song Selected");
    return;
  }

  if (currentPlaylist.find((id) => id === currentSong.id)) {
    //Song already exists in the playlist, return
    return;
  }
  currentPlaylist.push(currentSong.id);
  rendercurrentplaylist();
}

//Function for the next song button

playNextSongbtn.addEventListener("click", playNextSong);

//Helper function to find index
function findIndex(songid, playlist) {
  for (let i in playlist) {
    if (playlist[i] === songid) {
      return i;
    }
  }
  return null;
}

function playNextSong() {
  //Search current song index and play next song index
  if (currentPlaylist.length === 0) {
    alert("Nothing in current Playlist!");
    return;
  }
  //search id of current song in currentPlaylist
  let index = findIndex(currentSong.id, currentPlaylist);
  if (index === null) {
    alert("Current song is not in the current playlist!");
    return;
  }
  if (index === currentPlaylist.length - 1) {
    index = 0; //Loop back to first song in list, since current song is last song in list
  } else {
    index++; //Update to next song
  }
  playSong(currentPlaylist[index]);
}

//Function for previous song button

playPreviousSongbtn.addEventListener("click", playPreviousSong);

function playPreviousSong() {
  //Search current song index and play previous song index
  if (currentPlaylist.length === 0) {
    alert("Nothing in current Playlist");
    return;
  }
  //search id of current song in currentPlaylist
  let index = findIndex(currentSong.id, currentPlaylist);
  if (index === null) {
    alert("current song is not in the current playlist");
    return;
  }
  if (index === 0) {
    index = currentPlaylist.length - 1; //Loop back to last song in list, since current song is first song in list
  } else {
    index--; //Update to previous song
  }
  playSong(currentPlaylist[index]);
}

//Remove song from current playlist

removebtn.addEventListener("click", removeFromPlaylist);
function removeFromPlaylist() {
  const indexToRemove = findIndex(currentSong.id, currentPlaylist);
  if (indexToRemove === null) {
    alert("current song is not in the current playlist");
    return;
  } else {
    playNextSong();
    currentPlaylist.splice(indexToRemove, 1);
    rendercurrentplaylist();
  }
}

//Function to create playlist

createPlaylistbtn.addEventListener("click", function () {
  createPlaylist(createPlaylistInput.value);
  createPlaylistInput.value = " "; // reset name
});

function createPlaylist(playlistName) {
  const playlist = [];
  playlists.push({ name: playlistName, songs: playlist });
  renderPlaylists();
}

//Function to render all playlist

function renderPlaylists() {
  playlistsContainer.innerHTML = "";
  playlists.forEach((playlist) => {
    const playlistElement = document.createElement("button");
    playlistElement.textContent = playlist.name;
    //Adding the event Listener to play the song
    playlistElement.addEventListener("click", function () {
      playSong(playlist.songs[0]);
      currentPlaylist = playlist.songs;
      playlistNameDisplay.innerHTML = playlist.name;
      rendercurrentplaylist();
    });
    playlistsContainer.appendChild(playlistElement);
  });
}

//Function to render current playlist

function rendercurrentplaylist() {
  //Clear previous content
  currentPlaylistDisplay.innerHTML = "";

  //Loop through each song in array
  currentPlaylist.forEach((songId) => {
    const cPlaylistSongElement = document.createElement("button");
    cPlaylistSongElement.textContent = songList[songId - 1].name;
    //Adding the event Listener to play the song
    cPlaylistSongElement.addEventListener("click", function () {
      playSong(songId);
    });
    //Append the paragraph element to the songsDisplay div
    currentPlaylistDisplay.appendChild(cPlaylistSongElement);
  });
}

//Theme toggle functionality

checkbox.addEventListener("change", function () {
  if (this.checked) {
    // If checkbox is checked, set data-theme to 'light'
    htmlElement.setAttribute("data-theme", "light");
  } else {
    // If checkbox is unchecked, set data-theme to 'dark'
    htmlElement.setAttribute("data-theme", "dark");
  }
});

//Function to search song

songSearchbtn.addEventListener("click", querySong);
function querySong() {
  songSearchDisplay.innerHTML = "";

  let searchQuery = songSearchInput.value.toLowerCase().trim(); //Convert to lowercase for case-insensitive search

  const results = songList.filter((song) => {
    return song.name.toLowerCase().includes(searchQuery);
  });

  if (results.length === 0 || searchQuery === "") {
    songSearchDisplay.innerHTML = "No Result Found";
  } else {
    songSearchDisplay.innerHTML = "Results";
    results.forEach((result) => {
      const songElement = document.createElement("button");
      songElement.textContent = result.name;

      songElement.addEventListener("click", function () {
        playSong(result.id);
      });

      songSearchDisplay.appendChild(songElement);
    });
  }
}

//Function to search for a playlist by name

playlistSearchbtn.addEventListener("click", queryplaylist);
function queryplaylist() {
  playlistSearchDisplay.innerHTML = "";

  let searchQuery = playlistSearchInput.value.toLowerCase().trim(); //Convert to lowercase for case-insensitive search

  const results = playlists.filter((playlist) => {
    return playlist.name.toLowerCase().includes(searchQuery);
  });

  if (results.length === 0 || searchQuery === "") {
    playlistSearchDisplay.innerHTML = "No Result Found";
  } else {
    playlistSearchDisplay.innerHTML = "Results";
    results.forEach((result) => {
      const playlistElement = document.createElement("button");
      playlistElement.textContent = result.name;

      playlistElement.addEventListener("click", function () {
        playSong(results.songs[0]);
        currentPlaylist = results.songs;
        rendercurrentplaylist();
      });

      playlistSearchDisplay.appendChild(playlistElement);
    });
  }
}

//Function calls for first time rendering

//Function to render all songs in genre area
showSongs("All");

//Function to render all playlists buttons
renderPlaylists();
