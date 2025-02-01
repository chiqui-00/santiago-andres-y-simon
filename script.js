// Función para manejar el inicio de sesión
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');

    // Validar la contraseña
    if (password === '1234') {
        // Ocultar el formulario de inicio de sesión
        document.getElementById('login-section').style.display = 'none';
        // Mostrar el contenido principal
        document.getElementById('main-content').style.display = 'block';
    } else {
        // Mostrar mensaje de error
        loginMessage.textContent = 'Contraseña incorrecta. Intenta de nuevo.';
    }
});

// Función para dividir el archivo (existente)
function splitFile() {
    const fileInput = document.getElementById('file-input');
    const linesPerFile = parseInt(document.getElementById('lines').value, 10);
    const fileList = document.getElementById('file-list');

    if (fileInput.files.length === 0) {
        alert("Por favor, selecciona un archivo TXT.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const text = event.target.result;
        const lines = text.split('\n');
        const totalFiles = Math.ceil(lines.length / linesPerFile);

        fileList.innerHTML = '';

        for (let i = 0; i < totalFiles; i++) {
            const start = i * linesPerFile;
            const end = start + linesPerFile;
            const chunk = lines.slice(start, end).join('\n');

            const blob = new Blob([chunk], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `parte-${i + 1}.txt`;
            link.textContent = `Descargar Parte ${i + 1}`;

            fileList.appendChild(link);
            fileList.appendChild(document.createElement('br'));
        }
    };

    reader.readAsText(file);
}