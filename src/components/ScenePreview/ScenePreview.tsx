import { Scene } from "../../types/types";
import Controls from "../Controls/Controls";
import Video from "../Video/Video";
import "./ScenePreview.css";
import logo from "../../assets/clapboard.svg"


interface ScenePreviewProps {
    scene: Scene | null;
    forceRerenderKey: number;
    isPlaying: boolean;
    onPlayPause: () => void;
    videoRef: React.RefObject<HTMLVideoElement | null>;

}

export default function ScenePreview({ scene, forceRerenderKey, isPlaying, onPlayPause, videoRef }: ScenePreviewProps): JSX.Element {

    return (
        <div className="scene-preview">
            <h2>Preview</h2>
            {scene ? (
                <div className="selected-preview">
                    <span className="selected-preview_text">Scene {scene.id}</span>
                    <Video scene={scene} forceRerenderKey={forceRerenderKey} videoRef={videoRef} />
                </div>
            ) : (
                <div className="default-preview">
                    <img src={logo} alt="Default Preview" />
                </div>
            )}
            <Controls isPlaying={isPlaying} onPlayPause={onPlayPause} />
        </div>
    );
}

