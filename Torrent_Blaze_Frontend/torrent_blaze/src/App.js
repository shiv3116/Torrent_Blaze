import React, { useState } from 'react';
import './App.css';
import TorrentBlaze from './TorrentBlaze.png';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState({
    all: true,
    games: false,
    videos: false,
    music: false,
    software: false,
    other: false,
  });

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === 'all') {
      // If "All" is checked, uncheck other categories
      setCategories({
        all: checked,
        games: false,
        videos: false,
        music: false,
        software: false,
        other: false,
      });
    } else {
      // Uncheck "All" and update the specific category
      setCategories((prevCategories) => ({
        ...prevCategories,
        all: false,
        [name]: checked,
      }));
    }
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}\nCategories: ${JSON.stringify(categories, null, 2)}`);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Torrent Blaze</h1>
      </header>
      <div className="container">
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for torrents..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="category-box">
          <label>
            <input
              type="checkbox"
              name="all"
              checked={categories.all}
              onChange={handleCheckboxChange}
            />{' '}
            All
          </label>
          <label>
            <input
              type="checkbox"
              name="games"
              checked={categories.games}
              onChange={handleCheckboxChange}
            />{' '}
            Games
          </label>
          <label>
            <input
              type="checkbox"
              name="videos"
              checked={categories.videos}
              onChange={handleCheckboxChange}
            />{' '}
            Videos
          </label>
          <label>
            <input
              type="checkbox"
              name="music"
              checked={categories.music}
              onChange={handleCheckboxChange}
            />{' '}
            Music
          </label>
          <label>
            <input
              type="checkbox"
              name="software"
              checked={categories.software}
              onChange={handleCheckboxChange}
            />{' '}
            Software
          </label>
          <label>
            <input
              type="checkbox"
              name="other"
              checked={categories.other}
              onChange={handleCheckboxChange}
            />{' '}
            Other
          </label>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Torrent Blaze. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
