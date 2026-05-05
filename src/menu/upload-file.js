export const uploadFile = () => {
    const inputFile = document.querySelectorAll('input[type="file"]');
    
    inputFile.forEach((input) => {
        input.addEventListener('change', (e) => {
            const currentInput = e.target;
            
            const wrapper = currentInput.closest('.control-upload');
            const text = wrapper.querySelector('.upload-text');
            
            const name = currentInput.files[0]?.name || 'No file chosen';
            text.textContent = name;
        });
    });
};
