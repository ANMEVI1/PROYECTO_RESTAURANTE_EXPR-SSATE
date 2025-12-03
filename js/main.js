// js/main.js - Versión mejorada y optimizada

// ====================== DATOS Y ESTADO ======================
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const platos = [
    // Hamburguesas
    { 
        id: 1, 
        nombre: "Hamburguesa Clásica", 
        precio: 25.90, 
        stock: 15, 
        categoria: "hamburguesas", 
        top: true, 
        promo: false, 
        img: "", 
        desc: "Carne 100% res, lechuga, tomate, cebolla y salsa especial." 
    },
    { 
        id: 2, 
        nombre: "Hamburguesa BBQ", 
        precio: 29.90, 
        stock: 8, 
        categoria: "hamburguesas", 
        top: true, 
        promo: false, 
        img: "hamb-bbq.jpg", 
        desc: "Doble carne, queso cheddar, aros de cebolla y salsa BBQ." 
    },
    { 
        id: 3, 
        nombre: "Hamburguesa Cheeseburger", 
        precio: 27.90, 
        stock: 12, 
        categoria: "hamburguesas", 
        top: false, 
        promo: true, 
        img: "cheeseburger.jpg", 
        desc: "Carne, doble queso americano, pepinillos y ketchup." 
    },

    // Combos
    { 
        id: 4, 
        nombre: "Combo Familiar", 
        precio: 65.90, 
        stock: 20, 
        categoria: "combos", 
        top: true, 
        promo: true, 
        img: "combo-familiar.jpg", 
        desc: "3 hamburguesas clásicas + 2 papas grandes + 3 refrescos." 
    },
    { 
        id: 5, 
        nombre: "Combo Dúo", 
        precio: 45.90, 
        stock: 18, 
        categoria: "combos", 
        top: false, 
        promo: false, 
        img: "combo-duo.jpg", 
        desc: "2 hamburguesas + 2 papas medianas + 2 refrescos." 
    },
    { 
        id: 6, 
        nombre: "Combo Triqui", 
        precio: 55.90, 
        stock: 10, 
        categoria: "combos", 
        top: true, 
        promo: false, 
        img: "combo-triqui.jpg", 
        desc: "2 hamburguesas + alitas + papas + 3 refrescos." 
    },

    // Salchipapas
    { 
        id: 7, 
        nombre: "Salchipapa Mini", 
        precio: 8.00, 
        stock: 30, 
        categoria: "salchipapas", 
        top: false, 
        promo: false, 
        img: "salchi-mini.jpg", 
        desc: "Papas fritas con salchicha básica." 
    },
    { 
        id: 8, 
        nombre: "Salchipapa Mediana", 
        precio: 10.00, 
        stock: 25, 
        categoria: "salchipapas", 
        top: true, 
        promo: false, 
        img: "salchi-mediana.jpg", 
        desc: "Papas + salchicha + huevo." 
    },
    { 
        id: 9, 
        nombre: "Salchipapa Glotona", 
        precio: 18.00, 
        stock: 5, 
        categoria: "salchipapas", 
        top: true, 
        promo: true, 
        img: "salchi-glotona.jpg", 
        desc: "Papas, salchicha, huevo, queso, chorizo y salsas." 
    },

    // Postres
    { 
        id: 10, 
        nombre: "Helado de Vainilla", 
        precio: 9.90, 
        stock: 20, 
        categoria: "postres", 
        top: false, 
        promo: true, 
        img: "helado.jpg", 
        desc: "2 bolas de helado cremoso." 
    },
    { 
        id: 11, 
        nombre: "Brownie con Helado", 
        precio: 14.90, 
        stock: 12, 
        categoria: "postres", 
        top: false, 
        promo: true, 
        img: "brownie.jpg", 
        desc: "Brownie caliente con helado y chocolate." 
    },

    // Bebidas
    { 
        id: 12, 
        nombre: "Inca Kola 500ml", 
        precio: 6.90, 
        stock: 50, 
        categoria: "bebidas", 
        top: false, 
        promo: false, 
        img: "inca-kola.jpg", 
        desc: "Refresco peruano clásico." 
    },
    { 
        id: 13, 
        nombre: "Coca Cola 500ml", 
        precio: 6.90, 
        stock: 40, 
        categoria: "bebidas", 
        top: false, 
        promo: false, 
        img: "coca-cola.jpg", 
        desc: "Refresco clásico." 
    },
    { 
        id: 14, 
        nombre: "Agua Mineral", 
        precio: 4.00, 
        stock: 60, 
        categoria: "bebidas", 
        top: false, 
        promo: false, 
        img: "agua.jpg", 
        desc: "Agua sin gas 500ml." 
    }
];

// ====================== DOM ELEMENTS ======================
const menuGrid = document.getElementById('menuGrid');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.querySelector('.menu-toggle');
const closeSidebar = document.querySelector('.close-sidebar');
const cartCount = document.getElementById('cartCount');

// ====================== CARRUSEL PRINCIPAL ======================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
let carouselInterval;

function showSlide(n) {
    if (slides.length === 0) return;
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startCarousel() {
    stopCarousel();
    carouselInterval = setInterval(nextSlide, 6000);
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
}

// Event listeners para controles del carrusel
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startCarousel(); // Reiniciar el intervalo
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startCarousel(); // Reiniciar el intervalo
    });
}

// ====================== RENDER FUNCIONES ======================
function renderMenu() {
    if (!menuGrid) return;
    
    menuGrid.innerHTML = platos.map(plato => {
        const stockClass = plato.stock === 0 ? 'btn-stock-disabled' : '';
        const stockText = plato.stock === 0 ? 'Sin Stock' : 'Añadir al Carrito';
        const promoTag = plato.promo ? '<span class="promo-tag">PROMO</span>' : '';
        
        return `
            <article class="menu-item" onclick="verDetalle(${plato.id})">
                <img src="assets/${plato.img}" alt="${plato.nombre}" loading="lazy">
                <div class="menu-item-content">
                    <h3>
                        ${plato.nombre} 
                        ${promoTag}
                    </h3>
                    <p>${plato.desc}</p>
                    <div class="stock-info">
                        Stock: <strong>${plato.stock > 0 ? plato.stock + ' disponibles' : 'Agotado'}</strong>
                    </div>
                    <div class="menu-item-price">S/ ${plato.precio.toFixed(2)}</div>
                    <button 
                        ${plato.stock === 0 ? 'disabled' : ''} 
                        onclick="event.stopPropagation(); addToCart(${plato.id})" 
                        class="btn btn-primary btn-small btn-full ${stockClass}">
                        ${stockText}
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

function renderTopVentas() {
    const top = platos.filter(p => p.top);
    const container = document.querySelector('#top-ventas .mini-carousel');
    
    if (container && top.length > 0) {
        container.innerHTML = top.map(p => `
            <div class="mini-item" onclick="verDetalle(${p.id})">
                <img src="assets/${p.img}" alt="${p.nombre}" loading="lazy">
                <p>${p.nombre}</p>
                <span>S/ ${p.precio.toFixed(2)}</span>
            </div>
        `).join('');
    }
}

function renderPromociones() {
    const promo = platos.filter(p => p.promo);
    const container = document.querySelector('#promociones .mini-carousel');
    
    if (container && promo.length > 0) {
        container.innerHTML = promo.map(p => `
            <div class="mini-item promo" onclick="verDetalle(${p.id})">
                <img src="assets/${p.img}" alt="${p.nombre}" loading="lazy">
                <p>${p.nombre} <strong>¡Oferta!</strong></p>
                <span>S/ ${p.precio.toFixed(2)}</span>
            </div>
        `).join('');
    }
}

// ====================== BÚSQUEDA ======================
let searchTimeout;

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        const term = e.target.value.toLowerCase().trim();
        
        if (term === '') {
            searchResults.classList.remove('active');
            return;
        }

        searchTimeout = setTimeout(() => {
            const resultados = platos.filter(p => 
                p.nombre.toLowerCase().includes(term) || 
                p.categoria.toLowerCase().includes(term) ||
                p.desc.toLowerCase().includes(term)
            );

            if (resultados.length > 0) {
                searchResults.innerHTML = resultados.slice(0, 8).map(p => `
                    <a href="producto-detalle.html?id=${p.id}">
                        <strong>${p.nombre}</strong> - S/ ${p.precio.toFixed(2)}
                        ${p.stock === 0 ? '<em style="color: #999;"> (Sin stock)</em>' : ''}
                    </a>
                `).join('');
            } else {
                searchResults.innerHTML = '<div style="padding: 14px 18px; color: #999;">No se encontraron resultados</div>';
            }
            
            searchResults.classList.add('active');
        }, 300);
    });
}

// Cerrar resultados al hacer click fuera
document.addEventListener('click', (e) => {
    if (searchInput && searchResults && 
        !searchInput.contains(e.target) && 
        !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});

// ====================== SIDEBAR ======================
function toggleSidebar() {
    const isActive = sidebar.classList.contains('active');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isActive ? '' : 'hidden';
}

if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
if (closeSidebar) closeSidebar.addEventListener('click', toggleSidebar);
if (overlay) overlay.addEventListener('click', toggleSidebar);

// Cerrar sidebar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        toggleSidebar();
    }
});

// ====================== CARRITO ======================
function addToCart(id) {
    const plato = platos.find(p => p.id === id);
    
    if (!plato) {
        console.error('Plato no encontrado');
        return;
    }
    
    if (plato.stock <= 0) {
        mostrarNotificacion('Este producto está agotado', 'error');
        return;
    }
    
    // Agregar al carrito
    carrito.push({ ...plato, cantidadComprada: 1 });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Reducir stock
    plato.stock--;
    
    // Actualizar vista
    updateCartCount();
    renderMenu();
    renderTopVentas();
    renderPromociones();
    
    mostrarNotificacion(`${plato.nombre} añadido al carrito`, 'success');
}

function updateCartCount() {
    if (cartCount) {
        const total = carrito.length;
        cartCount.textContent = total;
        
        // Animación del contador
        if (total > 0) {
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

function verDetalle(id) {
    window.location.href = `producto-detalle.html?id=${id}`;
}

// ====================== NOTIFICACIONES ======================
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notif = document.createElement('div');
    notif.className = `notificacion notificacion-${tipo}`;
    notif.textContent = mensaje;
    
    // Estilos inline para la notificación
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'success' ? '#10b981' : tipo === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notif);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ====================== INICIALIZACIÓN ======================
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar contador del carrito
    updateCartCount();
    
    // Renderizar todas las secciones
    renderMenu();
    renderTopVentas();
    renderPromociones();
    
    // Iniciar carrusel
    if (slides.length > 0) {
        showSlide(currentSlide);
        startCarousel();
    }
    
    // Log de inicialización
    console.log('ExpréSSate cargado correctamente');
    console.log(`Productos en carrito: ${carrito.length}`);
});

// Limpiar intervalo al salir de la página
window.addEventListener('beforeunload', () => {
    stopCarousel();
});