import './championComp.css'
import APIKEYDATA from '../apikey'
import { GetMastery } from '../hooks/GetSummoner'
import { useState} from 'react'
import Select from 'react-select'
import champIDs from '../data/lol_IDS.json'
const APIKEY = APIKEYDATA.key
//https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}/by-champion/${championID}?api_key=${APIKEY}


function ChampCard(props){
    const [inputQuery, setInputQuery] = useState("")
    const [value, setValue] = useState("")
    const [ mastery, summoner, loading, error ] = GetMastery(inputQuery, props.champion)

    return (
        <div>
            <form onSubmit = {e => {
                e.preventDefault()
                setInputQuery(value)
                setValue("")
            }}>
                <input value = {value} onChange ={e => setValue(e.target.value)}/>
                <button type = "submit">Search Summoner</button>
            </form>
            {error && <h1>Failed to Find Summoner!</h1>}
            {loading ? <h1>Loading...</h1>
            :
            (
                <>
                    <h1>Summoner: {summoner}</h1>
                    <h1>Champion Level: {mastery.championLevel}</h1>
                    <h1>Champion Points: {mastery.championPoints}</h1>
                </>
            )
            }
        </div>
    )
}


export default function ChampionComp() {
    const [championID, setChampionID] = useState("1")
    const [champion, setChampion] = useState("Annie")

    let image = `championIcons/${champion}.png`
    return(
        <>
        <Select options={champIDs} onChange ={opt => {setChampionID(opt.value); setChampion(opt.label)}}/>
        <h1>{champion}</h1>
        <img src={image} width="250px"/>
        <div style ={{display: "flex"}}>
            {Array.from(Array(4), (e, i) => {
                return <div key = {i} className = "ChampCard"><ChampCard champion = {championID}/></div>
            })}
        </div>
        
        </>
    )
}