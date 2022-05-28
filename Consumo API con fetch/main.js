const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&page=2'

const reload = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    console.log(data)
    const img1 = document.getElementById('img-gato1')
    const img2 = document.getElementById('img-gato2')
    const img3 = document.getElementById('img-gato3')
    img1.src = data[0].url
    img2.src = data[1].url
    img3.src = data[2].url
}
document.getElementById('recargar').addEventListener('click', reload)
document.addEventListener('DOMContentLoaded', reload)