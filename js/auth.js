// Manejo de formularios de autenticación

// Formulario de registro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validaciones básicas
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        // Aquí iría la conexión con la base de datos
        // Por ahora, solo simulamos el registro
        const userData = {
            name,
            email,
            phone,
            password
        };
        
        // Guardar en localStorage (simulación)
        localStorage.setItem('user', JSON.stringify(userData));
        
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'login.html';
    });
}

// Formulario de login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Verificar credenciales (simulación)
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
            const user = JSON.parse(storedUser);
            
            if (user.email === email && user.password === password) {
                // Guardar sesión
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                
                alert('Inicio de sesión exitoso');
                window.location.href = 'pedidos.html';
            } else {
                alert('Credenciales incorrectas');
            }
        } else {
            alert('No existe una cuenta con ese correo electrónico');
        }
    });
}

// Verificar si el usuario está logueado
function checkAuth() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const currentPath = window.location.pathname;
    
    // Si el usuario no está logueado y está en una página que requiere autenticación
    if (!loggedIn && currentPath.includes('pedidos.html')) {
        alert('Debes iniciar sesión para realizar un pedido');
        window.location.href = 'login.html';
    }
    
    // Si el usuario está logueado, mostrar información en la navegación
    if (loggedIn) {
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu) {
            // Reemplazar botón de login por información del usuario
            const loginBtn = document.querySelector('.btn-login');
            if (loginBtn) {
                loginBtn.textContent = `Hola, ${user.name.split(' ')[0]}`;
                loginBtn.href = '#';
                loginBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Aquí podrías agregar un menú desplegable o logout
                });
            }
        }
    }
}

// Ejecutar verificación al cargar la página
document.addEventListener('DOMContentLoaded', checkAuth);