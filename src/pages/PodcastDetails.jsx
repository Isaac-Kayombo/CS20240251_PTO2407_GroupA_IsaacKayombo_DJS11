import React from 'react'
import { useParams } from 'react-router-dom';


function PodcastDetails() {
    const { id } = useParams();
    const [podcast, setPodcast] = React.useState(null);

    React.useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then(res => res.json())
            .then(data => {
                setPodcast(data);
            })
    }, [id]);

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