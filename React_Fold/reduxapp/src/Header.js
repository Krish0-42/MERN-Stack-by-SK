import { NavLink } from "react-router-dom";

function Header (){
    return(
        <div> 
            <NavLink to={"/Home"}> Home </NavLink> <br />
            <NavLink to={"/About"}> About </NavLink> <br />
            <NavLink to={"/Contact"}> Contact </NavLink> <br />
        </div>
    );
}

export default Header;
