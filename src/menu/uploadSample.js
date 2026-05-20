import { uploadUvState } from "./uploadUvState";

export const uploadSample = (url, side) => {
    const input = document.querySelector(`#${side}-pdf-input`);
    const details = input.closest('.control-group');

    const wrapper = input.closest('.file-upload');
    const clearBtn = wrapper.querySelector('.file-upload__clear');
    const text = wrapper.querySelector('.file-upload__text');

    if (url) {
        text.textContent = url;
        clearBtn.classList.remove('file-upload__clear--hidden');
        details.open = true;
        if (side === 'frontUV' || side === 'backUV') uploadUvState[side] = true;
    } else {
        text.textContent = 'No file chosen';
        clearBtn.classList.add('file-upload__clear--hidden');
        details.open = false;
         if (side === 'frontUV' || side === 'backUV') uploadUvState[side] = false;
    }
};