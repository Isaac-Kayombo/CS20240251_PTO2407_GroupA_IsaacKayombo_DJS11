import React from "react"

function Favorites() {
    const [favorites, setFavorites] = React.useState([]);
    const [sortOrder, setSortOrder] = React.useState("A-Z");
    

    React.useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites")) || [])
    }, []);

    const handleDelete = (episodeToDelete) => {
    const updatedFavorites = favorites.filter(
        (episode) =>
            episode.title !== episodeToDelete.title ||
            episode.showTitle !== episodeToDelete.showTitle ||
            episode.seasonTitle !== episodeToDelete.seasonTitle
        );
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const sortedFavorites = [...favorites].sort((a, b) => {
        if (sortOrder === "A-Z") {
            return a.title.localeCompare(b.title);
        } else if (sortOrder === "Z-A") {
            return b.title.localeCompare(a.title);
        } else if (sortOrder === "Newest") {
            return new Date(b.addedAt) - new Date(a.addedAt);
        } else if (sortOrder === "Oldest") {
            return new Date(a.addedAt) - new Date(b.addedAt);
        }
    });

    // Group by showTitle and seasonTitle
    const grouped = sortedFavorites.reduce((acc, episode) => {
        const key = `${episode.showTitle} - ${episode.seasonTitle}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(episode);
        return acc;
    }, {});


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
                        <button onClick={() => handleDelete(episode)}>🗑</button>
                    </li>
                ))}
            </ul>
        </div>
    ));

    return (
        <div className="podcast-detail">
            <h1>Favorites Episodes</h1>
            <div className="sort-dropdown">
                <label>Sort by title:</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="A-Z">A - Z</option>
                    <option value="Z-A">Z - A</option>
                    <option value="Newest">Most Recently Added</option>
                    <option value="Oldest">Oldest First</option>
                </select>
            </div>
            {FavoriteElements.length > 0 ? FavoriteElements : <p>No favorite episodes yet.</p>}
        </div>
    )
}

export default Favorites;