export const disableButtons = () => {
    const uvInput = document.querySelectorAll('.uv-pdf-input');
    const paperFoilBtns = document.querySelectorAll('button[data-paper], button[data-foil]');
    const uvFilesUploaded = [false, false];

    uvInput.forEach((input) => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];

            if (input.id.includes('front-uv')) {
                uvFilesUploaded[0] = file ? true : false;
                disable();
            } else {
                uvFilesUploaded[1] = file ? true : false;
                disable();
            }
        });
    });

    const disable = () => {
        paperFoilBtns.forEach((btn) => {
            if (uvFilesUploaded.some(up => up === true)) {
                btn.disabled = true;
                console.log('tak')
            } else {
                btn.disabled = false;
            }
         });
    };
};