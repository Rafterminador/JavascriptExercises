const API_KEY = '44f411a2-b8c1-4c31-b2c1-e9daab99861d'
const spanError = document.getElementById('error')
const saveButtons = document.getElementsByClassName('BotonFav')
const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
})
api.defaults.headers.common['x-api-key'] = API_KEY;
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
    const { data, status } = await api.get('/images/search', {
        params: {
            limit: 2,
            page: 2
        }
    })
    if (status === 200) {
        const img1 = document.getElementById('img-gato1')
        const img2 = document.getElementById('img-gato2')
        img1.src = data[0].url
        img2.src = data[1].url
        img1.className = ""
        img2.className = ""
        img1.classList.add(data[0].id)
        img2.classList.add(data[1].id)
    } else {
        spanError.innerHTML = "hubo error al cargar la API"
    }
}
const loadFavoritesCats = async () => {
    document.getElementById('GatosFavoritos').innerHTML = ""
    const { data, status } = await api.get('/favourites')
    if (status === 200) {
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
    } else {
        spanError.innerHTML = HTTPCodes[res.status]
    }
}

const saveFavoritesCats = async (e) => {
    let article = e.target.parentNode
    let id = article.firstElementChild.className
    const { data, status } = await api.post('/favourites', {
        image_id: id
    })
    loadFavoritesCats()
    loadRandomCats()
}
const removeFavoritesCats = async (e) => {
    const article = e.target.parentNode
    let id = article.firstElementChild.className
    const { data, status } = await api.delete(`/favourites/${id}`)
    loadFavoritesCats()
}
const uploadGatoPhoto = async () => {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form)//recibe form como atributo por lo que recibe todos los valores de los input
    //console.log(formData.get('file'))
    const { data, status } = await api.post('/images/upload', formData)
    if (status === 201) {
        let id = data.id
        let { data2, status2 } = await api.post('/favourites', {
            image_id: id
        })
        loadFavoritesCats()
    } else {
        spanError.innerHTML = HTTPCodes[res.status]
    }
}
document.getElementById('recargar').addEventListener('click', loadRandomCats)
document.addEventListener('DOMContentLoaded', loadRandomCats)
document.addEventListener('DOMContentLoaded', loadFavoritesCats)
document.getElementById('uploadButton').addEventListener('click', uploadGatoPhoto)
for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener('click', saveFavoritesCats)
}
