document.addEventListener("DOMContentLoaded", () => {
    // Obtén las referencias de los campos de entrada y el botón
    const identifierInput = document.getElementById("identifier");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector(".i-button.login-form-button");

    // Verifica si los elementos existen en la página
    if (identifierInput && passwordInput && loginButton) {
        // Función para verificar si los campos están llenos
        const checkFields = () => {
            if (identifierInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
                // Si ambos campos están llenos, agrega la clase habilitada
                loginButton.classList.add("button-custom-enabled");
                loginButton.classList.remove("button-custom-disabled");
            } else {
                // Si uno o ambos campos están vacíos, agrega la clase deshabilitada
                loginButton.classList.add("button-custom-disabled");
                loginButton.classList.remove("button-custom-enabled");
            }
        };

        // Agrega eventos a los campos para ejecutar la verificación al escribir
        identifierInput.addEventListener("input", checkFields);
        passwordInput.addEventListener("input", checkFields);

        // Realiza una verificación inicial
        checkFields();
    } else {
        console.warn("No se encontraron los elementos necesarios en la página de login.");
    }
});
