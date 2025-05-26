import React from 'react';

function EpisodePlayer({episode}) {
    const audioRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const togglePlay = () => {
        const audio =audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, []);

    return (
        <div className='episode-player'>
            <button className='play-button' onClick={togglePlay}>
                {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button>❤</button>
            <audio ref={audioRef} src={episode.file}/>
        </div>
    )
}

export default EpisodePlayer;