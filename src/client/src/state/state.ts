import { Scene, CharacterMode, CardinalDirection } from "../constants";

interface WorldObject {
    x: number;
    y: number;
    vX: number;
    vY: number;
}

interface InitProps {
    // level: ParsedTile[];
}

interface Character extends WorldObject {
    mode: CharacterMode;
    direction: CardinalDirection;
}

export interface GameState {
    world: {
        character: Character;
    };
}

export const initState = ({}: InitProps): GameState => ({
    world: {
        character: {
            x: 50,
            y: Scene.Height / 2,
            vX: 0,
            vY: 0,
            direction: 0,
            mode: CharacterMode.Idle,
        },
    },
});
