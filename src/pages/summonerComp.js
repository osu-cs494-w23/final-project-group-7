import React, { useState, useEffect } from 'react'
import './summonerComp.css';

export default function SummonerComp() {
    const [searchInput, setSearchInput] = useState("");
    const [players, setPlayers] = useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newList = players.concat({searchInput});
        setPlayers(newList);
        setSearchInput("");
    };

    return (
        <>
            <h1>Account/Summoner Comparisons</h1>
            <input 
                className='search-bar' 
                type="text" 
                name="player-name" 
                placeholder='Enter Account/Summoner Name' 
                onChange={handleChange}
                value={searchInput} />

            <button onClick={handleSubmit}>Search</button>

            <div className='players-container'>
                {players.map((player, index) => 
                    <div className='player-stats' key={index}>{player.searchInput}</div>
                )}
            </div>
        </>
    )
}