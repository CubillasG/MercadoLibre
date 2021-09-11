const items = document.getElementById('items');
const card = document.querySelector('.card');
const fragment = document.createDocumentFragment();
let carrito = {}


document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
})


const fetchData = async()=>{
    try{
            const res = await fetch('api.json');
            const data = await res.json();
            pintarTarjetas(data);
    }catch (error){
        console.log(error)
        
    }

}

const pintarTarjetas = (data)=>{
    data.forEach(producto => {
        card.querySelector('h5').textContent = producto.titulo;
        card.querySelector('p').textContent = producto.precio;
        card.querySelector('img').setAttribute('src', producto.imagen);
        card.querySelector('.btn-dark').dataset.id = producto.id
        
        const clon = card.cloneNode(true)
        fragment.appendChild(clon)
    });
    items.appendChild(fragment)
}

items.addEventListener('click', (e)=>{

    agregarCarrito(e)
})

const  agregarCarrito=(e)=>{
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()

}

const setCarrito = (objeto)=>{
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        titulo: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
   
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito [producto.id].cantidad + 1;

    }
    carrito[producto.id] = {...producto}

    console.log(carrito)
}