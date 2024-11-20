function init() {
    // Crear un MutationObserver para observar cambios en el DOM
    const observer = new MutationObserver((mutationsList, observer) => {
        try {
            // Buscar el div con las clases específicas
            const dialog = document.querySelector('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable');

            // Verificar si el dialog ya está visible
            if (dialog && dialog.style.display !== 'none') {
                // Intentar acceder al select y obtener su valor
                const formGroup = document.getElementById('form-group-submitted_contrib_type');
                if (!formGroup) {
                    console.warn("No se encontró el elemento con id 'form-group-submitted_contrib_type'");
                    return;
                }

                const formField = formGroup.querySelector('.form-field');
                if (!formField) {
                    console.warn("No se encontró el elemento con clase 'form-field'");
                    return;
                }

                const select = formField.querySelector('select');
                if (!select) {
                    console.warn("No se encontró el elemento 'select'");
                    return;
                } else {
                    if (select.value == "__None") {
                        disableCustomAbstractFields();
                    }
                    select.addEventListener('change', function () {
                        enableCustomAbstractFieldsBySelectValue(select.value);
                    });
                }

                const selectNoC = document.getElementById('custom_52');
                if (!selectNoC) {
                    console.warn("No se encontró el elemento 'select Number of communicatios'");
                    return;
                } else {
                    const selectCT = document.getElementById('submitted_contrib_type');
                    if (selectCT && selectCT.value == 2 && selectNoC.options[selectNoC.selectedIndex].text == '') {
                        disableCustomNoCAbstractFields();
                    }
                    selectNoC.addEventListener('change', function () {
                        enableCustomNoCAbstractFieldsBySelectValue(selectNoC.options[selectNoC.selectedIndex].text);
                    });
                }


                // Detener el observer después de haber ejecutado la acción
                observer.disconnect();
            }
        } catch (error) {
            // Capturar cualquier error que ocurra dentro del observer y manejarlo
            console.error("Error al intentar obtener el valor seleccionado: ", error);
        }
    });

    // Configuración del observer para observar cambios en el DOM
    const config = { childList: true, subtree: true, attributes: true };

    // Comienza a observar el cuerpo del documento
    observer.observe(document.body, config);
}

function disableCustomAbstractFields() {
    setEnabledOralPresentationCustomAbstractFields(false);
    setEnabledSymposiumCustomAbstractFields(false);
    setEnabledPosterCustomAbstractFields(false);
    setEnabledWorkshopCustomAbstractFields(false);
}

function disableCustomNoCAbstractFields() {
    setEnabledNoC4CustomAbstractFields(true);
    setEnabledNoC5CustomAbstractFields(false);
    setEnabledNoC6CustomAbstractFields(false);
}

function enableCustomNoCAbstractFieldsBySelectValue(value) {
    const selectCT = document.getElementById('submitted_contrib_type');
    if (selectCT && selectCT.value == 2) {
        if (value == '4') {
            setEnabledNoC4CustomAbstractFields(true);
        } else if (value == '5') {
            setEnabledNoC5CustomAbstractFields(true);
        } else if (value == '6') {
            setEnabledNoC6CustomAbstractFields(true);
        } else if (value == '') {
            disableCustomNoCAbstractFields();
        }
    }
}

function enableCustomAbstractFieldsBySelectValue(value) {
    disableCustomAbstractFields();
    if (value == 1) { // Oral Presentation
        setEnabledOralPresentationCustomAbstractFields(true);
    } else if (value == 2) { // Symposium
        setEnabledSymposiumCustomAbstractFields(true);
    } else if (value == 3) { // Poster
        setEnabledPosterCustomAbstractFields(true);
    } else if (value == 4) { // Workshop
        setEnabledWorkshopCustomAbstractFields(true);
    } else if (value == "__None") {
        disableCustomAbstractFields();
    }
}

function setEnabledNoC4CustomAbstractFields(value) {
    for (let i = 6; i <= 10; i++) {
        setDisplayAndInput(i, value);
    }
    for (let i = 27; i <= 41; i++) {
        setDisplayAndInput(i, value);
    }
}

function setEnabledNoC5CustomAbstractFields(value) {
    for (let i = 42; i <= 46; i++) {
        setDisplayAndInput(i, value);
    }
}

function setEnabledNoC6CustomAbstractFields(value) {
    for (let i = 47; i <= 51; i++) {
        setDisplayAndInput(i, value);
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
    const element = document.querySelector(`[id$="-custom_${id}"]`);
    const input = document.getElementById(`custom_${id}`);

    if (element) {
        element.style.display = value ? 'block' : 'none';
    }
    if (input && !value) {
        input.value = '';
    }
}