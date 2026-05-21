import { handlePdfUpload } from "../pdf/handlePdfUpload";
import { disable } from "./disableButtons";
import { setFinishBtn } from "./setFinishBtn";
import { uploadUvState } from "./uploadUvState";

export const uploadManager = (card) => {
    const setFileName = ((input, file) => {
        const wrapper = input.closest('.file-upload');
        const clearBtn = wrapper.querySelector('.file-upload__clear');
        const text = wrapper.querySelector('.file-upload__text');

        if (file) {
            const name = file?.name;
            text.textContent = name;
            clearBtn.classList.remove('file-upload__clear--hidden');
        } else {
            text.textContent = 'No file chosen';
            clearBtn.classList.add('file-upload__clear--hidden');
        }  
    });

    const uvState = (file, side) => {
        if (file) {
            uploadUvState[side] = true;
            setFinishBtn('mat', 'mat');
        } else {
            uploadUvState[side] = false;
        }
        disable();
    };

    const frontPdfInput = document.querySelector('#front-pdf-input');
    const backPdfInput = document.querySelector('#back-pdf-input');

    const frontUvPdfInput = document.querySelector('#frontUV-pdf-input');
    const backUvPdfInput = document.querySelector('#backUV-pdf-input');

    const frontEmbossPdfInput = document.querySelector('#frontEmboss-pdf-input');

    frontPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(card, file, 'front');
        setFileName(event.target, file);
    });
    
    backPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(card, file, 'back');
        setFileName(event.target, file);
    });
    
    frontUvPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(card, file, 'frontUV');
        uvState(file, 'frontUV');
        setFileName(event.target, file);
    });
    
    backUvPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(card, file, 'backUV');
        uvState(file, 'backUV');
        setFileName(event.target, file);
    });
    
    frontEmbossPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(card, file, 'frontEmboss');
        setFileName(event.target, file);
    });

    document.querySelectorAll('.file-upload__clear').forEach((clearBtn) => {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const wrapper = clearBtn.closest('.file-upload');
            const input = wrapper.querySelector('.file-upload__input');
            input.value = '';
            const changeEvent = new Event('change', { bubbles: true });
            input.dispatchEvent(changeEvent);
        });
    });
};
