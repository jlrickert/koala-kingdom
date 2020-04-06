export enum CardinalDirection {
    North,
    NorthEast,
    East,
    SouthEast,
    South,
    SouthWest,
    West,
    NorthWest,
}

export enum CharacterMode {
    Jumping,
    RunningNorth,
    RunningEast,
    RunningSouth,
    RunningWest,
    Falling,
    Idle,
}

export const scene = {
    Width: 1280,
    Height: 578,
};

export const textureMap = {
    Character: "assets/character/adventurer.json",
};

export enum KeyCodes {
    Space = "Space",
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown",
    ArrowLeft = "ArrowLeft",
    ArrowRight = "ArrowRight",
}

export const World = {
    Character: {
        Speed: 2,
        Direction: CardinalDirection.South,
    },
};
