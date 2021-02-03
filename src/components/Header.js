import React from 'react';
import '../styles/header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from "react-router-dom";
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if(user) {
            auth.signOut();
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }


    return (
        <div>
            <div className="header">
                <Link to="/">
                    <img className="header__logo" 
                    src="https://1079life.com/wp-content/uploads/2018/12/amazon_PNG11.png" 
                    alt=""/>
                </Link>

                <div className="header__search">
                    <input type="text" className="header__searchInput"/>
                    <SearchIcon className="header__searchIcon"/>
                </div>

                <div className="header__nav">
                    <Link to={!user && "/login"}>
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">Hello {user? capitalizeFirstLetter(user.email.split("@")[0]) : 'Guest'}</span>
                            <span className="header__optionLineTwo">{user ? 'Sign Out': 'Sign In'}</span>
                    </div>
                    </Link>

                    <div className="header__option">
                    <   span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& orders</span>
                    </div>

                    <div className="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Prime</span>
                    </div>

                </div>
                
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon/>
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>


            </div>
        </div>
    );
}

export default Header;