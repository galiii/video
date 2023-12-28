import "./Controls.css";
import Button from "../Button/Button";

interface ControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
}

export default function Controls({ isPlaying, onPlayPause }: ControlsProps): JSX.Element {
    return (
        <div className="controls">
            <Button onPlayPause={onPlayPause} isPlaying={isPlaying} />
        </div>
    );
}
