import React, { useEffect, useState } from 'react'

export default function Timer() {
    const [seconds, setSeconds] = useState(10)

    // useEffect(() => {
    //     let interval = setInterval(() => setSeconds(seconds-1), 1000);

    //     if (seconds == 0){
    //         clearInterval(interval);
    //     } 
    // });

    // let interval = setInterval(() => setSeconds(seconds - 1), 1000);
    // if (seconds == 0) {
    //     clearInterval(interval);
    // }

    useEffect(() => {
        seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
    }, [seconds]);

    return (
        <div className='timer'>{seconds}</div>
    )
}
