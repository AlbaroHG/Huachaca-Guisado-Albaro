document.addEventListener('DOMContentLoaded', () => {

    const slides  = document.querySelectorAll('.slide');
    const puntos  = document.querySelectorAll('.punto');
    let indiceActual = 0;
    const totalSlides = slides.length;
    let intervalo;

    function mostrarSlide(indice) {
        slides.forEach((s, i) => s.classList.toggle('activo', i === indice));
        puntos.forEach((p, i) => p.classList.toggle('activo', i === indice));
        indiceActual = indice;
    }

    function siguienteSlide() {
        const siguiente = (indiceActual + 1) % totalSlides;
        mostrarSlide(siguiente);
    }

    function iniciarAuto() {
        intervalo = setInterval(siguienteSlide, 4000);
    }

    function detenerAuto() {
        clearInterval(intervalo);
    }

    // Clic en la paginación
    puntos.forEach((punto, i) => {
        punto.addEventListener('click', () => {
            detenerAuto();
            mostrarSlide(i);
            iniciarAuto();
        });
    });

    iniciarAuto();


    const form = document.getElementById('formRegistro');
    const mensaje = document.getElementById('mensaje');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); 

       
        const datos = {
            nombre:   document.getElementById('nombre').value.trim(),
            correo:   document.getElementById('correo').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            fecha:    new Date().toLocaleString()
        };

       
        if (!datos.nombre || !datos.correo || !datos.telefono) {
            mensaje.textContent = '⚠️ Todos los campos son obligatorios.';
            mensaje.style.color = '#d32f2f';
            return;
        }

        
        let registros = JSON.parse(localStorage.getItem('registros')) || [];

        
        registros.push(datos);

       
        localStorage.setItem('registros', JSON.stringify(registros));

       
        mensaje.textContent = '✅ ¡Registro guardado correctamente!';
        mensaje.style.color = '#2e7d32';

        
        form.reset();

        console.log('Registros en localStorage:', registros);
    });

});