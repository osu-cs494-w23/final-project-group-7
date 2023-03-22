import {React, useState, useEffect} from 'react'
import './summonerComp.css';
import APIKEYDATA from '../apikey'
import GetSummonerID from '../hooks/Services'
import { GetMatchHistory, GetMatchDetails } from '../hooks/Services'
const APIKEY = APIKEYDATA.key

function SummonerCard(){
    const [selectedSearch, setSelectSearch] = useState("name");
    const [searchInput, setSearchInput] = useState("");
    const [value, setValue] = useState("");
    const [gameValue, setGameValue] = useState("");
    const [tagValue, setTagValue] = useState("");
    const [players, setPlayers] = useState([]);
    const [summoner, loading, error] = GetSummonerID(searchInput);
    const [matchList] = GetMatchHistory(summoner);

    const handleSelect = (e) => {
        setSelectSearch(e.target.value);
        setValue("");
        setGameValue("");
        setGameValue("");
    }

    return (
        <div>
            <select value={selectedSearch} onChange={handleSelect}>
                <option value="name">Search by name</option>
                <option value="game_tag">Search by game name and tag line</option>
            </select>

            {selectedSearch === "name" ? (
                <>
                    <form onSubmit = {e => {
                        e.preventDefault()
                        setSearchInput(value)
                        setValue("")
                    }}>
                        <input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter Summoner Name"/>
                        <button type="submit">Search</button>
                    </form>
                </>
                ) : (
                    <form onSubmit = {e => {
                        e.preventDefault()
                        setSearchInput(gameValue + "/" + tagValue)
                        setGameValue("")
                        setTagValue("")
                    }}>
                        <input value={gameValue} onChange={e => setGameValue(e.target.value)} placeholder="Enter Game Name"/>
                        <input value={tagValue} onChange={e => setTagValue(e.target.value)} placeholder="Enter Tag Line"/>
                        <button type="submit">Search</button>
                    </form>
            )}

            {!loading && !error &&
                <div className='summoner-stats-container'>
                    <p>Summoner: {searchInput}</p>

                    {matchList.map((match, index) =>
                        <p key={index}>Match {index + 1} Details: {match}</p>
                    )}
                </div>
            }
            {error && loading && <h1>Failed to Find Summoner!</h1>}
            {loading && !error && <h1>Loading...</h1>}
        </div>
    )
}


export default function SummonerComp() {
    return(
        <>
            <h1 className='summoner-comparison-title'>Account/Summoner Comparisons</h1>
            <div style ={{display: "flex"}}>
                {Array.from(Array(4), (e, i) => {
                    return <div key = {i} className = "summoner-card"><SummonerCard/></div>
                })}
            </div>
        </>
    )
}