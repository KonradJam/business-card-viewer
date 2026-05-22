export const showMenu = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const menu = document.querySelector('#menu');
    
        if (menu && typeof menu.showPopover === 'function') {
            menu.showPopover();
        }
    });
};