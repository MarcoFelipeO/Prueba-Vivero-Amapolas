let productos = [
  {id: 1, nombre: "Gomero", precio: 3.500, stock: 1, url_foto: "img/1884.jpg", descripcion: "Una planta increible"},
  {id: 2, nombre: "Bugamvilla", precio: 7.800, stock: 5, url_foto: "img/bugambilia.jpg", descripcion: "Una planta increible"},
  {id: 3, nombre: "Arbol de luces", precio: 6.700, stock: 3, url_foto: "img/cerezo.jpg", descripcion: "Una planta increible"},
  {id: 4, nombre: "Helecho Espada", precio: 4.500, stock: 2, url_foto: "img/helecho.jpg", descripcion: "Una planta increible"},
  {id: 5, nombre: "Hojas trboladas", precio: 8.590, stock: 4, url_foto: "img/palmeraglover.jpg", descripcion: "Una planta increible"},
  {id: 6, nombre: "Petunias", precio: 4.500, stock: 6, url_foto: "img/petunias.jpg", descripcion: "Una planta increible"},
  {id: 7, nombre: "Flor de campo", precio: 2.450, stock: 8, url_foto: "img/portada.jpg", descripcion: "Una planta increible"},
  {id: 8, nombre: "Tradescantia", precio: 8.950, stock: 10, url_foto: "img/tradescantia.webp", descripcion: "Una planta increible"},
  {id: 9, nombre: "Ave Maria", precio: 6.670, stock: 7, url_foto: "img/bugambilia.jpg", descripcion: "Una planta increible"},
  {id: 10, nombre: "Ave del paraiso", precio: 22.500, stock: 9, url_foto: "img/cerezo.jpg", descripcion: "Una planta increible"}
];

const valorUF = 30000; // Tasa de cambio UF a CLP 

function dibujar_catalogo() {
  const catalogoContainer = document.getElementById('catalogo');
  catalogoContainer.innerHTML = '';

  productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('producto');
    productoElement.innerHTML = `
      <img src="${producto.url_foto}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p>Precio: $${convertToCLP(producto.precio)} CLP</p>
      <button onclick="agregar(${producto.id})">Agregar al carrito</button>
    `;

    catalogoContainer.appendChild(productoElement);
  });
}

function convertToCLP(ufPrecio) {
  return ufPrecio * valorUF;
}

function agregar(id) {
  const producto = productos.find(p => p.id === id);

  if (producto && producto.stock > 0) {
    const carritoItem = carrito.find(item => item.id === id);

    if (carritoItem) {
      if (carritoItem.cantidad < producto.stock) {
        carritoItem.cantidad++;
      } else {
        alert('No hay suficiente stock disponible');
      }
    } else {
      carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }

    producto.stock--;

    dibujar_carrito();
  }
}

function dibujar_carrito() {
  const carritoContainer = document.getElementById('carrito');
  carritoContainer.innerHTML = '';

  carrito.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.innerHTML = `
      <p>${item.nombre}</p>
      <p>Precio: $${convertToCLP(item.precio)} CLP</p>
      <p>Cantidad: ${item.cantidad}</p>
      <p>Subtotal: $${convertToCLP(item.precio * item.cantidad)} CLP</p>
      <button onclick="aumentar_cantidad(${item.id})">+</button>
      <button onclick="disminuir_cantidad(${item.id})">-</button>
      <button onclick="eliminar(${item.id})">Eliminar</button>
    `;

    carritoContainer.appendChild(itemElement);
  });
}

function aumentar_cantidad(id) {
  const carritoItem = carrito.find(item => item.id === id);

  if (carritoItem && carritoItem.cantidad < getProductStockById(id)) {
    carritoItem.cantidad++;
    dibujar_carrito();
  }
}

function disminuir_cantidad(id) {
  const carritoItem = carrito.find(item => item.id === id);

  if (carritoItem && carritoItem.cantidad > 1) {
    carritoItem.cantidad--;
  } else {
    eliminar(id);
  }

  dibujar_carrito();
}

function eliminar(id) {
  const index = carrito.findIndex(item => item.id === id);

  if (index !== -1) {
    const producto = getProductById(id);
    producto.stock += carrito[index].cantidad;
    carrito.splice(index, 1);
    dibujar_carrito();
  }
}

function getProductById(id) {
  return productos.find(producto => producto.id === id);
}

function getProductStockById(id) {
  const producto = getProductById(id);
  return producto ? producto.stock : 0;
}

let carrito = [];
dibujar_catalogo();
dibujar_carrito();