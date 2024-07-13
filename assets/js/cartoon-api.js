const container = document.querySelector(`.rowCartoon`);
const detailBox = document.getElementById('detail-box');

function getCartoonList() {
    fetch("https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=1")
        .then(response => response.json())
        .then(res => {
            const data = res.data
            let html = '';
            data.items.forEach(element => {
                html += `
                <div class="film-card col" data-id="${element.slug}">
                    <div class="film-poster">
                        <img src="https://img.phimapi.com/${element.poster_url}" alt="${element.name}">
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
                    window.location.href = `detailPage.html?id=${filmId}`;
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}


getCartoonList();

