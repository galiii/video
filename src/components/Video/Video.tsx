import React, { useEffect } from "react";
import { Scene } from "../../types/types";
import "./Video.css"

interface VideoProps {
    scene: Scene | null;
    forceRerenderKey: number;
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function Video({ scene, forceRerenderKey, videoRef }: VideoProps): JSX.Element {

    useEffect(() => {
        // Reset video source when forceRerenderKey changes
        if (videoRef.current) {
            videoRef.current.src = scene?.videoUrl || "";
        }
    }, [scene, forceRerenderKey]);
    return (
        <div className="video">
            <video ref={videoRef as React.LegacyRef<HTMLVideoElement>} width="400" controls>
                <source src={scene?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
