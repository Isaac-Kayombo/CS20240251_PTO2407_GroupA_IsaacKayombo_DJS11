import React from "react"

function Favorites() {
    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites")) || [])
    }, []);

    return (
        <div className="podcast-detail">
            <h1>Favorites Episodes</h1>
            <p>No favorite episodes yet.</p>
        </div>
    )
}

export default Favorites;