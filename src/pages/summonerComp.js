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

    const handleClearAll = () => {
        setPlayers([])
    }

    const handleDelete = (playerName) => {
        setPlayers((current) =>
            current.filter(
                (player) =>
                    player != playerName
            )
        )
    };

    return (
        <>
            <h1 className='summoner-comparison-title'>Account/Summoner Comparisons</h1>
            <input 
                className='search-bar' 
                type="text" 
                name="player-name" 
                placeholder='Enter Account/Summoner Name' 
                onChange={handleChange}
                value={searchInput} />

            <button onClick={handleSubmit}>Search</button>

            {players.length === 0 ? 
            (<></>) : (
                <div>
                    <button className='clear-all' onClick={() => handleClearAll()}>Clear All Summoners</button>
                    <div className='players-container'>
                        {players.map((player, index) => 
                            <div className='player-stats' key={index}>
                                <button className='delete-player' onClick={() => handleDelete(player)}>X</button>
                                <div>{player.searchInput}</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}