// Select main container for playlist cards
const section = document.querySelector('.playlist-cards');

// Dummy likes count
let likeCounts = new Array(playlists.length).fill(0);

// Render card function
const renderPlaylistCard = (playlist, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${playlist.image}" alt="${playlist.title}">
    <div class="card-content">
      <h3>${playlist.title}</h3>
      <h4>Created by ${playlist.creator}</h4>
      <div class="like-container">
        <button class="like-btn" data-index="${index}">❤️</button>
        <span class="like-count">${likeCounts[index]}</span>
      </div>
    </div>
  `;

  // Like or modal click handler
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
      e.stopPropagation();
      const i = +e.target.dataset.index;
      likeCounts[i]++;
      e.target.nextElementSibling.textContent = likeCounts[i];
    } else {
      openModal(playlist);
    }
  });

  section.appendChild(card);
};

// Render all playlists at start
playlists.forEach((playlist, index) => {
  renderPlaylistCard(playlist, index);
});

// Modal setup
const modal = document.createElement('section');
modal.className = "modal";
modal.style.display = "none"; // default hidden
document.body.appendChild(modal);

// Modal open function
const openModal = (playlist) => {
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="modal-header">
        <img id="modal-img" src="${playlist.image}" alt="Playlist Cover" />
        <div>
          <h2 id="modal-title">${playlist.title}</h2>
          <p id="modal-creator">Created by ${playlist.creator}</p>
          <button id="shuffle-btn">Shuffle</button>
        </div>
      </div>
      <ul class="song-list">
        ${playlist.songs.map(song => `
          <li class="song-item">
            <div class="group">
              <div id="picholder">
                <img id="featuredSongs" src="${song.image}" />
              </div>
              <div id="playlist-title">
                <strong>${song.title}</strong><br />
                <small>${song.artist} — ${song.album}</small>
              </div>
            </div>
            <span class="time">${song.duration}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  // Show modal
  modal.style.display = "flex";

  // Close logic
  modal.querySelector('.close').onclick = () => modal.style.display = "none";
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  // Shuffle logic
  modal.querySelector('#shuffle-btn').onclick = () => {
    playlist.songs.sort(() => Math.random() - 0.5);
    openModal(playlist);
  };
};

// Playlist form logic
const form = document.getElementById('playlist-form');
const songsContainer = document.getElementById('songs-container');
const addSongBtn = document.getElementById('add-song-btn');
let songInputs = [];

addSongBtn.addEventListener('click', () => {
  if (songsContainer.classList.contains('hidden')) {
    songsContainer.classList.remove('hidden');
  }

  const div = document.createElement('div');
  div.classList.add('song-input-group');
  div.innerHTML = `
    <input type="text" placeholder="Title" class="song-title" required />
    <input type="text" placeholder="Artist" class="song-artist" required />
    <input type="text" placeholder="Album" class="song-album" required />
    <input type="text" placeholder="Duration" class="song-duration" required />
    <hr />
  `;
  songsContainer.appendChild(div);
  songInputs.push(div);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('playlist-title').value;
  const creator = document.getElementById('playlist-creator').value;
  const image = document.getElementById('playlist-image').value;

  const newSongs = songInputs.map(group => ({
    title: group.querySelector('.song-title').value,
    artist: group.querySelector('.song-artist').value,
    album: group.querySelector('.song-album').value,
    duration: group.querySelector('.song-duration').value,
    image: "https://via.placeholder.com/50" // Default image for new songs
  }));

  const newPlaylist = {
    title,
    creator,
    image,
    songs: newSongs,
  };

  playlists.push(newPlaylist);
  likeCounts.push(0);
  renderPlaylistCard(newPlaylist, playlists.length - 1);

  form.reset();
  songsContainer.innerHTML = '';
  songInputs = [];
});
