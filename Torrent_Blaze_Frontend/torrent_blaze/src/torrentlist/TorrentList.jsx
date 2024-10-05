import React from 'react';
import './TorrentList.css';

const TorrentList = ({ torrents }) => {
  const approx_results = torrents[0].approxResults;
  console.log(approx_results);
  return (
    <div className="torrent-list-container">
      {torrents.slice(1).map((torrent) => (
        <div key={torrent.id} className="torrent-card">
          <div className="torrent-details">
            <h3 className="torrent-name overflow-name">{torrent.name}</h3>
            <p className="torrent-category">
              <strong>Category:</strong> {torrent.category}
            </p>
            <p className="torrent-size">
              <strong>Size:</strong> {torrent.size}
            </p>
            <p className="torrent-stats">
              <span className="seeders">Seeders: {torrent.seeders}</span> |{' '}
              <span className="leechers">Leechers: {torrent.leechers}</span>
            </p>
            <a href={torrent.magnet_link} className="magnet-link" target="_blank" rel="noopener noreferrer">
              Download via Magnet
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TorrentList;
