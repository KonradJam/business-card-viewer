export const uploadFile = () => {
    const inputFile = document.querySelectorAll('input[type="file"]');
    
    inputFile.forEach((input) => {
        const wrapper = input.closest('.control-upload');
        const clearBtn = wrapper.querySelector('.clear-file-btn');
        const text = wrapper.querySelector('.upload-text');
        
        input.addEventListener('change', (e) => {
            const currentInput = e.target;
            const file = currentInput.files[0];
          
            if (file) {
                const name = currentInput.files[0]?.name;
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
