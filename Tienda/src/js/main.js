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

class UI{
    products = []
    static showOnInterface(element){
        const starTotal = 5
        let rate = starRating(element.rating.rate)
        const content = document.querySelector('.row')
        const mainDiv = document.createElement('div')
        let subTitle = element.title
        let spaceCount = (subTitle.split(" ").length - 1);
        if(spaceCount >= 10){//esto para titulos largos
            let newTitleArray = []
            subTitle = subTitle.split(" ")
            for(let i = 0; i<4; i++){
                newTitleArray.push(subTitle[i])
            }
            subTitle = newTitleArray.join(' ')
        }else{
            subTitle = element.title
        }

        mainDiv.className = 'col s6 l3'
        mainDiv.innerHTML = `
            <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src=${element.image}>  
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${subTitle}<i class="material-icons right">more_vert</i></span>
                    <p><strong>Price: $${element.price}</strong></p>
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
    static asign = (products) =>{
        this.products = products
    }
    static search = (e) =>{
        const content = document.querySelector('.row')
        content.innerHTML = ''
        var texto = e.target.value.toLowerCase()
        this.products.forEach((element) => {
            if(element.title.toLowerCase().indexOf(texto) != -1 || element.category.toLowerCase().indexOf(texto) != -1 || element.description.toLowerCase().indexOf(texto) != -1){
                UI.showOnInterface(element)
            }
        })
    }
}
document.getElementById('search').addEventListener('keyup', UI.search)
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
      UI.asign(products)
  }
  document.addEventListener('DOMContentLoaded', fetchProducts)
  