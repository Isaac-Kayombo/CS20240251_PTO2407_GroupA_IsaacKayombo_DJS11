import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [podcast, setPodcast] = React.useState([]);
    const [isLLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch("https://podcast-api.netlify.app")
            .then(res => res.json())
            .then(data => {
                setPodcast(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;   

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