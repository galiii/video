import "./Button.css";

interface ButtonProps {
    isPlaying: boolean;
    onPlayPause: () => void;
}
export default function Button({ isPlaying, onPlayPause }: ButtonProps): JSX.Element {
    return (
        <button className="button" onClick={onPlayPause}>
            {isPlaying ? "Pause" : "Play"}
        </button>
    );
}
