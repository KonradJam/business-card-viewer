export const setupResizerHandler = ({ container, camera, renderer }) => {
    const handleResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
        window.removeEventListener('resize', handleResize);
    };
};