// Manejo del formulario de pedidos

document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const orderItems = document.getElementById('orderItems');
    const subtotalPrice = document.getElementById('subtotalPrice');
    const totalPrice = document.getElementById('totalPrice');
    const deliveryOptions = document.querySelectorAll('.delivery-option');
    const deliveryInfoSections = document.querySelectorAll('.delivery-info');
    const deliveryCharge = document.querySelector('.delivery-charge');
    const deliveryPrice = document.getElementById('deliveryPrice');
    
    let selectedItems = [];
    let subtotal = 0;
    let deliveryCost = 5.00; // Costo de delivery en soles
    let isDelivery = false;
    
    // Manejar selección de opciones de entrega
    deliveryOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover clase active de todas las opciones
            deliveryOptions.forEach(opt => opt.classList.remove('active'));
            
            // Agregar clase active a la opción seleccionada
            this.classList.add('active');
            
            // Determinar si es delivery o recojo
            isDelivery = this.getAttribute('data-type') === 'delivery';
            
            // Mostrar/ocultar secciones correspondientes
            deliveryInfoSections.forEach(section => {
                if (isDelivery && section.querySelector('#deliveryAddress')) {
                    section.classList.remove('hidden');
                } else if (!isDelivery && section.querySelector('#pickupTime')) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
            
            // Mostrar/ocultar costo de delivery
            if (isDelivery) {
                deliveryCharge.classList.remove('hidden');
            } else {
                deliveryCharge.classList.add('hidden');
            }
            
            // Actualizar total
            updateOrderTotal();
        });
    });
    
    // Actualizar resumen del pedido cuando se seleccionan elementos
    document.querySelectorAll('input[name="items"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const itemName = this.value;
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            
            if (this.checked) {
                // Agregar elemento
                selectedItems.push({
                    name: itemName,
                    price: itemPrice
                });
            } else {
                // Remover elemento
                selectedItems = selectedItems.filter(item => item.name !== itemName);
            }
            
            updateOrderSummary();
        });
    });
    
    // Actualizar resumen del pedido
    function updateOrderSummary() {
        // Limpiar lista
        orderItems.innerHTML = '';
        
        // Calcular subtotal
        subtotal = 0;
        
        // Agregar elementos seleccionados
        selectedItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>S/ ${item.price.toFixed(2)}</span>
            `;
            orderItems.appendChild(itemElement);
            
            subtotal += item.price;
        });
        
        // Actualizar subtotal
        subtotalPrice.textContent = subtotal.toFixed(2);
        
        // Actualizar total
        updateOrderTotal();
    }
    
    // Actualizar total del pedido
    function updateOrderTotal() {
        let total = subtotal;
        
        if (isDelivery) {
            total += deliveryCost;
        }
        
        totalPrice.textContent = total.toFixed(2);
    }
    
    // Manejar envío del formulario
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificar que el usuario esté logueado
            const loggedIn = sessionStorage.getItem('loggedIn');
            if (!loggedIn) {
                alert('Debes iniciar sesión para realizar un pedido');
                window.location.href = 'login.html';
                return;
            }
            
            // Verificar que se hayan seleccionado elementos
            if (selectedItems.length === 0) {
                alert('Por favor selecciona al menos un producto');
                return;
            }
            
            // Validar campos según el tipo de entrega
            if (isDelivery) {
                const deliveryAddress = document.getElementById('deliveryAddress').value;
                const deliveryDate = document.getElementById('deliveryDate').value;
                const deliveryTime = document.getElementById('deliveryTime').value;
                
                if (!deliveryAddress || !deliveryDate || !deliveryTime) {
                    alert('Por favor completa toda la información de entrega');
                    return;
                }
            } else {
                const pickupDate = document.getElementById('pickupDate').value;
                const pickupTime = document.getElementById('pickupTime').value;
                
                if (!pickupDate || !pickupTime) {
                    alert('Por favor completa la fecha y hora de recojo');
                    return;
                }
            }
            
            // Obtener datos del formulario
            const customerName = document.getElementById('customerName').value;
            const customerEmail = document.getElementById('customerEmail').value;
            const customerPhone = document.getElementById('customerPhone').value;
            
            // Crear objeto de pedido
            const order = {
                customerName,
                customerEmail,
                customerPhone,
                deliveryType: isDelivery ? 'delivery' : 'pickup',
                items: selectedItems,
                subtotal: subtotal,
                deliveryCost: isDelivery ? deliveryCost : 0,
                total: parseFloat(totalPrice.textContent)
            };
            
            // Agregar información específica según el tipo
            if (isDelivery) {
                order.deliveryAddress = document.getElementById('deliveryAddress').value;
                order.deliveryDate = document.getElementById('deliveryDate').value;
                order.deliveryTime = document.getElementById('deliveryTime').value;
            } else {
                order.pickupDate = document.getElementById('pickupDate').value;
                order.pickupTime = document.getElementById('pickupTime').value;
            }
            
            // Aquí iría la conexión con la base de datos
            // Por ahora, solo guardamos en localStorage
            saveOrder(order);
            
            alert('¡Pedido realizado con éxito! Te contactaremos pronto para confirmar.');
            orderForm.reset();
            selectedItems = [];
            updateOrderSummary();
            
            // Resetear opciones de entrega
            deliveryOptions[0].click();
        });
    }
    
    // Guardar pedido (simulación)
    function saveOrder(order) {
        // Obtener pedidos existentes o crear array vacío
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        // Agregar ID y timestamp
        order.id = Date.now();
        order.timestamp = new Date().toISOString();
        
        // Agregar nuevo pedido
        orders.push(order);
        
        // Guardar en localStorage
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Aquí iría el código para enviar a la base de datos real
        console.log('Pedido guardado:', order);
    }
    
    // Establecer fecha y hora mínima para el pedido
    const today = new Date();
    
    // Para fecha de recojo
    const pickupDateInput = document.getElementById('pickupDate');
    const pickupTimeInput = document.getElementById('pickupTime');
    
    if (pickupDateInput) {
        pickupDateInput.min = today.toISOString().split('T')[0];
        
        pickupDateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            
            if (selectedDate.toDateString() === today.toDateString()) {
                // Hoy - establecer hora mínima como la hora actual + 1 hora
                const minTime = new Date(today.getTime() + 60 * 60 * 1000);
                pickupTimeInput.min = minTime.toTimeString().slice(0, 5);
            } else {
                // Otro día - sin restricciones de hora
                pickupTimeInput.min = '00:00';
            }
        });
    }
    
    // Para fecha de entrega
    const deliveryDateInput = document.getElementById('deliveryDate');
    const deliveryTimeInput = document.getElementById('deliveryTime');
    
    if (deliveryDateInput) {
        deliveryDateInput.min = today.toISOString().split('T')[0];
        
        deliveryDateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            
            if (selectedDate.toDateString() === today.toDateString()) {
                // Hoy - establecer hora mínima como la hora actual + 1 hora
                const minTime = new Date(today.getTime() + 60 * 60 * 1000);
                deliveryTimeInput.min = minTime.toTimeString().slice(0, 5);
            } else {
                // Otro día - sin restricciones de hora
                deliveryTimeInput.min = '00:00';
            }
        });
    }
    
    // Inicializar con la primera opción seleccionada
    if (deliveryOptions.length > 0) {
        deliveryOptions[0].click();
    }
});