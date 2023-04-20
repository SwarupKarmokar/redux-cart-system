import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
    // getting store data 
    // subscribe the whole application state 
    const products = useSelector(state => state.cart);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className='logo'>ReduxCart</span>
            <div>
                <Link to={'/'} className='navLink'>Home</Link>
                <Link to={'/cart'} className='navLink'>Cart</Link>
                <span className="cartCount">cart: {products.length}</span>
            </div>
        </div>
    )
}

export default Navbar