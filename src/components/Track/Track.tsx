import React, { useState, useRef } from "react";
import Ruler from "../Ruler/Ruler";
import { Scene } from "../../types/types";
import "./Track.css";
import Button from "../Button/Button";

interface TrackProps {
    scenes: Scene[];
    onSceneDrop: (scene: Scene) => void;
    onTrackPlay: () => void;
}

function Track({ scenes, onSceneDrop, onTrackPlay }: TrackProps): JSX.Element {
    const [trackScenes, setTrackScenes] = useState<Scene[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [zoomFactor, setZoomFactor] = useState(1);
    const trackContentRef = useRef<HTMLDivElement>(null);

    const rulerWidth = 60;

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const sceneId = Number(e.dataTransfer.getData("text/plain"));
        const selectedScene = scenes.find((scene) => scene.id === sceneId);
        if (selectedScene) {
            onSceneDrop(selectedScene);
            setTrackScenes([...trackScenes, selectedScene]);
        }
    };

    const handleTrackPlay = (): void => {
        setIsPlaying(!isPlaying);
        onTrackPlay();
    };

    return (
        <div className="track">
            <div className="track-controls">
                <Button onPlayPause={handleTrackPlay} isPlaying={isPlaying} />
            </div>
            <Ruler rulerWidth={rulerWidth} zoomFactor={zoomFactor} />
            <div
                className="track-content"
                ref={trackContentRef}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {trackScenes.map((scene) => (
                    <div
                        key={scene.id}
                        className="track-scene"
                        style={{ width: `${scene.duration * 20 * zoomFactor}px` }}
                    >
                        Scene {scene.id}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Track;
