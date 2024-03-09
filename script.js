// proyecto/script.js

document.addEventListener('DOMContentLoaded', function () {
    // Obtener la lista de usuarios al cargar la página
    fetch('/api/usuarios')
      .then(response => response.json())
      .then(data => {
        // Manejar los datos recibidos
        const usuariosContainer = document.getElementById('usuarios-container');
  
        // Limpiar el contenedor antes de agregar nuevos elementos
        usuariosContainer.innerHTML = '';
  
        // Iterar sobre los usuarios y agregarlos al contenedor
        data.forEach(usuario => {
          const usuarioElement = document.createElement('div');
          usuarioElement.innerHTML = `<p>${usuario.nombre} - ${usuario.email}</p>`;
          usuariosContainer.appendChild(usuarioElement);
        });
      })
      .catch(error => console.error('Error al obtener usuarios:', error));
  });
  