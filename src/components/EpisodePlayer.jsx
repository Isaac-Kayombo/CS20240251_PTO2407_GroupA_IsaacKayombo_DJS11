import React from 'react';

// DEFINING EPISODE PLAYER COMPONENT

function EpisodePlayer({ episode, showTitle, seasonTitle }) {
    // STATE HOOKS FOR AUDIO CONTROL, TRACK PLAYING STATE, IF EPISODE HAS BEEN FAVORITED STATE
    const audioRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    // TOGGELS THE PLAY/PAUSE AUDIO ELEMENT
    const togglePlay = () => {
        const audio =audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    // ADDS EPISODE TO LOCAL STORAGE FAVORITES IF NOT ADDED ALREADY
    const handleFavorite = () => {
        const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // creates new favorite with metadata
        const newFavorite = {
            ...episode,
            showTitle,
            seasonTitle,
            addedAt: new Date().toISOString()
        };

        // if episode is already in favorites (based on title and showTitle)
        const isDuplicate = existingFavorites.some(
            (ep) => ep.title === episode.title && ep.showTitle === showTitle
        );

        // adds it and update state and localStorage (if not favorite already)
        if (!isDuplicate) {
            existingFavorites.push(newFavorite);
            localStorage.setItem("favorites", JSON.stringify(existingFavorites));
            setIsFavorite(true);
        }
    };

    // attach audio event listeners and clean them up when component unmounts
    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        // Event listeners to audio element
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        // Removes event listeners on unmount
        return () => {
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, []);

    // RENDERS PLAY/PAUSE AND FAVORITE BUTTONS
    return (
        <div className='episode-player'>
            <button className='play-button' onClick={togglePlay}>
                {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button 
                onClick={handleFavorite}
                className={`heart-button ${isFavorite ? "favorited" : ""}`}
            >❤</button>
            <audio ref={audioRef} src={episode.file}/>
        </div>
    )
}

export default EpisodePlayer;