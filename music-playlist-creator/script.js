// Target the section for my cards
const section = document.querySelector('.playlist-cards');

let likeCounts = new Array(playlists.length).fill(0); // default to 5 likes


// To Create and insert all cards & like functionality
playlists.forEach((playlist, index) => {
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

   card.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
      e.stopPropagation(); // Prevent modal from opening
      const i = +e.target.dataset.index;
      likeCounts[i]++;
      e.target.nextElementSibling.textContent = likeCounts[i];
    } else {
      openModal(playlist);
    }
  });

  section.appendChild(card);
});

// To Create the modal and inject into DOM
const modal = document.createElement('section');
modal.className = "modal";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="modal-details">
      <img id="modal-img" src="" alt="" style="width:150px; float:left; margin-right:20px;">
      <div>
        <h2 id="modal-title"></h2>
        <p id="modal-creator"></p>
      </div>
    </div>
  </div>
`;
document.body.appendChild(modal);

// Target the content of my cards

const modalImg = modal.querySelector("#modal-img");
const modalTitle = modal.querySelector("#modal-title");
const modalCreator = modal.querySelector("#modal-creator");
const closeBtn = modal.querySelector(".close");

// Open modal
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
          <div class = "group">
            <div id="picholder">
                <img id="featuredSongs" src="${song.image}"/>
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

  // Attach event listeners inside this function after injecting HTML
  const closeBtn = modal.querySelector(".close");
  const shuffleBtn = modal.querySelector("#shuffle-btn");

  closeBtn.onclick = () => modal.style.display = "none";

  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  shuffleBtn.onclick = () => {
    playlist.songs.sort(() => Math.random() - 0.5);
    openModal(playlist); // re-render
  };
}


