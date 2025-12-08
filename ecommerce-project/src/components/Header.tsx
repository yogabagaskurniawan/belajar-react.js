import './Header.css'
// https://reactrouter.com/start/framework/navigating
// import { Link } from 'react-router'
import { NavLink, useNavigate, useSearchParams  } from 'react-router'
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import carticon from '../assets/images/icons/cart-icon.png'
import searchIcon from '../assets/images/icons/search-icon.png'
import { useState } from 'react'

type HeaderProps = {
  carts: {
    productId: string
    quantity: number
    deliveryOptionId: string
  }[]
}

export function Header ({carts}: HeaderProps) {
  const [searchParams] = useSearchParams();
  
  const searchText = searchParams.get('search');
  const [searchValue, setSearchValue] = useState(searchText || '')

  const navigate = useNavigate()
  let totalQuantity = 0
  
  carts.forEach((cart) => {
    totalQuantity += cart.quantity
  });
  
  const inputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);    
  }

  const buttonSearch = () => {
    navigate(`/?search=${searchValue}`);    
  }
  
  return (
    <div className="header">
      <div className="left-section">
        <NavLink  to="/" className="header-link">
          <img className="logo"
            src={LogoWhite} />
          <img className="mobile-logo"
            src={MobileLogoWhite} />
        </NavLink >
      </div>

      <div className="middle-section">
        <input className="search-bar" onChange={inputValue} value={searchValue} type="text" placeholder="Search" />

        <button className="search-button" onClick={buttonSearch}>
          <img className="search-icon" src={searchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={carticon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  )
}