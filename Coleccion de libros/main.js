class Libro{
    constructor(titulo, autor, isbn){
        this.titulo = titulo
        this.autor = autor
        this.isbn = isbn
    }
}
class UI{
    static mostrarLibros(){
        const libros = Datos.traerLibros()
        libros.forEach(libro => UI.agregarLibroLista(libro))
    }
    static agregarLibroLista(libro){
        const lista = document.querySelector('#libro-list')
        const fila = document.createElement('tr')
        fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.isbn}</td>
            <td><a href="#" class="btn  btn-danger btn-sm delete">X</a></td>
        `
        lista.appendChild(fila)
    }
    static eliminarLibro(elemento){
        if(elemento.classList.contains('delete')){
            elemento.parentElement.parentElement.remove()
        }
    }
    static mostrarAlerta(mensaje, className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(mensaje))
        const container = document.querySelector('.container')
        const form = document.querySelector('#libro-form')
        container.insertBefore(div, form)
        setTimeout( () => document.querySelector('.alert').remove(), 3000)
    }
    static limpiarCampos(){
        document.querySelector('#titulo').value = ''
        document.querySelector('#autor').value = ''
        document.querySelector('#isbn').value = ''
    }
}
class Datos{
    static traerLibros(){
        let libros
        localStorage.getItem('libros') === null ? libros = [] : libros = JSON.parse(localStorage.getItem('libros'))
        return libros
    }
    static agregarLibro(libro){
        const libros = Datos.traerLibros()
        libros.push(libro)
        localStorage.setItem('libros', JSON.stringify(libros))
    }
    static removerLibro(isbn){
        const libros = Datos.traerLibros()
        libros.forEach( (libro, index) => {
            if(libro.isbn === isbn){
                libros.splice(index, 1)
            }
        })
        localStorage.setItem('libros', JSON.stringify(libros))
    }
}
document.querySelector('#libro-form').addEventListener('submit', e => {
    e.preventDefault()
    const titulo = document.querySelector('#titulo').value
    const autor = document.querySelector('#autor').value
    const isbn = document.querySelector('#isbn').value
    const libro = new Libro(titulo, autor, isbn)
    Datos.agregarLibro(libro)
    UI.agregarLibroLista(libro)
    UI.mostrarAlerta('Libro agregado a la colecci??n', 'success')
    UI.limpiarCampos()
})
// carga de la p??gina
document.addEventListener('DOMContentLoaded', UI.mostrarLibros)
document.querySelector('#libro-list').addEventListener('click', (e) => {
    UI.eliminarLibro(e.target)
    Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent)
    UI.mostrarAlerta('Libro Eliminado', 'success')
})