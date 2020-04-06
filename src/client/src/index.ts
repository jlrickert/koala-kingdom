import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import {
    Game,
    GameComponent,
    // getCanvasEl,
    // createPixiApp,
    // loadPixiAssets,
    // initializeComponents,
} from "./framework";
import { scene, textureMap } from "./constants";
import { initState, GameState } from "./state";
import { Character } from "./components";
// import { createStore } from "./framework";
// import { resolvers, typeDefs } from "./resolvers";

document.onload = () => {
    var experimentalVariable = 5;
}

const initGame = async () => {
    // const canvasEl = getCanvasEl("game");
    // canvasEl.height = window.innerHeight;
    // canvasEl.width = window.innerWidth;

    // const cache = new InMemoryCache();
    // const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    //     cache,
    //     resolvers,
    //     typeDefs,
    // });

    // cache.writeData<GameState>({
    //     data: initState({}),
    // });

    const state = initState({});
    const character = new Character(state);
    const components: GameComponent[] = [character];

    const game = new Game({
        gameEl: document.getElementById("game-container")!,
        width: scene.Width,
        height: scene.Height,
        components,
        textureMap,
    });

    game.start();

    // const pixiApp = createPixiApp({
    //     gameEl: document.getElementById("game-container"),
    //     width: Scene.Width,
    //     height: Scene.Height,
    // });

    // const [_, level] = await Promise.all([
    //     loadPixiAssets(Textures),
    //     // import("./assets/character/adventurer.json"),
    // ]);

    // const initializer = initializeComponents(pixiApp, [Character], initState({}));

    // initializer();
};

initGame();
