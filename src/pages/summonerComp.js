import {React, useState} from 'react'
import './summonerComp.css';

export default function SummonerComp() {
    const [searchInput, setSearchInput] = useState("");
    const [players, setPlayers] = useState([]);
    const [selectedSearch, setSelectSearch] = useState("");
    const [gameName, setGameName] = useState("");
    const [tagLine, setTagLine] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleNameChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleGameNameChange = (e) => {
        e.preventDefault();
        setGameName(e.target.value);
    }

    const handleTagLineChange = (e) => {
        e.preventDefault();
        setTagLine(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (searchInput !== '') {
            const newList = players.concat({searchInput});
            setPlayers(newList);
            setSearchInput("");
        } else if (gameName !== '' && tagLine !== '') {
            const val = gameName + '/' + tagLine
            const newList = players.concat({val});
            setPlayers(newList);
            setGameName("");
            setTagLine("");
        } else if (gameName === '' || tagLine === '') {
            setErrorMessage("All fields need to be filled in");
        }
    };

    const handleClearAll = () => {
        setPlayers([])
    }

    const handleDelete = (playerName) => {
        setPlayers((current) =>
            current.filter(
                (player) =>
                    player !== playerName
            )
        )
    };

    const handleSelect = (e) => {
        setSelectSearch(e.target.value)
    }

    const handleDeck = (search, game_tag) => {
        if (search !== undefined) {
            return (<div>{search}</div>)
        } else if (game_tag !== undefined) {
            return (<div>{game_tag}</div>)
        }
    }

    return (
        <>
            <h1 className='summoner-comparison-title'>Account/Summoner Comparisons</h1>
            
            <select value={selectedSearch} onChange={handleSelect}>
                <option value="name">Search by name</option>
                <option value="game_tag">Search by game name and tag line</option>
            </select>

            {selectedSearch === "game_tag" ? (
                <>
                    <input type="text" name="gameName" placeholder='Game Name' onChange={handleGameNameChange} value={gameName} />
                    <input type="text" name="tagLine" placeholder='Tag Line' onChange={handleTagLineChange} value={tagLine} />
                </>
                ) : (
                <input type="text" name="player-name" placeholder='Enter Account/Summoner Name' onChange={handleNameChange} value={searchInput} />
            )}

            <button onClick={handleSubmit}>Search</button>
            <div className='error-message'>{errorMessage}</div>

            {players.length === 0 ? 
                (<></>) : (
                    <div>
                        <button className='clear-all' onClick={() => handleClearAll()}>Clear All Summoners</button>
                        <div className='players-container'>
                            {players.map((player, index) => 
                                <div className='player-stats' key={index}>
                                    <button className='delete-player' onClick={() => handleDelete(player)}>X</button>
                                    {handleDeck(player.searchInput, player.val)}
                                </div>
                            )}
                        </div>
                    </div>
            )}
        </>
    )
}