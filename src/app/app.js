import { createSceneContainer } from '../scene/sceneContainer.js';

export const createApp = () => {
    const app = document.querySelector('#app');

    app.innerHTML = `
        <div class="app-shell">
            <header class="top-bar">
                <h1class="app-title">Business Card Viewew</h1>
            </header>
            <main class="viewport">
                <div id="scene-container"></div>
            </main>
        </div>
    `;

    createSceneContainer();
};