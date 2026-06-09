import { createSceneContainer } from '../scene/createSceneContainer.js';
import { initMenu } from '../menu/initMenu.js';
import { sidebar } from './components/sidebar.js';
import { recorderSection } from './components/recorderSextion.js';

export const createApp = () => {
    const app = document.querySelector('#app');

    app.innerHTML = /*html*/ `
        <div class="app">
            <header class="top-bar">
                <h1 class="top-bar__title">Business Card Viewer</h1>

                <button class="hamburger" popovertarget="menu" aria-label="Open nav menu">
                    <span aria-hidden="true">☰</span>
                </button>
            </header>

            <main class="workspace">
                <div id="scene-container" class="workspace__scene"></div>
                ${sidebar()}
                ${recorderSection()}
            </main>
        </div>
    `;

    const sceneObjects = createSceneContainer();
    initMenu(sceneObjects);
};