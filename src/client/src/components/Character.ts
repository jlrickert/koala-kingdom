// import * as PIXI, { AnimatedSprite } from "pixi.js";
import * as PIXI from "pixi.js";
import { AnimatedSprite } from "pixi.js";
import { GameComponent, getKeyboardState, DisplayObject } from "../framework";
import { GameState as State } from "../state";
import { CharacterMode, textureMap, World } from "../constants";

const CharacterTextureMap = {
    [CharacterMode.Idle]: "idle",
    [CharacterMode.RunningNorth]: "running",
    [CharacterMode.RunningEast]: "running",
    [CharacterMode.RunningWest]: "running",
    [CharacterMode.RunningSouth]: "running",
    [CharacterMode.Falling]: "falling",
    [CharacterMode.Jumping]: "jumping",
};

export class Character extends GameComponent {
    private state: State;

    constructor(state: State) {
        super();
        this.state = state;
    }

    mount() {
        const { world } = this.state;
        const resource = PIXI.Loader.shared.resources[textureMap.Character];
        const sprite = new PIXI.AnimatedSprite(
            resource.spritesheet!.animations.idle
        );
        sprite.anchor = new PIXI.Point(0.5, 0.5);
        sprite.x = world.character.x;
        sprite.y = world.character.y;
        sprite.scale = new PIXI.Point(1.5, 1.5);
        sprite.play();
        sprite.animationSpeed = 0.1;
        return sprite;
    }

    render(sprite: AnimatedSprite) {
        const { world } = this.state;
        // update(state);

        const resource = PIXI.Loader.shared.resources[textureMap.Character];
        sprite.scale.x = world.character.direction
            ? Math.abs(sprite.scale.x) * world.character.direction
            : sprite.scale.x;

        sprite.x = world.character.x;
        sprite.y = world.character.y;

        resource.spritesheet!.animations; // what? Why is this here
        const currentAnimation = CharacterTextureMap[world.character.mode];
        const currentTexture = resource.spritesheet!.animations[currentAnimation];

        if (sprite.textures !== currentTexture) {
            sprite.textures = currentTexture;
            sprite.play();
        }
    }
}

// const update = (state: State) => {
//     console.log("updating");
//     const { character } = state.world;
//     const { ArrowRight, ArrowLeft } = getKeyboardState();

//     if (ArrowLeft && ArrowRight) {
//     } else if (ArrowLeft) {
//         character.vX = -World.Character.Speed;
//     } else if (ArrowRight) {
//         character.vX = World.Character.Speed;
//     } else {
//         character.vX = 0;
//     }
//     character.x = character.x + character.vX;
// };

// //@ts-ignore this is correct. Don't know why typescript is complaining.
// const render: RenderFn<State> = (sprite: PIXI.AnimatedSprite, state) => {
//     const { world } = state;
//     update(state);
//     const resource = PIXI.Loader.shared.resources[TextureMap.Character];
//     sprite.scale.x = world.character.direction
//         ? Math.abs(sprite.scale.x) * world.character.direction
//         : sprite.scale.x;

//     sprite.x = world.character.x;
//     sprite.y = world.character.y;

//     resource.spritesheet!.animations; // what? Why is this here
//     const currentAnimation = CharacterTextureMap[world.character.mode];
//     const currentTexture = resource.spritesheet!.animations[currentAnimation];

//     if (sprite.textures !== currentTexture) {
//         sprite.textures = currentTexture;
//         sprite.play();
//     }
// };

// export const Character: GameComponent<State> = state => {
//     const { world } = state;
//     const resource = PIXI.Loader.shared.resources[TextureMap.Character];
//     const sprite = new PIXI.AnimatedSprite(
//         resource.spritesheet!.animations.idle
//     );
//     sprite.anchor = new PIXI.Point(0.5, 0.5);
//     sprite.x = world.character.x;
//     sprite.y = world.character.y;
//     sprite.scale = new PIXI.Point(1.5, 1.5);
//     sprite.play();
//     sprite.animationSpeed = 0.1;
//     return {
//         displayObject: sprite,
//         render,
//     };
// };
