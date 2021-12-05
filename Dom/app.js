var form = document.getElementById('formAgregar')
var lista = document.getElementById('items')
var filtro = document.getElementById('filtro')
form.addEventListener('submit', agregarItem)
lista.addEventListener('click', eliminarItem)
filtro.addEventListener('keyup', filtrarItems)
function agregarItem (e) {//e es el evento recibido
    e.preventDefault() //permite cancelar el evento si es cancelable y se puede volver a llamar este evento
    var newItem = document.getElementById('item').value
    var li = document.createElement('li')
    li.className = 'list-group-item'
    li.appendChild(document.createTextNode(newItem))
    var botonDel = document.createElement('button')
    botonDel.className = 'btn btn-danger btn-sm float-right eliminar'
    botonDel.appendChild(document.createTextNode('X'))
    li.appendChild(botonDel)
    lista.appendChild(li)
}

function eliminarItem(e){//ya que antes al hacer click en todo el body de la lista lo tomaba como click
    //consulto dentro de esta lista y existe una clase eliminar asi distingue cuando se le da click al boton
    if(e.target.classList.contains('eliminar')){//target permite capturar un elemento que cumpla con los criterios seleccionados
        if(confirm('¿Seguro que desea eliminar el elemento?')){
            var li = e.target.parentElement //con esto conseguimos al elemento padre del boton que se hizo click
            lista.removeChild(li)
        }
    }
}

function filtrarItems(e){
    var texto = e.target.value.toLowerCase()
    var items = lista.getElementsByTagName('li')
    Array.from(items).forEach(function(item){
        var itemNombre = item.firstChild.textContent
        //con block lo mantiene y con none lo quita
        itemNombre.toLocaleLowerCase().indexOf(texto) != -1 ? item.style.display = 'block' : item.style.display = 'none'
    })
}