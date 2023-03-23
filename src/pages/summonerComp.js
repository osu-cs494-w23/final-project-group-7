import {React, useState } from 'react'
import './summonerComp.css';
import GetSummonerID from '../hooks/Services'
import { GetSummonerStats, GetMatchHistory, GetMatchDetails } from '../hooks/Services'

function MatchDetails(props) {
    const [matchDetail] = GetMatchDetails(props.matchList[props.selectedMatch]);

    if (matchDetail.length !== 0) {
        return (
            <>
              {matchDetail.info.participants.map((player, index) =>
                player.summonerId === props.summonerId &&
                <div key={index}>
                  <div className={player.win ? 'win' : 'loss'}>
                  <p><img alt='' src={`championIcons/${player.championName}.png`} width="100px"/> K/D/A: {player.kills}/{player.deaths}/{player.assists}</p>
                  </div>
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
                    {summoner.length === 0 && <h2>Enter summoner name for stats to show up here</h2>}
                    {summoner.length !== 0 &&  
                        <>
                            <div className='summName'><strong>{summoner.name}</strong><a> Lvl.{summoner.summonerLevel}</a></div>
                            <div className='summStats'><strong>{stats.tier} {stats.rank} {stats.leaguePoints}LP</strong><a> {stats.wins}W / {stats.losses}L</a></div>
                            {matchList.map((match, index) =>
                                <div key={index}>
                                    <div><strong>Match {index + 1} Details</strong></div>
                                    <MatchDetails key={index}
                                        matchList={matchList}
                                        selectedMatch={index}
                                        summonerId={summoner.id}
                                    />
                                </div>
                            )}
                        </>
                    }
                </div>
            }
            {error && loading && <h1 className='h1inbox'>Failed to Find Summoner, {searchInput}!</h1>}
            {loading && !error && <h1 className='h1inbox'>Loading...</h1>}
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