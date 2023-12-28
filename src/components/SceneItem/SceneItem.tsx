import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Scene, ItemTypes } from "../../types/types";
import "./SceneItem.css";

interface SceneProps {
    scene: Scene;
    onSceneSelect: (scene: Scene) => void;
}
export default function SceneItem({ scene, onSceneSelect }: SceneProps) {
    const [sceneDurations, setSceneDurations] = useState<Record<number, number>>(
        {}
    );

    useEffect(() => {
        const fetchDurations = async () => {
            const durations: Record<number, number> = {};
            const duration = await fetchSceneDuration(scene.videoUrl);
            durations[scene.id] = duration;

            setSceneDurations(durations);
        };

        fetchDurations();
    }, [scene]);

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        scene: Scene
    ): void => {
        e.dataTransfer.setData("text/plain", String(scene.id));
    };

    const fetchSceneDuration = async (videoUrl: string): Promise<number> => {
        return new Promise((resolve) => {
            const video = document.createElement("video");
            video.src = videoUrl;
            video.addEventListener("loadedmetadata", () => {
                resolve(video.duration);
            });
        });
    };

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.SCENE,
        item: { scene },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    return (
        <div
            ref={drag}
            className={`scene ${isDragging ? "scene_dragging" : ""}`}
            onClick={() => onSceneSelect(scene)}
            draggable
            onDragStart={(e) => handleDragStart(e, scene)}
        >
            <div className="scene-details">
                <p>Scene {scene.id}</p>
                <p>Duration: {sceneDurations[scene.id]}s</p>
            </div>
            <div className="scene-thumbnail">
                <span role="img" className="scene-icon" aria-label="film">
                    🎬
                </span>
            </div>
        </div>
    );
}
