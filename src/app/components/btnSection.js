export const btnSection = (dataName, data) => {
    const paperOrFoil = ['paper', 'foil'].includes(dataName);

    const capitalized = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
    

    return /*html*/`
    <fieldset class="control-group" ${paperOrFoil ? 'data-control=' + dataName : '' } >
        <legend class="control-group__legend" ${dataName === 'reset' ? 'hidden' : ''}>${capitalized(dataName)}</legend>
        <div class="btn-group">
            ${data.map((val, i) => {
                return `<button type="button" class="btn-group__btn ${paperOrFoil && i === 0 ? 'btn-group__btn--active' : ''}" data-${dataName}="${val}">${capitalized(val)}</button>`
            }).join('')}
        </div>
    </fieldset>
    `
};