import APIKEYDATA from '../apikey'
import GetSummonerID from '../hooks/GetSummoner'
import ChampIDs from '../data/lol_IDS'
const APIKEY = APIKEYDATA.key

function ChampCard(props){
    const champion = props.champion
    const summoner = 'Skinniest'
    const summonerID = GetSummonerID(summoner);



    return (
        <div>
            <h1>{summonerID}</h1>
        </div>
    )
}


export default function ChampionComp() {
    const champion = "1"
    const number = 2
    return(
        <>
        <h1>Place Dropdown of Champs here</h1>
        <h1>Place Dropdown of Compare Amount</h1>

        <div>
            {Array.from(Array(number), (e, i) => {
                return <div><ChampCard champion/></div>
            })}
        </div>
        
        </>
    )
}