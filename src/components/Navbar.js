import { NavLink } from "react-router-dom";
import './Navbar.css'

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

export default function Navbar() {
	return(
        <>
        <div className="navbar">
          <a><NavLink to="/summonerCompare">Compare Summoners</NavLink> </a>
          <a><NavLink to="/championCompare">Compare Champions</NavLink></a>
        </div>
        </>
    )
}