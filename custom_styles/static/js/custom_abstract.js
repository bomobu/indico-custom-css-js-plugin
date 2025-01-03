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
    const element = document.querySelector('[id$="custom_13"]');

    // Verificar si el elemento existe y deshabilitarlo
    if (element) {
        element.style.display = 'none';
    }
}

function enableCustomAbstractFieldsBySelectValue(value) {
    if (value == 3) {
        const element = document.querySelector('[id$="custom_13"]');

        // Verificar si el elemento existe y deshabilitarlo
        if (element) {
            element.style.display = 'block';
        }
    } else if (value == "__None") {
        disableCustomAbstractFields();
    }
}