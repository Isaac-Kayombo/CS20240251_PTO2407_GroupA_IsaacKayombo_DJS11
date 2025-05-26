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

    const podcastElements = podcast.map(podcast => (
        <div key={podcast.id} className='podcast-title'>
            <Link to={`/podcast/${podcast.id}`}>
                <img src={podcast.image} />
                <div className='podcast-info'>
                    <h2>{podcast.title}</h2>
                    <p>{podcast.seasons} Seasons</p>
                    <p className='podcast-date'>{new Date(podcast.updated).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}</p>
                </div>
            </Link>
        </div>
    ))

    return (
        <div className='podcast-list-container'>
            <h1>Explore All Podcasts</h1>
            <div className='podcast-list'>
                {podcastElements}
            </div>
        </div>
    )
}

export default Home;