import { createSceneContainer } from '../scene/sceneContainer.js';
import {
    CARD_FORMATS,
    CARD_ORIENTATION,
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../config/cardFormats.js';


export const createApp = () => {
    const app = document.querySelector('#app');

    const formatOptions = CARD_FORMATS.map((format) => {
        return `<option value="${format.id}" ${format.id === DEFAULT_CARD_FORMAT_ID ? "selected" : ""}>
            ${format.label}</option>`;
    }).join("");

    const orientationOptions = CARD_ORIENTATION.map((orientation) => {
        return `<option value="${orientation.id}" ${orientation.id === DEFAULT_CARD_ORIENTATION ? "selected" : ""}>
            ${orientation.label}</option>`;
    }).join("");

    app.innerHTML = `
        <div class="app-shell">
            <header class="top-bar">
                <h1class="app-title">Business Card Viewew</h1>
            </header>

            <main class="workspace">
                <div id="scene-container"></div>

                <aside class="control-panel">
                    <label class="control-group">
                        <span class="control-label">Business card format</span>
                        <select id="card-format-select" class="control-select">
                            ${formatOptions}
                        </select>
                    </label>

                    <label class="control-group">
                        <span class="control-label">Orientation</span>
                        <select id="card-orientation-select" class="control-select">
                            ${orientationOptions}
                        </select>
                    </label>

                    <p class="control-hint">
                       Changing the format updates the 3D object immediately. 
                    </p>

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