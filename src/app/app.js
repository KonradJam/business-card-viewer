import { createSceneContainer } from '../scene/sceneContainer.js';

export const createApp = () => {
    const app = document.querySelector('#app');

    app.innerHTML = `
        <div class="app-shell">
            <header class="top-bar">
                <h1class="app-title">Business Card Viewew</h1>
            </header>

            <main class="workspace">
                <div id="scene-container"></div>

                <aside class="control-panel">
                    <label class="control-group">
                        <span class="control-label">Front image</span>
                        <input id="front-imagel-input" type="file" accept="image/*" />
                    </label>

                    <label class="control-group">
                        <span class="control-label">Back image</span>
                        <input id="back-image-input" type="file" accept="image/*" />
                    </label>
                </aside>
            </main>
        </div>
    `;

    createSceneContainer();
};