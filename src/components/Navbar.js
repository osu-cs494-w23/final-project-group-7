import { NavLink } from "react-router-dom";

export default function Navbar() {
	return(
        <>
        <ui>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/championCompare">Compare Champions</NavLink></li>
        </ui>
        </>
    )
}