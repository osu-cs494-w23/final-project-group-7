import { useEffect, useState } from 'react'
import APIKEYDATA from '../apikey.json'
const APIKEY = APIKEYDATA.key


export function GetMastery (summonerID, championID){
    const [mastery, setMastery] = useState([])
    const [summoner, setSummoner] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    useEffect(() => {
        async function fetchSearchResults() {
            setLoading(true)
            let responseBody = {}
            const summonerResponse = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerID}?api_key=${APIKEY}`)
            if (summonerResponse.status !== 200) {
                console.log("== status:", summonerResponse.status)
                setError(true)
            } else {
                setError(false)
                responseBody = await summonerResponse.json()
                setSummoner(responseBody.name)
            }

            const masteryResponse = await fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${responseBody.id}/by-champion/${championID}?api_key=${APIKEY}`)
            if (masteryResponse.status !== 200) {
                console.log("== status:", masteryResponse.status)
                setError(true)
            } else {
                responseBody = await masteryResponse.json()
                setMastery(responseBody || {})
                setError(false)
                setLoading(false)
            }
        }
        if(championID && summonerID){
            fetchSearchResults()
        }
        else{
            
        }
    }, [summonerID, championID])
    return [ mastery, summoner, loading, error ]
}

function GetSummonerID(query) {
    const [ summoner, setSummoner ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        let ignore = false
        const controller = new AbortController()
        async function fetchSearchResults() {
            setLoading(true)
            let responseBody = {}
            try {
                const response = await fetch(
                    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}?api_key=${APIKEY}`,
                    { signal: controller.signal }
                )
                if (response.status !== 200) {
                    console.log("== status:", response.status)
                    setError(true)
                } else {
                    setError(false)
                    responseBody = await response.json()
                }
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("HTTP request cancelled")
                } else {
                    setError(true)
                    console.error("Error:", e)
                    throw e
                }
            }

            if (!ignore) {
                setSummoner(responseBody.id || {})
                setLoading(false)
            }
        }
        if (query) {
            fetchSearchResults()
        }
        return () => {
            ignore = true
            controller.abort()
        }
    }, [ query ])

    return [ summoner, loading, error ]
}

export default GetSummonerID
