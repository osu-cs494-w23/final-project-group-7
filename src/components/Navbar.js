import { NavLink } from "react-router-dom";

export default function Navbar() {
	return(
        <>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/championCompare">Compare Champions</NavLink></li>
            <li><NavLink to="/summonerCompare">Compare Summoners</NavLink></li>
        </ul>
        </>
    )
}