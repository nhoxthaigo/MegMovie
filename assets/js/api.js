const container = document.querySelector(`.row`);
const detailBox = document.getElementById('detail-box');
function getMovieList(page=1) {
    fetch(`https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`)
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.items.forEach(element => {
                html += `
                <div class="film-card col" data-id="${element.slug}">
                    <div class="film-poster">
                        <img src="${element.poster_url}" alt="${element.name}">
                    </div>
                    <div class="film-name">
                        <p>${element.name}</p>
                    </div>
                </div>
                `;
            });
            container.innerHTML = html;
        })
        .then(() => {
            const filmCards = document.querySelectorAll(`.film-card`);
            filmCards.forEach(card => {
                card.addEventListener('click', function() {
                    const filmId = card.getAttribute('data-id');
                    window.location.href = `./sub-page/detailPage.html?id=${filmId}`;
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

getMovieList();

