export interface Scene {
    id: number;
    duration: number;
    videoUrl: string;
}

interface ItemTypes {
    SCENE: 'scene';
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ItemTypes: ItemTypes = {
    SCENE: 'scene',
};

