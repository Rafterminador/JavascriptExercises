const API_URL = 'https://api.thecatapi.com/v1/images/search'

const reload = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    const img = document.getElementById('img-gato')
    img.src = data[0].url
    console.log(data[0].url, data[0].width, data[0].height)
}
document.getElementById('recargar').addEventListener('click', reload)
document.addEventListener('DOMContentLoaded', reload)