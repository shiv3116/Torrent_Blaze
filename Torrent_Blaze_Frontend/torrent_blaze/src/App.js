import React, { useState } from 'react';
import './App.css';
import TorrentBlaze from './TorrentBlaze.png';
import TorrentList from './torrentlist/TorrentList';
import Loader from './spinner/Loader';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState({
    all: true,
    games: false,
    videos: false,
    audio: false,
    apps: false,
    other: false,
  });

  const [torrentData, setTorrentData] = useState(null);
  const [loading, setLoading] = useState(false);

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
        audio: false,
        apps: false,
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
    if(searchQuery!=='') {
      setLoading(true);
      let finalSearchQuery = searchQuery;
      Object.entries(categories).forEach(([key, value]) => {
        if (value && key !== 'all') {
          finalSearchQuery += `&${key}=on`;
        }
      });
      fetch(`http://127.0.0.1:8000/torrent_blaze/data/${finalSearchQuery}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTorrentData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error: ", err);
        alert("Error fetching data: " + err.message);
        setLoading(false);
      });
    }
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
              name="audio"
              checked={categories.audio}
              onChange={handleCheckboxChange}
            />{' '}
            Music
          </label>
          <label>
            <input
              type="checkbox"
              name="apps"
              checked={categories.apps}
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

      {/* Conditionally render the Loader or TorrentList based on `loading` state */}
      {loading ? (
        <Loader /> // Show the loader when data is being fetched
      ) : (
        torrentData && <TorrentList torrents={torrentData} />
      )}

      <footer className="footer">
        <p>&copy; 2024 Torrent Blaze. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
