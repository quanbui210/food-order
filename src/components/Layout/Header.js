import React, { useState, useEffect } from 'react';
import mealImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton'


const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Happy Meals</h1>
                <HeaderCartButton open={props.open}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealImg} alt="mmmm"/>
            </div>
        </React.Fragment>
    )
}

export default Header

