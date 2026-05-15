export const uploadFile = () => {
    const inputFile = document.querySelectorAll('input[type="file"]');
    
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
                clearBtn.hidden = false;
            } else {
                text.textContent = 'No file chosen';
                clearBtn.hidden = true;
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
