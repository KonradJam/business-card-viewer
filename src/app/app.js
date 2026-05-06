import { createSceneContainer } from '../scene/sceneContainer.js';
import {
    CARD_FORMATS,
    CARD_ORIENTATION,
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../card/cardFormats.js';
import { menu } from '../menu/menu.js';


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
                        <legend class="control-legend">Business card format</legend>
                        <select id="card-format-select" class="control-select">
                            ${formatOptions}
                        </select>
                    </fieldset>

                    <fieldset class="control-group">
                        <legend class="control-legend">Orientation</legend>
                        <select id="card-orientation-select" class="control-select">
                            ${orientationOptions}
                        </select>
                    </fieldset>

                    <p class="control-hint">
                       Changing the format updates the 3D object immediately. 
                    </p>

                    <hr class="divider">

                    <fieldset class="control-group">
                        <legend class="control-legend">Position reset</legend>
                        <div class="btn-group">
                            <button type="button" data-position="front">Front</button>
                            <button type="button" data-position="back">Back</button>
                        </div>
                    </fieldset>

                    <hr class="divider">

                    <details class="control-group" open>
                        <summary class="control-legend">Front PDF</summary>
                        <div class="control-select control-upload">
                            <label for="front-pdf-input" class="upload-btn" aria-label="Choose file">Choose File</label>
                            <span class="upload-text">No file chosen</span>
                            <input id="front-pdf-input" type="file" accept="application/pdf" />
                        </div>
                    </details>

                    <details class="control-group">
                        <summary class="control-legend">Back PDF</summary>
                        <div class="control-select control-upload">
                            <label for="back-pdf-input" class="upload-btn" aria-label="Choose file">Choose File</label>
                            <span class="upload-text">No file chosen</span>
                            <input id="back-pdf-input" type="file" accept="application/pdf" />
                        </div>
                    </details>

                    <hr class="divider">

                    <details class="control-group">
                        <summary class="control-legend">Front spot UV PDF</summary>
                        <div class="control-select control-upload">
                            <label for="front-uv-pdf-input" class="upload-btn" aria-label="Choose file">Choose File</label>
                            <span class="upload-text">No file chosen</span>
                            <input id="front-uv-pdf-input" type="file" accept="application/pdf" />
                        </div>
                    </details>

                    <details class="control-group">
                        <summary class="control-legend">Back spot UV PDF</summary>
                        <div class="control-select control-upload">
                            <label for="back-uv-pdf-input" class="upload-btn" aria-label="Choose file">Choose File</label>
                            <span class="upload-text">No file chosen</span>
                            <input id="back-uv-pdf-input" type="file" accept="application/pdf" />
                        <div>
                    </details>

                    <hr class="divider">

                    <fieldset class="control-group" data-control="paper">
                        <summary class="control-legend">Paper</summary>
                        <div class="btn-group">
                            <button type="button" data-paper="mat" class="is-active">Mat</button>
                            <button type="button" data-paper="glossy">Glossy</button>
                        </div>
                    </fieldset>

                    <fieldset class="control-group" data-control="foil">
                        <legend class="control-legend">Foil</legend>
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
    menu();
};