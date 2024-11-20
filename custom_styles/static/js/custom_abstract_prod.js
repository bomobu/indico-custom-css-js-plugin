function initCA(isEdit = false) {
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
                    enableCustomAbstractFieldsBySelectValueCA(select.value, isEdit);
                    select.addEventListener('change', function () {
                        enableCustomAbstractFieldsBySelectValueCA(select.value, isEdit);
                    });
                }

                const selectNoC = document.getElementById('custom_52');
                if (!selectNoC) {
                    console.warn("No se encontró el elemento 'select Number of communicatios'");
                    return;
                } else {
                    const selectCT = document.getElementById('submitted_contrib_type');
                    const selectCTValue = Number(selectCT.value);
                    if (selectCT && selectCTValue == 2 && (selectNoC.options[selectNoC.selectedIndex].text == '' || selectNoC.options[selectNoC.selectedIndex].text == '4')) {
                        disableCustomNoCAbstractFieldsCA(isEdit);
                    }
                    selectNoC.addEventListener('change', function () {
                        enableCustomNoCAbstractFieldsBySelectValueCA(selectNoC.options[selectNoC.selectedIndex].text, isEdit);
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

function disableCustomAbstractFieldsCA(isEdit) {
    setEnabledOralPresentationCustomAbstractFieldsCA(false, isEdit);
    setEnabledSymposiumCustomAbstractFieldsCA(false, isEdit);
    setEnabledPosterCustomAbstractFieldsCA(false, isEdit);
    setEnabledWorkshopCustomAbstractFieldsCA(false, isEdit);
}

function disableCustomNoCAbstractFieldsCA(isEdit) {
    setEnabledNoC4CustomAbstractFieldsCA(true, isEdit);
    setEnabledNoC5CustomAbstractFieldsCA(false, isEdit);
    setEnabledNoC6CustomAbstractFieldsCA(false, isEdit);
}

function enableCustomNoCAbstractFieldsBySelectValueCA(value, isEdit) {
    const selectCT = document.getElementById('submitted_contrib_type');
    const selectCTValue = Number(selectCT.value);
    const selectValue = Number(value);
    if (selectCT && selectCTValue == 2) {
        disableCustomNoCAbstractFieldsCA(isEdit);
        if (selectValue == 4) {
            setEnabledNoC4CustomAbstractFieldsCA(true, isEdit);
        } else if (selectValue == 5) {
            setEnabledNoC4CustomAbstractFieldsCA(true, isEdit);
            setEnabledNoC5CustomAbstractFieldsCA(true, isEdit);
        } else if (selectValue == 6) {
            setEnabledNoC4CustomAbstractFieldsCA(true, isEdit);
            setEnabledNoC5CustomAbstractFieldsCA(true, isEdit);
            setEnabledNoC6CustomAbstractFieldsCA(true, isEdit);
        } else if (value == '') {
            disableCustomNoCAbstractFieldsCA(isEdit);
        }
    }
}

function enableCustomAbstractFieldsBySelectValueCA(value, isEdit = false) {
    disableCustomAbstractFieldsCA(isEdit);
    const selectValue = Number(value);
    if (selectValue == 1) { // Oral Presentation
        setEnabledOralPresentationCustomAbstractFieldsCA(true, isEdit);
    } else if (selectValue == 2) { // Symposium
        setEnabledSymposiumCustomAbstractFieldsCA(true, isEdit);
    } else if (selectValue == 3) { // Poster
        setEnabledPosterCustomAbstractFieldsCA(true, isEdit);
    } else if (selectValue == 4) { // Workshop
        setEnabledWorkshopCustomAbstractFieldsCA(true, isEdit);
    } else if (value == "__None") {
        disableCustomAbstractFieldsCA(isEdit);
    }
}

function setEnabledNoC4CustomAbstractFieldsCA(value, isEdit) {
    for (let i = 6; i <= 10; i++) {
        setDisplayAndInputCA(i, value, isEdit);
    }
    for (let i = 27; i <= 41; i++) {
        setDisplayAndInputCA(i, value, isEdit);
    }
}

function setEnabledNoC5CustomAbstractFieldsCA(value, isEdit) {
    for (let i = 42; i <= 46; i++) {
        setDisplayAndInputCA(i, value, isEdit);
    }
}

function setEnabledNoC6CustomAbstractFieldsCA(value, isEdit) {
    for (let i = 47; i <= 51; i++) {
        setDisplayAndInputCA(i, value, isEdit);
    }
}

function setEnabledOralPresentationCustomAbstractFieldsCA(value, isEdit) {
    for (let i = 11; i <= 15; i++) {
        setDisplayAndInputCA(i, value, isEdit);
    }
}

function setEnabledSymposiumCustomAbstractFieldsCA(value, isEdit) {
    for (let i = 1; i <= 10; i++) {
        setDisplayAndInputCA(i, value, isEdit);
    }
    for (let i = 27; i <= 52; i++) {
        setDisplayAndInputCA(i, value, isEdit);
    }
    const selectCT = document.getElementById('submitted_contrib_type');
    const selectNoC = document.getElementById('custom_52');
    const selectCTValue = Number(selectCT.value);

    if (selectCT && selectCTValue == 2 && (selectNoC.options[selectNoC.selectedIndex].text == '' || selectNoC.options[selectNoC.selectedIndex].text == '4')) {
        disableCustomNoCAbstractFieldsCA(isEdit);
    }
}

function setEnabledPosterCustomAbstractFieldsCA(value, isEdit) {
    for (let i = 16; i <= 20; i++) {
        setDisplayAndInputCA(i, value, isEdit);
    }
}

function setEnabledWorkshopCustomAbstractFieldsCA(value, isEdit) {
    for (let i = 21; i <= 26; i++) {
        setDisplayAndInputCA(i, value, isEdit);
    }
}

function setDisplayAndInputCA(id, value, isEdit) {
    const element = document.getElementById(`form-group-custom_${id}`);
    const input = document.getElementById(`custom_${id}`);

    if (element) {
        element.style.display = value ? 'block' : 'none';
    }
    if (input && !value && !isEdit) {
        input.value = '';
    }
}