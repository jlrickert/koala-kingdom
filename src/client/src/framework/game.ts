import * as PIXI from "pixi.js";

type TextureMap = { [key: string]: string };

export type DisplayObject = PIXI.DisplayObject;
export abstract class GameComponent {
    abstract mount(): DisplayObject;
    abstract render(sprite: DisplayObject): void;
}

export type GameProps = {
    gameEl: HTMLElement;
    components: GameComponent[];
    textureMap: TextureMap;
    width: number;
    height: number;
    // state: T;
}

export class Game {
    private app: PIXI.Application;
    private gameEl: HTMLElement;
    private viewEl: HTMLCanvasElement;
    private components: GameComponent[];
    private textureMap: TextureMap;
    private texturesLoaded: boolean;
    private rootContainer: PIXI.Container;
    public readonly width: number;
    public readonly height: number;
    constructor(props: GameProps) {
        this.width = props.width;
        this.height = props.height;
        this.gameEl = props.gameEl;
        this.components = props.components;
        this.textureMap = props.textureMap;
        this.texturesLoaded = false;
        this.app = new PIXI.Application({
            width: props.width,
            height: props.height,
        });
        this.viewEl = this.app.view;
        console.log(this.viewEl);
        this.gameEl.appendChild(this.viewEl);

        this.rootContainer = new PIXI.Container();
        this.components.forEach(component => {
            const displayObject = component.mount();
            this.rootContainer.addChild(displayObject);
            this.app.ticker.add(() => {
                component.render(displayObject);
            });
        });
    }

    public async start() {
        await this.loadAssets(this.textureMap);
        this.app.stage.addChild(this.rootContainer);
        this.app.renderer.render(this.app.stage);
    }

    private async loadAssets(textureMap: TextureMap) {
        return new Promise(resolve => {
            if (this.texturesLoaded) {
                PIXI.Loader.shared.add(
                    Object.keys(textureMap).map(
                        (key: keyof typeof textureMap) => textureMap[key]
                    )
                );
                PIXI.Loader.shared.load(resolve);
            }
        });
    }
}

/**
 * SPIKE: Currently updating the object is done in the render function.  This is
 * fine for now.  Need to figure out how to separate this out.
 */
// export type UpdateFn<LocalState> = (state: LocalState): void;
// export type UpdateFn<T> = (state: T) => T;
// export type MapStateToPropsFn
// export type MapStateToDispatchFn

// export type GameComponent<GlobalState> = (
//     state: GlobalState
// ) => {
//     displayObject: PIXI.DisplayObject;
//     render: RenderFn<GlobalState>;
// };

// /**
//  * Initializes game components.
//  *
//  * @param app instance of Pixi Application
//  * @param components array of game components
//  * @param store game state storage
//  */
// export const initializeComponents = <T>(
//     app: PIXI.Application,
//     components: GameComponent<T>[],
//     // store: Store<T>
//     state: T
// ) => {
//     const container = new PIXI.Container();
//     components.forEach(component => {
//         const cmp = component(state);
//         container.addChild(cmp.displayObject);
//         app.ticker.add(() => {
//             cmp.render(cmp.displayObject, state);
//         });
//     });

//     return () => {
//         app.stage.addChild(container);
//         app.renderer.render(app.stage);
//     };
// };

// /**
//  * Gets canvas element from DOM.
//  * Throws error in case it cannot be found.
//  *
//  * @param id id of canvas element
//  */
// export const getCanvasEl = (id: string) => {
//     const canvas = document.getElementById(id) as HTMLCanvasElement | null;
//     if (!canvas) {
//         throw new Error(`Canvas with specified id ${id} not found.`);
//     }
//     return canvas;
// };

// /**
//  * Gets instance of PIXI Application.
//  *
//  * @param config initial config
//  */
// export const createPixiApp = (config: AppConfig) => {
//     const app = new PIXI.Application({});
//     const view = config.gameEl.appendChild(app.view);
//     return app;
// };

// /**
//  * Promisified version of PIXI Loader.
//  * Loads all required assets.
//  *
//  * @param textures map of textures to their paths
//  */
// export const loadPixiAssets = (textures: { [key: string]: string }) => {
//     return new Promise(resolve => {
//         PIXI.Loader.shared.add(
//             Object.keys(textures).map(
//                 (key: keyof typeof textures) => textures[key]
//             )
//         );
//         PIXI.Loader.shared.load(resolve);
//     });
// };
