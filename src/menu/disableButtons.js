import { uploadUvState } from "./uploadUvState";

export const disableButtons = () => {
    const uvInput = document.querySelectorAll('input[id*="UV"]');
    
    uvInput.forEach((input) => {
        input.addEventListener('change', (e) => {
            disable();
        });
    });

};

export const disable = () => {
    const paperFoilBtns = document.querySelectorAll('button[data-paper], button[data-foil]');

    paperFoilBtns.forEach((btn) => {
        if (uploadUvState.frontUV || uploadUvState.backUV) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
     });
};