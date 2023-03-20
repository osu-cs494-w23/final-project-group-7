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
