import { SAMPLES } from '../../samples/samples.js';
import {
    CARD_FORMATS,
    CARD_ORIENTATION,
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../../card/cardFormats.js';
import { selectSection } from './selectSection.js';
import { uploadFile } from './uploadFile.js';
import { btnSection } from './btnSection.js';

export const sidebar = () => {
    const samplesOptions = '<option value="">Try a prepared example</option>' + SAMPLES.map((sample) => {
            return `<option value="${sample.id}">${sample.label} |
                ${Object.entries(sample.tags).map((tag) => {
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

    return /*html*/`
        <aside class="control-panel">

                ${selectSection('sample', 'Samples', samplesOptions)}
                <p class="control-panel__hint">
                    or upload your own files 
                </p>

            <hr class="divider">


                ${selectSection('card-format', 'Business card format', formatOptions)}
                ${selectSection('card-orientation', 'Orientation', orientationOptions)}
                <p class="control-panel__hint">
                    Changing the format updates the 3D object immediately. 
                </p>

            <hr class="divider">

                ${btnSection('position', ['front', 'back'])}

            <hr class="divider">

                ${uploadFile('front', 'Front PDF')}
                ${uploadFile('back', 'Back PDF')}

            <hr class="divider">

                ${uploadFile('frontUV', 'Front spot UV PDF')}
                ${uploadFile('backUV', 'Back spot UV PDF')}

            <hr class="divider">

                ${uploadFile('frontEmboss', 'Front emboss PDF')}

            <hr class="divider">

                ${btnSection('paper', ['mat', 'glossy'])}
                ${btnSection('foil', ['none', 'mat', 'glossy'])}

            <hr class="divider">

                ${btnSection('reset', ['reset'])}

        </aside>`
};