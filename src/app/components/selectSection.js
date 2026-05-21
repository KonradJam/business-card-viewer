export const selectSection = (section, legend, options) => {
    return /*html*/`
        <fieldset class="control-group">
            <legend class="control-group__legend">${legend}</legend>
            <select id="${section}-select" class="control-group__select">
                ${options}
            </select>
        </fieldset>
    `;
};