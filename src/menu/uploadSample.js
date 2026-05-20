export const uploadSample = (url, side) => {
    const input = document.querySelector(`#${side}-pdf-input`);

    const wrapper = input.closest('.file-upload');
    const clearBtn = wrapper.querySelector('.file-upload__clear');
    const text = wrapper.querySelector('.file-upload__text');
    
    text.textContent = url;
    clearBtn.classList.remove('file-upload__clear--hidden');
};