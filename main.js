

const items = document.getElementById('items');
const item = document.getElementById('item');
const footer = document.getElementById('footer');
const body = document.querySelector('.card-body');
const card = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const table = document.querySelector('.table');
const botonInfo = document.getElementById('btn-info');
const botonDanger = document.getElementById('btn-danger');
const fragment = document.createDocumentFragment();
const carrito = {}



document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
})

// PRIMER PARTE:


const fetchData = async()=>{
    try{
        const res = await fetch('api.json');
        const data = await res.json();
        pintarCard(data);
    }catch(error){
        console.log(error)
    }
    
}

const pintarCard =(data)=>{
    data.forEach(producto => {
        card.querySelector('img').setAttribute('src', producto.imagen);
        card.querySelector('h5').textContent = producto.titulo;
        card.querySelector('p').textContent = producto.precio;
        card.querySelector('.btn-dark').dataset.id = producto.id;
        
        const clonar = card.cloneNode(true);
        fragment.appendChild(clonar)
    });
    items.appendChild(fragment)
}

items.addEventListener('click', (e)=>{
    sumarCarrito(e)
})

const sumarCarrito =(e)=>{
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
        
    }
    e.stopPropagation()
}

const setCarrito = (objeto)=>{
    const productos = {
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        id: objeto.querySelector('.btn-dark').dataset.id,
        cantidad: 1,

    }
    if(carrito.hasOwnProperty(productos.id)){
        productos.cantidad = carrito[productos.id].cantidad + 1;

    }
    carrito[productos.id] = {...productos}
    pintarCarrito()

}

const pintarCarrito = ()=>{
     table.innerHTML = ''
    Object.values(carrito).forEach(producto=>{
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.titulo;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

        const clon = templateCarrito.cloneNode(true);
        fragment.appendChild(clon)
    })
    table.appendChild(fragment)
}