import { handlePdfUpload } from "../pdf/handlePdfUpload";
import { setFinishBtn } from "./setFinishBtn";
import { DEFAULT_CARD_FORMAT_ID, DEFAULT_CARD_ORIENTATION } from "../card/cardFormats";
import { setCameraView } from "../camera/setCameraView";

export const resetButton = (card, camera, controls) => {
    const resetBtn = document.querySelector('[data-reset="reset"]');
    const file = null;

    const selects = document.querySelectorAll('.control-group__select');
    const inputs = document.querySelectorAll('.file-upload__input');

    resetBtn.addEventListener('click', () => {
        for (const side of ['front', 'back', 'frontUV', 'backUV', 'frontEmboss']) {
            handlePdfUpload(card, file, side);
        }

        selects.forEach((select) => {
            select.selectedIndex = 0;
        });

        card.setCardFormat({ formatId: DEFAULT_CARD_FORMAT_ID, orientation: DEFAULT_CARD_ORIENTATION });
        setCameraView(camera, controls, 'front');


        inputs.forEach((input) => {
            input.value = '';
            const changeEvent = new Event('change', { bubbles: true });
            input.dispatchEvent(changeEvent);
        });

        setFinishBtn('mat', 'none');
    });
};