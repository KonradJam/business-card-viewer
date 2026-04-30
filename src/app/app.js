import { createSceneContainer } from '../scene/sceneContainer.js';
import {
    CARD_FORMATS,
    CARD_ORIENTATION,
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../card/cardFormats.js';


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
                <h1 class="app-title">Business Card Viewew</h1>
            </header>

            <main class="workspace">
                <div id="scene-container"></div>

                <aside class="control-panel">
                    <fieldset class="control-group">
                        <legend class="control-label">Business card format</legend>
                        <select id="card-format-select" class="control-select">
                            ${formatOptions}
                        </select>
                    </fieldset>

                    <fieldset class="control-group">
                        <legend class="control-label">Orientation</legend>
                        <select id="card-orientation-select" class="control-select">
                            ${orientationOptions}
                        </select>
                    </fieldset>

                    <p class="control-hint">
                       Changing the format updates the 3D object immediately. 
                    </p>

                    <fieldset class="control-group">
                        <legend class="control-label">Position reset</legend>
                        <div class="btn-group">
                            <button type="button" data-position="front">Front</button>
                            <button type="button" data-position="back">Back</button>
                        </div>
                    </fieldset>

                    <fieldset class="control-group">
                        <legend class="control-label">Front PDF</legend>
                        <input id="front-pdf-input" type="file" accept="application/pdf" />
                    </fieldset>

                    <fieldset class="control-group">
                        <legend class="control-label">Back PDF</legend>
                        <input id="back-pdf-input" type="file" accept="application/pdf" />
                    </fieldset>

                    <fieldset class="control-group" data-control="paper">
                        <legend class="control-label">Paper</legend>
                        <div class="btn-group">
                            <button type="button" data-paper="mat" class="is-active">Mat</button>
                            <button type="button" data-paper="glossy">Glossy</button>
                        </div>
                    </fieldset>

                    <fieldset class="control-group" data-control="foil">
                        <legend class="control-label">Foil</legend>
                        <div class="btn-group">
                            <button type="button" data-foil="none" class="is-active">None</button>
                            <button type="button" data-foil="mat">Mat</button>
                            <button type="button" data-foil="glossy">Glossy</button>
                        </div>
                    </fieldset>
                </aside>
            </main>
        </div>
    `;

    createSceneContainer();
};