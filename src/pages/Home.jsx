import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

// DEFINING HOME COMPONENT 
function Home() {
    // STATE HOOKS FOR PODCAST DATA, LOADING STATE, ERROR STATE, AND SORT ORDER
    const [podcast, setPodcast] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [sortOrder, setSortOrder] = React.useState("asc");

    // HOOK TO FETCH PODCAST DATA WHEN COMPONENT MOUNTS
    React.useEffect(() => {
        fetch("https://podcast-api.netlify.app")
            .then(res => res.json())
            .then(data => {
                const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
                setPodcast(sortedData); // storing data in state
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

     // Shows loading spinner while data is being fetched / Shows error message if there's an issue
    if (isLoading) return <div className='loader-container'><p className='loader'></p></div>
    if (error) return <div className='error-message'><p>Error: {error}</p></div>

    // SORTS PODCASTS TO SELECTED SORT ORDER (TITLE OR UPDATED DATE)
    const sortedPodcasts = [...podcast].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
        } else if (sortOrder === "desc") {
            return b.title.localeCompare(a.title);
        } else if (sortOrder === "updated-desc") {
            return new Date(b.updated) - new Date(a.updated);
        } else if (sortOrder === "updated-asc") {
            return new Date(a.updated) - new Date(b.updated);
        }
    });

    // GENERATES PODCAST TILES FOR EACH PODCAST IN THE SORTED LIST
    const podcastElements = sortedPodcasts.map(podcast => (
        <div key={podcast.id} className='podcast-tile'>
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

    // RENDERS MAIN PODCAST LIST WITH SORTING DROPDOWN
    return (
        <div className='podcast-list-container'>
            <h1>Explore All Podcasts</h1>

            <div className='sort-dropdown'>
                <label htmlFor='sort'>Sort by:</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                    <option value="updated-desc">Newly Updated</option>
                    <option value="updated-asc">Oldest Updated</option>
                </select>
            </div>

            <div className='podcast-list'>
                {podcastElements}
            </div>
        </div>
    )
}

export default Home;