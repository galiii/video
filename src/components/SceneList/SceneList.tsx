import { useDrop } from "react-dnd";
import { Scene, ItemTypes } from '../../types/types';
import './SceneList.css';
import SceneItem from '../SceneItem/SceneItem';

interface SceneListProps {
    scenes: Scene[];
    onSceneSelect: (scene: Scene) => void;
    onSceneDrop: (scene: Scene) => void;
}

export default function SceneList({ scenes, onSceneSelect, onSceneDrop }: SceneListProps): JSX.Element {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.SCENE,
        drop: (item: any) => onSceneDrop(item.scene),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className="scene-list">
            <h2>All Scenes</h2>
            {scenes.map((scene) => (
                <SceneItem key={scene.id} scene={scene} onSceneSelect={onSceneSelect} />
            ))}
        </div>
    );
}

