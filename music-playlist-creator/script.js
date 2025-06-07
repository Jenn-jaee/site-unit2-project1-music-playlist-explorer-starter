// Select main container for playlist cards
const section = document.querySelector('.playlist-cards');

// likes count
let likeCounts = playlists.map(() => Math.floor(Math.random() * 21));
const renderPlaylistCard = (playlist, index) => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img src="${playlist.image}" alt="${playlist.title}">
    <div class="card-content">
      <h3>${playlist.title}</h3>
      <h4>Created by ${playlist.creator}</h4>
      <section class="spread">
      <div class="like-container">
        <button class="like-btn" data-index="${index}">❤️</button>
        <span class="like-count">${likeCounts[index]}</span> 
      </div>
      <div class="edit"><i class="fa-regular fa-pen-to-square"></i></div>
      <button class="delete-btn">🗑️ Delete</button>
      </section>
    </div>
  `;

 card.querySelector('.like-btn').addEventListener('click', (e) => {
  e.stopPropagation(); // Don't open the modal
  const btn = e.target;
  const i = +btn.dataset.index;
  // Check if already liked (using class to track)
  const isLiked = btn.classList.contains('liked');
  if (isLiked) {
    likeCounts[i]--;
    btn.classList.remove('liked');
    btn.textContent = '❤️'; // outline heart (unliked)
  } else {
    likeCounts[i]++;
    btn.classList.add('liked');
    btn.textContent = '💖'; // filled heart (liked)
  }
  // Update the like count
  btn.nextElementSibling.textContent = likeCounts[i];
});

  // Delete Button
  card.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.stopPropagation(); // prevent modal from opening up
    card.remove(); // remove this card from the DOM
    playlists.splice(index, 1); // remove from data
    likeCounts.splice(index, 1); // keep like counts in sync
  });

  //  Modal trigger (if card area is clicked)
  card.addEventListener('click', () => {
    openModal(playlist);
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

// lets user add a Playlist (form logic)
const form = document.getElementById('playlist-form');
const songsContainer = document.getElementById('songs-container');
const addSongBtn = document.getElementById('add-song-btn');
let songInputs = [];

//click action to add songs to playlist

addSongBtn.addEventListener('click', () => {
  if (songsContainer.classList.contains('hidden')) {
    songsContainer.classList.remove('hidden');
  }

  const store = document.createElement('div');
  store.classList.add('song-input-group');
  store.innerHTML = `
    <input type="text" placeholder="Title" class="song-title" required />
    <input type="text" placeholder="Artist" class="song-artist" required />
    <input type="text" placeholder="Album" class="song-album" required />
    <input type="text" placeholder="Duration" class="song-duration" required />
    <hr />
  `;
  songsContainer.appendChild(store);
  songInputs.push(store);
});

// click action to submit

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

//search
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const renderAllPlaylists = (filteredPlaylists) => {
  section.innerHTML = '';
  filteredPlaylists.forEach((playlist, index) => renderPlaylistCard(playlist, index));
};

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase().trim();
  if (query === '') {
    renderAllPlaylists(playlists);
    return;
  }
  const filtered = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(query) ||
    playlist.creator.toLowerCase().includes(query)
  );
  renderAllPlaylists(filtered);
});

searchInput.addEventListener('keyup', () => {
  const query = searchInput.value.toLowerCase().trim();
  if (query === '') {
    renderAllPlaylists(playlists);
    return;
  }
  const filtered = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(query) ||
    playlist.creator.toLowerCase().includes(query)
  );
  renderAllPlaylists(filtered);
});

//sort
// === SORT FUNCTIONALITY ===
const sortDropdown = document.getElementById('sort-dropdown');

sortDropdown.addEventListener('change', () => {
  let sortedPlaylists = [...playlists]; // clone the array to avoid modifying original

  switch (sortDropdown.value) {
    case 'az':
      sortedPlaylists.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'za':
      sortedPlaylists.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'likes':
      sortedPlaylists.sort((a, b) => likeCounts[playlists.indexOf(b)] - likeCounts[playlists.indexOf(a)]);
      break;
    default:
      return; // Do nothing if no sort option selected
  }

  // Clear and re-render sorted playlists
  section.innerHTML = '';
  sortedPlaylists.forEach((playlist) => {
    const index = playlists.indexOf(playlist);
    renderPlaylistCard(playlist, index);
  });
});




