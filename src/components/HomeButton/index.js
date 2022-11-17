import React from 'react'
import { Link } from 'react-router-dom'
import image from "../../images/logo.png";

export default function HomeButton() {
    return (
        <>
                <Link to='/'>
                    <img src={image} id='homeButton' />
                </Link>
        </>
    )
}
