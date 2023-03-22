import {React, useState } from 'react'
import './summonerComp.css';
import GetSummonerID from '../hooks/Services'
import { GetSummonerStats, GetMatchHistory, GetMatchDetails } from '../hooks/Services'

function MatchDetails(props) {
    const [matchDetail] = GetMatchDetails(props.matchList[props.selectedMatch]);

    if (matchDetail.length !== 0) {
        return (
            <>
              <p>Game Duration: {matchDetail.info.gameDuration}</p>
              <p>Game Mode: {matchDetail.info.gameMode}</p>
              <p>Game Type: {matchDetail.info.gameType}</p>
              {matchDetail.info.participants.map((player, index) =>
                player.summonerId === props.summonerId &&
                <div key={index}>
                  <p>Champion: {player.championName}</p>
                  <p>K/D/A: {player.challenges.kda}</p>
                </div>
              )}
            </>
          );
    }
  }

function SummonerCard() {
    const [searchInput, setSearchInput] = useState("");
    const [value, setValue] = useState("");
    const [summoner, loading, error] = GetSummonerID(searchInput);
    const [stats] = GetSummonerStats(summoner.id);
    const [matchList] = GetMatchHistory(summoner.puuid);
    const [selectedMatch, setSelectMatch] = useState(0);

    const handleSelectMatch = (e) => {
        setSelectMatch(e.target.value);
    }

    return (
        <div>
            <form onSubmit = {e => {
                e.preventDefault()
                setSearchInput(value)
                setValue("")
            }}>
                <input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter Summoner Name"/>
                <button type="submit">Search</button>
            </form>

            {!loading && !error && 
                <div className='summoner-stats-container'>
                    <div><strong>Summoner: </strong>{summoner.name}</div>
                    {summoner.length !== 0 && 
                        <>
                            <div><strong>Summoner Level: </strong>{summoner.summonerLevel}</div>
                            <div><strong>Tier: </strong>{stats.tier}</div>
                            <div><strong>Rank: </strong>{stats.rank}</div>
                            <div><strong>League Points: </strong>{stats.leaguePoints}</div>
                            <div><strong>Matches Won: </strong>{stats.wins}</div>
                            <div><strong>Matches Lost: </strong>{stats.losses}</div>
                            <div><strong>Match Details</strong></div>
                            <select value={selectedMatch} onChange={handleSelectMatch}>
                                {matchList.map((match, index) =>
                                    <option value={index}>Match {index + 1}</option>
                                )}
                            </select>
                            <MatchDetails 
                                matchList={matchList}
                                selectedMatch={selectedMatch}
                                summonerId={summoner.id}
                            />
                        </>
                    }
                </div>
            }
            {error && loading && <h1>Failed to Find Summoner, {searchInput}!</h1>}
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