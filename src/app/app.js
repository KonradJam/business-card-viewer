import { createSceneContainer } from '../scene/sceneContainer.js';
import { SAMPLES } from '../samples/samples.js';
import {
    CARD_FORMATS,
    CARD_ORIENTATION,
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../card/cardFormats.js';
import { menu } from '../menu/menu.js';

export const createApp = () => {
    const app = document.querySelector('#app');

    const samplesOptions = SAMPLES.map((sample) => {
        return `<option value="${sample.id}">${sample.label} |
            ${sample.tags.map((tag) => {
                return tag[1] === false ? `-${tag[0]}` : `+${tag[1]}`;
            })}
        </option>`;
    }).join("");

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
                <h1 class="top-bar__title">Business Card Viewer</h1>
            </header>

            <main class="workspace">
                <div id="scene-container" class="workspace__scene"></div>
                <aside class="control-panel">

                <!-- ##### SAMPLE section START ##### -->

                    <fieldset class="control-group">
                        <legend class="control-group__legend">Samples</legend>
                        <select id="sample-select" class="control-group__select">
                            <option value="">Try a prepared example</option>
                            ${samplesOptions}
                        </select>
                    </fieldset>

                    <p class="control-panel__hint">
                       or upload your own files 
                    </p>

                <!-- ##### SAMPLE section STOP ##### -->

                <hr class="divider">

                <!-- ##### CARD section START ##### -->

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

                    <!-- ##### CARD section STOP ##### -->

                    <hr class="divider">

                    <!-- ##### CAMERA POSITION section START ##### -->

                    <fieldset class="control-group">
                        <legend class="control-group__legend">Position reset</legend>
                        <div class="btn-group">
                            <button type="button" class="btn-group__btn" data-position="front">Front</button>
                            <button type="button" class="btn-group__btn" data-position="back">Back</button>
                        </div>
                    </fieldset>

                    <!-- ##### CAMERA POSITION section STOP ##### -->

                    <hr class="divider">

                    <!-- ##### TEXTURE LOAD section START ##### -->

                    <details class="control-group" open>
                        <summary class="control-group__legend">Front PDF</summary>
                        <div class="file-upload">
                            <label for="front-pdf-input" class="file-upload__btn" aria-label="Choose file">Choose File</label>
                            <input id="front-pdf-input" class="file-upload__input" type="file" accept="application/pdf" />
                            <span class="file-upload__text">No file chosen</span>
                            <button type="button" class="file-upload__clear file-upload__clear--hidden" aria-label="Remove file">
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
                            <input id="back-pdf-input" class="file-upload__input" type="file" accept="application/pdf" />
                            <span class="file-upload__text">No file chosen</span>
                            <button type="button" class="file-upload__clear file-upload__clear--hidden" aria-label="Remove file">
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </details>

                    <!-- ##### TEXTURE LOAD section STOP ##### -->

                    <hr class="divider">

                    <!-- ##### TEXTURE UV LOAD section START ##### -->

                    <details class="control-group">
                        <summary class="control-group__legend">Front spot UV PDF</summary>
                        <div class="file-upload">
                            <label for="front-uv-pdf-input" class="file-upload__btn" aria-label="Choose file">Choose File</label>
                            <input class="file-upload__input" id="front-uv-pdf-input" type="file" accept="application/pdf" />
                            <span class="file-upload__text">No file chosen</span>
                            <button type="button" class="file-upload__clear file-upload__clear--hidden" aria-label="Remove file">
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
                            <input class="file-upload__input" id="back-uv-pdf-input" type="file" accept="application/pdf" />
                            <span class="file-upload__text">No file chosen</span>
                            <button type="button" class="file-upload__clear file-upload__clear--hidden" aria-label="Remove file">
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </details>

                    <!-- ##### TEXTURE UV LOAD section START ##### -->

                    <hr class="divider">

                    <!-- ##### TEXTURE EMBOSS LOAD section START ##### -->

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
                            <input class="file-upload__input" id="front-embossing-pdf-input" type="file" accept="application/pdf" />
                            <span class="file-upload__text">No file chosen</span>
                            <button type="button" class="file-upload__clear file-upload__clear--hidden" aria-label="Remove file">
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </details>

                    <!-- ##### TEXTURE EMBOS LOAD section STOP ##### -->

                    <hr class="divider">

                    <!-- ##### PAPER FOIL section START ##### -->

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

                    <!-- ##### PAPER FOIL section START ##### -->

                </aside>
            </main>
        </div>
    `;

    createSceneContainer();
    menu();
};