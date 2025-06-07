## Unit Assignment: Music Playlist Explorer

Submitted by: **Jennifer Obinwanne**

Estimated time spent: **25+** hours spent in total

Deployed Application (**required**): [Music Playlist Explorer Deployed Site][https://site-unit2-project1-music-playlist-yrei.onrender.com]

---

### Application Overview

The **Music Playlist Explorer** is an interactive web app that allows users to explore playlists, view detailed song info, like or unlike playlists, and even build their own playlists from scratch. It’s designed with a clean, dynamic layout powered by JavaScript, featuring responsive modals, a featured page, and optional stretch functionality like adding playlists.

---

### Application Features

#### CORE FEATURES

- [x] **Display Playlists**

  - [x] Dynamically render playlists on the homepage using JavaScript.
    - [x] Playlists are displayed in a responsive grid layout.
    - [x] Playlist images are sized to fit at least 6 visible cards per row on wider screens.
  - [x] Fetch data from a provided JavaScript file and render each playlist as a card.

- [x] **Playlist Components**

  - [x] Each tile displays:
    - [x] Playlist cover image
    - [x] Playlist name
    - [x] Playlist creator
    - [x] Like count with ❤️ button

- [x] **Playlist Details**

  - [x] Clicking a playlist opens a modal popup with:
    - [x] Cover image
    - [x] Playlist name
    - [x] Creator name
    - [x] Full list of songs with:
      - [x] Title
      - [x] Artist
      - [x] Duration
  - [x] The modal:
    - [x] Is centered and does **not** occupy the entire screen
    - [x] Has a soft drop-shadow
    - [x] Uses a semi-dark backdrop to highlight the popup

- [x] **Like Playlists**

  - [x] Users can like/unlike playlists by clicking the heart icon.
    - [x] Clicking ❤️ toggles the count and updates the visual state.
    - [x] Like state reflects both zero and non-zero transitions.
    - [x] Proper event delegation prevents modal from opening if the heart is clicked.

- [x] **Shuffle Songs**

  - [x] A “Shuffle” button in the modal reorders the songs randomly.
    - [x] Shuffle logic re-renders the song list with a fresh order on each click.
    - [x] Repeated clicks show different song sequences.

- [x] **Featured Page**
  - [x] A separate `featured.html` page displays a **random playlist** on each refresh.
    - [x] Playlist image, title, and full song list are shown.
    - [x] Song details include title, artist, and duration.
  - [x] Navigation links allow toggling between:
    - [x] All playlists page
    - [x] Featured page
  - [x] On refresh, a new random playlist is selected.

---

#### STRETCH FEATURES

- [x] **Add New Playlists**

  - [x] A form allows users to add new playlists directly on the homepage.
  - [x] Users can enter:
    - [x] Playlist title
    - [x] Creator
    - [x] Image URL
    - [x] One or more songs with:
      - [x] Title
      - [x] Artist
      - [x] Album
      - [x] Duration
  - [x] Songs are added dynamically with a ➕ “Add Song” button.
  - [x] New playlist appears instantly on the homepage and supports modal + like functionality.
  - [x] The "Add Song" button is styled subtly with an icon and opens the fields only on click.

- [ ] **Edit Existing Playlists**

  - [ ] In Progress

- [x] **Delete Playlists**

- [x] **Search Functionality**

- [x] **Sorting Options**

---

### Sample Images

![image](https://github.com/user-attachments/assets/6f9019d1-0532-4c2d-9fbc-feb98fba2411)
![image](https://github.com/user-attachments/assets/ceedb995-9fa7-43e4-97b5-e0bdcc40f0c6)
![image](https://github.com/user-attachments/assets/490b1b80-5b18-4e7c-bda4-bb01c6c999fb)

### Walkthrough Video

`TODO://` Add the embedded URL code to your walkthrough video below.

`ADD_EMBEDDED_CODE_HERE`

Make sure to:

- Like and unlike both a 0-like and non-zero-like playlist
- Shuffle songs multiple times
- Add a playlist with 2+ songs
- Navigate between Featured and All pages
- Refresh Featured to show random playlists

---

### Reflection

**Did the topics discussed in your labs prepare you to complete the assignment?**
Yes! DOM manipulation, event listeners, and object arrays were crucial for this project. However, implementing modal interactions and dynamic event handling with added playlists pushed me to think more deeply about JavaScript's structure and state.

**If you had more time, what would you have done differently?**
I would’ve implemented editing and deleting playlists completely, and polished the modal's animations for a better user experience. I also wish I had explored using localStorage or backend simulation to persist user-added playlists.

**Reflect on your project demo.**
I’m proud of how functional and clean the experience feels. I struggled at times with positioning and dynamic rendering, but iterating and debugging helped me level up fast. Seeing everything come together was very fulfilling!

---

### Open-source libraries used

None — all code written from scratch with HTML, CSS, and JavaScript.

---

### Shout out

Big shout out to:

- My mentor(s) and cohort peers for debugging help
- My future self for not giving up when the modal broke everything the night before 🎯
