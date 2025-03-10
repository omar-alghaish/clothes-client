'use client'
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const Video = ({ options }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        // Initialize the player
        if (!playerRef.current) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement, options, () => {
                console.log('Player is ready');
            });
        }

        // Cleanup on unmount
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [options]);

    return (
        <div data-vjs-player className="w-full max-w-6xl mx-auto"> {/* Increased max width */}
            <video
                ref={videoRef}
                className="video-js vjs-big-play-centered w-full h-auto rounded-lg shadow-lg"
            />
        </div>
    );
};

export default Video;