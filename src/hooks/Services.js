import { useEffect, useState } from 'react'
import APIKEYDATA from '../apikey.json'
const APIKEY = APIKEYDATA.key

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
                setSummoner(responseBody || {})
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

//takes the encryptedSummonerId from the query above to pull champion mastery list for that player
//sorted by number of champion points descending
function GetChampionList(query) {
    const [ champion, setChampion ] = useState([])
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
                    `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${query}?api_key=${APIKEY}`,
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
                console.log("** Response: ", responseBody)
                setChampion(responseBody.championId || {})
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

    return [ champion, loading, error ]
}

//takes the puuid from the GetSummonerID function above to request the 10 most recent matchId's for that player
export function GetMatchHistory(query) {
    const [ matchList, setMatchList ] = useState([])
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
                    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${query}/ids?start=0&count=10&api_key=${APIKEY}`,
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
                console.log("** Response: ", responseBody)
                setMatchList(responseBody || {})
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

    return [ matchList, loading, error ]
}

//gets ALL match details for the given MatchID, to find details for our specific player we must search through the Participant list using our summoners puuid
export function GetMatchDetails(query) {
    const [ matchDetail, setMatchDetail ] = useState([])
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
                    `https://americas.api.riotgames.com/lol/match/v5/matches/${query}?api_key=${APIKEY}`,
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
                console.log("** Response: ", responseBody)
                setMatchDetail(responseBody || {})
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

    return [ matchDetail, loading, error ]
}

//takes the puuid from the GetSummonerID function above to get the summoner's stats
export function GetSummonerStats(query) {
    const [ stats, setStats ] = useState([])
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
                    `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${query}?api_key=${APIKEY}`,
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
                setStats(responseBody[0] || {})
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

    return [ stats, loading, error ]
}