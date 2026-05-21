import { handlePdfUpload } from "../pdf/handlePdfUpload";
import { SAMPLES } from "../samples/samples";
import { uploadSample } from "./uploadSample";
import { setFinishBtn } from "./setFinishBtn";
import { disable } from "./disableButtons";

export const selectSample = (card) => {
    const sampleSelect = document.querySelector('#sample-select');

    sampleSelect.addEventListener('change', async (event) => {
        const index = event.target.value;

        if (index) { 
            for (const [key, val] of Object.entries(SAMPLES[index].files)) {
                handlePdfUpload(card, val, key);
                uploadSample(val, key);
            }
            const paper = SAMPLES[index].tags.paper;
            const foil = SAMPLES[index].tags.foil;

            card.updateCardFinish(paper, foil || 'none');
            setFinishBtn(paper, foil || 'none');

            disable();
        }
    });
};