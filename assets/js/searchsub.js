const s = document.querySelector('.movie-rcm')
function searchMovie()
{
    const keyword = document.getElementById('search-input').value;
    const limit = 20;
    fetch(url = `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=${limit}`)
    .then(res => res.json())
    .then(response => {
        const data = response.data
        let html = ''
        data.items.forEach(element => {
            html +=`<a data-id="${element.slug}" class="card-mvsg">
            <div class="img-mvsg">
                <img src="https://img.phimapi.com/${element.poster_url}" alt="${element.name}">
            </div>
            <div class="name-mvsg">
                <p>${element.name}</p>
            </div>
        </a>`
        });
        s.innerHTML = html
    })
    .then(() => {
        const filmCards = document.querySelectorAll(`.card-mvsg`);
        filmCards.forEach(card => {
            card.addEventListener('click', function() {
                const filmId = card.getAttribute('data-id');
                window.location.href = `detailPage.html?id=${filmId}`;
            });
        });
    })
}

const searchInput = document.getElementById('search-input');
let debounceTimeOut
searchInput.addEventListener('input',function(){
    s.style.display = "block"
    clearTimeout(debounceTimeOut)
    debounceTimeOut = setTimeout(searchMovie,300)
})

const tapout = document.getElementById('search-form');
document.addEventListener('click',function(event){
    if(!tapout.contains(event.target) && event.target !== tapout)
    {
        s.style.display = "none"
        searchInput.value = ''
    }

})