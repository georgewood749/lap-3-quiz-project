import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate()
    return (
        <button id='back' onClick={() => navigate(-1)}>Back</button >
    )
}

export default BackButton
