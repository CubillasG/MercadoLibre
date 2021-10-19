

const items = document.getElementById('items');
const item = document.getElementById('item');
const footer = document.getElementById('footer');
const body = document.querySelector('.card-body');
const card = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
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
    data.forEach(productos => {
        card.querySelector('h5').textContent = productos.titulo;
        card.querySelector('p').textContent = productos.precio;
        card.querySelector('.btn-dark').dataset = productos.id;
        card.querySelector('img').setAttribute('src', productos.imagen)

        const clonar = card.cloneNode(true);
        fragment.appendChild(clonar)
        
    });
    items.appendChild(fragment)
}

items.addEventListener('click', (e)=>{
    cargarProducto(e)

})

const cargarProducto = (e)=>{
    if(e.target.classList.contains('btn-dark')){
       empujarCarrito(e.target.parentElement)

    }
    e.stopPropagation()
}

const empujarCarrito =(objeto)=>{
    let producto ={
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        id: objeto.querySelector('.btn-dark').dataset.id,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;

    }
    carrito[producto.id] = {...producto};
    pintarCarrito()

}

const pintarCarrito = ()=>{
    item.innerHTML = ''
    console.log(carrito)
    Object.values(carrito).forEach(productos =>{
        templateCarrito.querySelector('th').dataset.id = productos.id;
        templateCarrito.querySelectorAll('td')[0].textContent = productos.titulo;
        templateCarrito.querySelectorAll('td')[1].textContent = productos.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = productos.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = productos.id;
        templateCarrito.querySelector('span').textContent = productos.precio * productos.cantidad;
        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone)
    })
    item.appendChild(fragment)
}