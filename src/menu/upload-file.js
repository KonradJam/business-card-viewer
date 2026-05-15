export const uploadFile = () => {
    const inputFile = document.querySelectorAll('.file-upload__input');
    
    inputFile.forEach((input) => {
        const wrapper = input.closest('.file-upload');
        const clearBtn = wrapper.querySelector('.file-upload__clear');
        const text = wrapper.querySelector('.file-upload__text');
        
        input.addEventListener('change', (e) => {
            const currentInput = e.target;
            const file = currentInput.files[0];
          
            if (file) {
                const name = file?.name;
                text.textContent = name;
                clearBtn.classList.remove('file-upload__clear--hidden');
            } else {
                text.textContent = 'No file chosen';
                clearBtn.classList.add('file-upload__clear--hidden');
            }  
        });

        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            input.value = '';
            const changeEvent = new Event('change', { bubbles: true });
            input.dispatchEvent(changeEvent);
        });
    });
};
