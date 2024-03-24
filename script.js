//MUSICA
function toggleAudio() {
    var audio = document.getElementById('audio');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

//ARCHIVO TXT
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.formulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se recargue la página al enviar el formulario

        const nombre = document.querySelector('.input-text[type="text"]').value;
        const telefono = document.querySelector('.input-text[type="tel"]').value;
        const correo = document.querySelector('.input-text[type="email"]').value;
        const fechaHora = document.querySelector('.input-text[type="datetime-local"]').value;
        const productosSeleccionados = document.querySelectorAll('input[name="form-productos"]:checked');
        let productos = [];

        productosSeleccionados.forEach(function(producto) {
            productos.push(producto.value);
        });

        // Verificar que se llenen todos los campos
        if (!nombre || !telefono || !correo || !fechaHora || productos.length === 0) {
            alert('Por favor, completa todos los campos del formulario.');
            return; // Detener el proceso si no se llenan todos los campos
        }

        // Verificar que el teléfono tenga 10 dígitos
        if (telefono.length !== 10) {
            alert('El número de teléfono debe tener 10 dígitos.');
            return; // Detener el proceso si el teléfono no tiene 10 dígitos
        }

        // Verificar que el correo tenga "@"
        if (!correo.includes('@')) {
            alert('El correo electrónico debe contener el símbolo "@"');
            return; // Detener el proceso si el correo no contiene "@"
        }

        // Verificar que la fecha y hora no sea anterior a la actual
        const fechaActual = new Date();
        const fechaIngresada = new Date(fechaHora);
        if (fechaIngresada < fechaActual) {
            alert('La fecha y hora no puede ser anterior a la actual.');
            return; // Detener el proceso si la fecha y hora son anteriores a la actual
        }

        const datosPedido = {
            Nombre: nombre,
            Teléfono: telefono,
            Correo: correo,
            'Fecha y hora': fechaHora,
            Productos: productos.join(', ')
        };

        // Leer el historial anterior desde el almacenamiento local (localStorage)
        let historialPedidos = localStorage.getItem('historialPedidos');
        historialPedidos = historialPedidos ? historialPedidos : '';

        // Concatenar el nuevo pedido con el historial anterior
        const historialActualizado = historialPedidos + `Pedido:\n${JSON.stringify(datosPedido, null, 4)}\n\n`;

        // Guardar el historial actualizado en el almacenamiento local
        localStorage.setItem('historialPedidos', historialActualizado);

        // Descargar el historial como archivo de texto
        descargarHistorial(historialActualizado);
    });

    function descargarHistorial(historialActualizado) {
        const blob = new Blob([historialActualizado], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'pedidos.txt';
        link.click();

        URL.revokeObjectURL(url);
    }
});
