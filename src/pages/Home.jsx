import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [podcast, setPodcast] = React.useState([]);

    React.useEffect(() => {
        fetch("https://podcast-api.netlify.app")
            .then(res => res.json())
            .then(data => {
                setPodcast(data)
            })
    }, []);
}