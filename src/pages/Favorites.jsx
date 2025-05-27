import React from "react"

function Favorites() {
    const [favorites, setFavorites] = React.useState([]);
    

    React.useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites")) || [])
    }, []);

    const FavoriteElements = Object.entries(grouped).map(([groupTitle, episodes]) => (
        <div key={groupTitle}>
            <h2>{groupTitle}</h2>
            <ul>
                {episodes.map((episode) => (
                    <li key={episode.id || episode.title}>
                        <strong>{episode.title}</strong>
                        <div>
                            <small>Added on: {new Date(episode.addedAt).toLocaleString()}</small>
                        </div>
                        <button>🗑</button>
                    </li>
                ))}
            </ul>
        </div>
    ));

    return (
        <div className="podcast-detail">
            <h1>Favorites Episodes</h1>
            {FavoriteElements.length > 0 ? FavoriteElements : <p>No favorite episodes yet.</p>}
        </div>
    )
}

export default Favorites;