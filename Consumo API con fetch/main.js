const API_URL = 'https://api.thecatapi.com/v1/'
//const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=2&page=2&api_key=
const API_KEY = '44f411a2-b8c1-4c31-b2c1-e9daab99861d'
const spanError = document.getElementById('error')
const saveButtons = document.getElementsByClassName('BotonFav')
const HTTPCodes = {
    200: 'OK',
    201: 'CREATED',
    400: 'BAD REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT FOUND',
    500: 'INTERNAL SERVER ERROR',
    503: 'SERVICE UNAVAILABLE',
    504: 'GATEWAY TIMEOUT',
}

const loadRandomCats = async () => {
    const res = await fetch(API_URL + 'images/search?limit=2&page=2')
    const data = await res.json()
    if (res.ok) {
        const img1 = document.getElementById('img-gato1')
        const img2 = document.getElementById('img-gato2')
        img1.src = data[0].url
        img2.src = data[1].url
        img1.className = ""
        img2.className = ""
        img1.classList.add(data[0].id)
        img2.classList.add(data[1].id)
        //element.classList.remove('class-3');
    } else {
        spanError.innerHTML = "hubo error al cargar la API"
    }


}
const loadFavoritesCats = async () => {
    document.getElementById('GatosFavoritos').innerHTML = ""
    let headersList = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
    }
    const res = await fetch(API_URL + 'favourites', {
        headers: headersList
    })
    if (!res.ok) {
        spanError.innerHTML = HTTPCodes[res.status]
    } else {
        const data = await res.json()
        const FavoritesCats = document.getElementById('GatosFavoritos')
        data.forEach((element) => {
            let article = document.createElement('article')
            let image = document.createElement('img')
            image.alt = "foto gato favorito"
            image.className = element.id
            image.src = element.image.url
            let button = document.createElement('button')
            button.innerText = "Eliminar Gato de favoritos"
            button.className = "EliminarFav"
            article.appendChild(image)
            article.appendChild(button)
            FavoritesCats.appendChild(article)
        })
        const removeButtons = document.getElementsByClassName('EliminarFav')
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener('click', removeFavoritesCats)
        }
    }
}

const saveFavoritesCats = async (e) => {
    let article = e.target.parentNode
    let id = article.firstElementChild.className
    let headersList = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
    }

    let bodyContent = JSON.stringify({
        image_id: id
    });
    const res = await fetch(API_URL + 'favourites', {
        method: 'POST',
        headers: headersList,
        body: bodyContent,
    })
    const data = await res.json()
    loadFavoritesCats()
    loadRandomCats()
}
const removeFavoritesCats = async (e) => {
    const article = e.target.parentNode
    let id = article.firstElementChild.className
    let headersList = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
    }
    const res = await fetch(API_URL + 'favourites/' + id, {
        method: 'DELETE',
        headers: headersList,
    })
    const data = await res.json()
    loadFavoritesCats()
    //location.reload();
}
const uploadGatoPhoto = async () => {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form)//recibe form como atributo por lo que recibe todos los valores de los input
    console.log(formData.get('file'))
    let headersList = {
        //"Content-Type": "multipart/form-data",
        "x-api-key": API_KEY,
    }
    const res = await fetch(API_URL + 'images/upload', {
        method: 'POST',
        headers: headersList,
        body: formData,
    })
    if (!res.ok) {
        spanError.innerHTML = HTTPCodes[res.status]
    } else {
        let data = await res.json();
        console.log("la data es ", data)
        let id = data.id
        let headersList = {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        }
        let bodyContent = JSON.stringify({
            image_id: id
        });
        const res2 = await fetch(API_URL + 'favourites', {
            method: 'POST',
            headers: headersList,
            body: bodyContent,
        })
        loadFavoritesCats()
    }
}
document.getElementById('recargar').addEventListener('click', loadRandomCats)
document.addEventListener('DOMContentLoaded', loadRandomCats)
document.addEventListener('DOMContentLoaded', loadFavoritesCats)
document.getElementById('uploadButton').addEventListener('click', uploadGatoPhoto)
for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener('click', saveFavoritesCats)
}
