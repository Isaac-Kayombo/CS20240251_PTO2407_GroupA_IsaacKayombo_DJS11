import React from 'react'
import { useParams } from 'react-router-dom';
import EpisodePlayer from '../components/EpisodePlayer';
import './PodcastDetails.css'

function PodcastDetails() {
    const { id } = useParams();
    const [podcast, setPodcast] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then(data => {
                setPodcast(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className='loader-container'><p className='loader'></p></div>
    if (error) return <p>Error: {error}</p>

    return (
        <div className='podcast-detail'>
            <h1>{podcast.title}</h1>
            <img src={podcast.image} alt={podcast.title}/>
            <p>{podcast.description}</p>
            <h2>Seasons</h2>
            <ul>
                {podcast.seasons.map((season, index) => (
                    <li key={index}>
                        <h3>{season.title}</h3>
                        <h4>{season.episodes.length} Episodes</h4>
                        <ul>
                            {season.episodes.map((episode, index2) => (
                                <li key={index2}>
                                    <strong>{episode.title}</strong>
                                    <EpisodePlayer 
                                        episode={episode}
                                        showTitle={podcast.title}
                                        seasonTitle={season.title}
                                    />                
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PodcastDetails;