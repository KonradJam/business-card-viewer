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
        <div class="app">
            <header class="top-bar">
                <h1 class="top-bar__title">Business Card Viewew</h1>
            </header>

            <main class="workspace">
                <div id="scene-container" class="workspace__scene"></div>

                <aside class="control-panel">
                    <fieldset class="control-group">
                        <legend class="control-group__legend">Business card format</legend>
                        <select id="card-format-select" class="control-group__select">
                            ${formatOptions}
                        </select>
                    </fieldset>

                    <fieldset class="control-group">
                        <legend class="control-group__legend">Orientation</legend>
                        <select id="card-orientation-select" class="control-group__select">
                            ${orientationOptions}
                        </select>
                    </fieldset>

                    <p class="control-panel__hint">
                       Changing the format updates the 3D object immediately. 
                    </p>

                    <hr class="divider">

                    <fieldset class="control-group">
                        <legend class="control-group__legend">Position reset</legend>
                        <div class="btn-group">
                            <button type="button" class="btn-group__btn" data-position="front">Front</button>
                            <button type="button" class="btn-group__btn" data-position="back">Back</button>
                        </div>
                    </fieldset>

                    <hr class="divider">

                    <details class="control-group" open>
                        <summary class="control-group__legend">Front PDF</summary>
                        <div class="file-upload">
                            <label for="front-pdf-input" class="file-upload__btn" aria-label="Choose file">Choose File</label>
                            <span class="file-upload__text">No file chosen</span>
                            <input id="front-pdf-input" class="file-upload__input" type="file" accept="application/pdf" />
                            <button type="button" class="file-upload__clear" aria-label="Remove file" hidden>
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </details>

                    <details class="control-group">
                        <summary class="control-group__legend">Back PDF</summary>
                        <div class="file-upload">
                            <label for="back-pdf-input" class="file-upload__btn" aria-label="Choose file">Choose File</label>
                            <span class="file-upload__text">No file chosen</span>
                            <input id="back-pdf-input" class="file-upload__input" type="file" accept="application/pdf" />
                            <button type="button" class="file-upload__clear" aria-label="Remove file" hidden>
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </details>

                    <hr class="divider">

                    <details class="control-group">
                        <summary class="control-group__legend">Front spot UV PDF</summary>
                        <div class="file-upload">
                            <label for="front-uv-pdf-input" class="file-upload__btn" aria-label="Choose file">Choose File</label>
                            <span class="file-upload__text">No file chosen</span>
                            <input class="file-upload__input" id="front-uv-pdf-input" type="file" accept="application/pdf" />
                            <button type="button" class="file-upload__clear" aria-label="Remove file" hidden>
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </details>

                    <details class="control-group">
                        <summary class="control-group__legend">Back spot UV PDF</summary>
                        <div class="file-upload">
                            <label for="back-uv-pdf-input" class="file-upload__btn" aria-label="Choose file">Choose File</label>
                            <span class="file-upload__text">No file chosen</span>
                            <input class="file-upload__input" id="back-uv-pdf-input" type="file" accept="application/pdf" />
                            <button type="button" class="file-upload__clear" aria-label="Remove file" hidden>
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </details>

                    <hr class="divider">

                    <details class="control-group">
                        <summary class="control-group__legend">Front emboss PDF</summary>
                        <label class="toggle">
                            <span class="toggle__label">Debossing</span>
                            <input id="toggle-input-embossing-front" type="checkbox" role="switch" class="toggle__input">
                            <span class="toggle__slider"></span>
                            <span class="toggle__label">Embossing</span>
                        </label>
                        <div class="file-upload">
                            <label for="front-embossing-pdf-input" class="file-upload__btn" aria-label="Choose file">Choose File</label>
                            <span class="file-upload__text">No file chosen</span>
                            <input class="file-upload__input" id="front-embossing-pdf-input" type="file" accept="application/pdf" />
                            <button type="button" class="file-upload__clear" aria-label="Remove file" hidden>
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </details>

                    <hr class="divider">

                    <fieldset class="control-group" data-control="paper">
                        <legend class="control-group__legend">Paper</legend>
                        <div class="btn-group">
                            <button type="button" class="btn-group__btn btn-group__btn--active" data-paper="mat">Mat</button>
                            <button type="button" class="btn-group__btn" data-paper="glossy">Glossy</button>
                        </div>
                    </fieldset>

                    <fieldset class="control-group" data-control="foil">
                        <legend class="control-group__legend">Foil</legend>
                        <div class="btn-group">
                            <button type="button" class="btn-group__btn btn-group__btn--active" data-foil="none">None</button>
                            <button type="button" class="btn-group__btn" data-foil="mat">Mat</button>
                            <button type="button" class="btn-group__btn" data-foil="glossy">Glossy</button>
                        </div>
                    </fieldset>
                </aside>
            </main>
        </div>
    `;

    createSceneContainer();
    menu();
};