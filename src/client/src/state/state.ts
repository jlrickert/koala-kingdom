import { scene, CharacterMode, CardinalDirection } from "../constants";

interface InitProps {
    // level: ParsedTile[];
}

export interface WorldObject {
    x: number;
    y: number;
    vX: number;
    vY: number;
}

export interface CharacterState extends WorldObject {
    mode: CharacterMode;
    direction: CardinalDirection;
}

export interface KeyboardState {
    Space: boolean;
    ArrowRight: boolean;
    ArrowLeft: boolean;
}

export interface GameState {
    world: {
        character: CharacterState;
    };
    keyboard: KeyboardState;
}

export const initState = ({}: InitProps): GameState => ({
    world: {
        character: {
            x: 50,
            y: scene.Height / 2,
            vX: 0,
            vY: 0,
            direction: 0,
            mode: CharacterMode.Idle,
        },
    },
    keyboard: {
        Space: false,
        ArrowRight: false,
        ArrowLeft: false,
    },
});
