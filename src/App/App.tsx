import { useState, useRef } from "react";
import SceneList from "../components/SceneList/SceneList";
import ScenePreview from "../components/ScenePreview/ScenePreview";
import { Scene } from "../types/types";
import scenesData from '../db';
import "./App.css";


function App(): JSX.Element {
  //states
  const [scenes, setScenes] = useState<Scene[]>(scenesData);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [forceRerenderKey, setForceRerenderKey] = useState(0);

  //function
  function handleSceneSelect(scene: Scene): void {
    setSelectedScene({ ...scene });
  }

  function handleSceneDrop(droppedScene: Scene): void {
    setScenes((prevScenes) => {
      const updatedScenes = prevScenes.map((scene) =>
        scene.id === droppedScene.id ? droppedScene : scene
      );
      return updatedScenes;
    });
  }

  function handleTrackPlay(): void {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }

  //render
  return (
    <div className="App">
      <SceneList scenes={scenes} onSceneSelect={handleSceneSelect} onSceneDrop={handleSceneDrop} />
      <ScenePreview
        scene={selectedScene}
        forceRerenderKey={forceRerenderKey}
        isPlaying={isPlaying}
        onPlayPause={handleTrackPlay}
        videoRef={videoRef}
      />

      {/*<Track
        scenes={scenes}
        onSceneDrop={handleSceneDrop}
        onTrackPlay={handleTrackPlay}
  />*/}
    </div>
  );
}

export default App;
