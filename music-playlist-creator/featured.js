//featured starts here



const loadFeaturedPlaylist = () => {
  const randomIndex = Math.floor(Math.random() * playlists.length);
  const featured = playlists[randomIndex];

  // Get featured DOM elements
  const image = document.getElementById("featured-image");
  const title = document.getElementById("featured-title");
  const creator = document.getElementById("featured-creator");
  const songList = document.getElementById("featured-songs");

  // Inject playlist details
  if (image && title && creator && songList) {
    image.src = featured.image;
    title.textContent = featured.title;
    creator.textContent = `Created by ${featured.creator}`;

    featured.songs.forEach(song => {
      const li = document.createElement("li");
      li.className = "song-item";
      li.innerHTML = `
      <div>
      <div id="picholder">
           <img src="${song.image}"/>
      </div>
        <div>
          <strong>${song.title}</strong>
          <small>${song.artist} — ${song.album}</small>
        </div>
      </div>
        <span>${song.duration}</span>
      `;
      songList.appendChild(li);
      console.log(songList);

    });
  }
}

if (window.location.pathname.includes("featured.html")) {
  // Run featured logic
  loadFeaturedPlaylist();
}

//make featured responsive
// const featuredBtn = document.getElementById("featured-playlist");
// featuredBtn.addEventListener('click', loadFeaturedPlaylist);




