import React from 'react';
import loading from "./loading.png";

export default function Lobby() {
    return (
        <div>
            <h1>Lobby</h1>
            <img className="centering" src={loading} alt="Loading" />
        </div>
    )
}
