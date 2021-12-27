const starRating = (number) => {
    let rating = [0, 0, 0, 0, 0]
    let classRating = []
    if(number >= 0.5){
        let starsCompleted = Math.floor(number/1)
        for(let i = 0; i<starsCompleted; i++){
            classRating.push('fas fa-star')
        }
        number -= starsCompleted
        if(number >= 0.3 && number <= 0.7){
            classRating.push('fas fa-star-half-alt')
        }else if(number < 0.3){
            classRating.push('far fa-star')
        }else{
            classRating.push('fas fa-star')
        }
        let remainingStars = rating.length - classRating.length
        for(let j = 0; j<remainingStars; j++){
            classRating.push('far fa-star')
        }
    }else{
        classRating = ['far fa-star', 'far fa-star', 'far fa-star', 'far fa-star', 'far fa-star']
    }
    return classRating
}

class Datos{
    static traerLibros(){
        let libros
        localStorage.getItem('tienda') === null ? libros = [] : libros = JSON.parse(localStorage.getItem('tienda'))
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
class UI{
    static showOnInterface(element){
        const starTotal = 5
        let rate = starRating(element.rating.rate)
        const content = document.querySelector('.row')
        const mainDiv = document.createElement('div')
        mainDiv.className = 'col s6 l3'
        mainDiv.innerHTML = `
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src=${element.image}>  
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${element.title}<i class="material-icons right">more_vert</i></span>
                    <p>Price: $${element.price}</p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">${element.title}<i class="material-icons right">close</i></span>
                    <p>${element.description}</p>
                    <div class="rating">
                        <i class="rating__star ${rate[0]}"></i>
                        <i class="rating__star ${rate[1]}"></i>
                        <i class="rating__star ${rate[2]}"></i>
                        <i class="rating__star ${rate[3]}"></i>
                        <i class="rating__star ${rate[4]}"></i>
                    </div>
                    <p id='rate'>(${element.rating.count} ratings)</p>
                </div>
            </div>     
        `
        content.appendChild(mainDiv)
    }
}
const buscar = () =>{
    const libros = Datos.traerLibros()
    console.log('hola' + libros)
    let example = {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
        "rate": 3.9,
        "count": 120
        }
    }
    UI.showOnInterface(example)
    let example2 = {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
        "rate": 2.4,
        "count": 259
        }
        }
        UI.showOnInterface(example2)
}
document.getElementById('search').addEventListener('keyup', buscar)
const fetchStore = async () => {
    try {
      const res = await fetch(
        'https://fakestoreapi.com/products'
      );
  
      const data = await res.json();
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () =>{
      const products = await fetchStore()
      products.forEach((element) => {
        UI.showOnInterface(element)
      })
      //console.log(products[0])
  }
  document.addEventListener('DOMContentLoaded', fetchProducts)
  