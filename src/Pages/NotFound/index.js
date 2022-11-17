import React from 'react'
import { HomeButton } from '../../components'
import { BackButton } from '../../components'

export default function NotFound() {
    return (
        <div>
            <HomeButton />
            <BackButton />
            <h1>
                Page not found.
            </h1>
        </div>
    )
}
