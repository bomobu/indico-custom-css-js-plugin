// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Buscar un elemento cuyo id comience con 'submitted_contrib_type-'
    const element = document.querySelector('[id^="submitted_contrib_type-"]');

    // Verificar si se encontró el elemento
    if (element) {
        // Extraer el número del id utilizando una expresión regular
        const match = element.id.match(/^submitted_contrib_type-(\d+)$/);
        if (match) {
            const number = Number(match[1]);
            enableCustomAbstractFieldsBySelectValue(number);
        } else {
            console.warn('No se pudo extraer el número del id');
        }


    } else {
        console.warn('No se encontró ningún elemento cuyo id comience con "submitted_contrib_type-"');
    }
});

function enableCustomAbstractFieldsBySelectValue(value) {
    if (value == 1) { // Oral Presentation
        setEnabledOralPresentationCustomAbstractFields(true);
    } else if (value == 2) { // Symposium
        setEnabledSymposiumCustomAbstractFields(true);
    } else if (value == 3) { // Poster
        setEnabledPosterCustomAbstractFields(true);
    } else if (value == 4) { // Workshop
        setEnabledWorkshopCustomAbstractFields(true);
    }
}

function setEnabledOralPresentationCustomAbstractFields(value) {
    for (let i = 11; i <= 15; i++) {
        setDisplayAndInput(i, value);
    }
}

function setEnabledSymposiumCustomAbstractFields(value) {
    for (let i = 1; i <= 10; i++) {
        setDisplayAndInput(i, value);
    }
    for (let i = 27; i <= 52; i++) {
        setDisplayAndInput(i, value);
    }
    const selectCT = document.getElementById('submitted_contrib_type');
    const selectNoC = document.getElementById('custom_52');
    if (selectCT && selectCT.value == 2 && selectNoC.options[selectNoC.selectedIndex].text == '') {
        disableCustomNoCAbstractFields();
    }
}

function setEnabledPosterCustomAbstractFields(value) {
    for (let i = 16; i <= 20; i++) {
        setDisplayAndInput(i, value);
    }
}

function setEnabledWorkshopCustomAbstractFields(value) {
    for (let i = 21; i <= 26; i++) {
        setDisplayAndInput(i, value);
    }
}

function setDisplayAndInput(id, value) {
    const element = document.querySelector(`[id$="custom_${id}"]`);

    if (element) {
        element.style.display = value ? 'block' : 'none';
    }
}