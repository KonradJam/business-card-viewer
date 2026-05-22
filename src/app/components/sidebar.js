import { SAMPLES } from '../../samples/samples.js';
import {
    CARD_FORMATS,
    CARD_ORIENTATION,
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../../card/cardFormats.js';
import { selectSection } from './selectSection.js';
import { hintSection } from './hintSection.js';
import { uploadFileSection } from './uploadFileSection.js';
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
                ${hintSection("or upload your own files")}

            <hr class="divider">

                ${selectSection('card-format', 'Business card format', formatOptions)}
                ${selectSection('card-orientation', 'Orientation', orientationOptions)}
                ${hintSection("Changing the format updates the 3D object immediately.")}

            <hr class="divider">

                ${btnSection('position', ['front', 'back'])}

            <hr class="divider">

                ${uploadFileSection('front', 'Front PDF')}
                ${uploadFileSection('back', 'Back PDF')}

            <hr class="divider">

                ${uploadFileSection('frontUV', 'Front spot UV PDF')}
                ${uploadFileSection('backUV', 'Back spot UV PDF')}

            <hr class="divider">

                ${uploadFileSection('frontEmboss', 'Front emboss PDF')}

            <hr class="divider">

                ${btnSection('paper', ['mat', 'glossy'])}
                ${btnSection('foil', ['none', 'mat', 'glossy'])}

            <hr class="divider">

                ${btnSection('reset', ['reset'])}

        </aside>`
};