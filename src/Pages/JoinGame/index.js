import React from 'react'

export default function JoinGame() {
    return (
        <div className='main'>
            <h1>Join Game</h1>

            <form id='join' className='center'>
                <div className="input_wrap">
                    <input type="text" required />
                    <label>Enter Meeting ID</label>
                </div>

                <div className="input_wrap">
                    <input type="text" required />
                    <label>Enter Username</label>
                </div>

                <input type='submit' value='Submit'></input>
            </form>

        </div>
    )
}
