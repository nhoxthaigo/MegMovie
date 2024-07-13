const slideimg = document.querySelector("#slide-img")
class MoviePagination {
    constructor(containerSelector, paginationSelector, initialPage = 1) {
        this.container = document.querySelector(containerSelector);
        this.paginationContainer = document.querySelector(paginationSelector);
        this.currentPage = initialPage;
        this.totalPages = 0; 
        this.currentPageElement = document.querySelector("#current-page");

        this.getCartoonList(this.currentPage);
    }

    getCartoonList(page) {
        fetch(`https://phimapi.com/v1/api/danh-sach/phim-le?page=${page}`)
            .then(response => response.json())
            .then(res => {
                const data = res.data;
                this.totalPages = data.params.pagination.totalPages; // Update totalPages

                let html = '';
                let slide = '';
                data.items.forEach(element => {
                    slide += ` <div class="swiper-slide"><img src="https://img.phimapi.com/${element.thumb_url}" alt="${element.name}"></div>`
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
                this.container.innerHTML = html;
                slideimg.innerHTML = slide;

                this.renderPagination(this.currentPage, this.totalPages);
                this.updateCurrentPageDisplay();
                activeSwiper();
            })
            .then(() => {
                const filmCards = document.querySelectorAll(`.film-card`);
                filmCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const filmId = card.getAttribute('data-id');
                        window.location.href = `detailPage.html?id=${filmId}`;
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    renderPagination(currentPage, totalPages) {
        this.paginationContainer.innerHTML = '';

        const createPageItem = (page, text = page, classes = '') => {
            const pageItem = document.createElement('div');
            pageItem.className = `page-item ${classes}`;
            pageItem.innerText = text;
            pageItem.addEventListener('click', () => {
                if (page !== currentPage && page >= 1 && page <= totalPages) {
                    this.currentPage = page;
                    this.getCartoonList(this.currentPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    this.updateCurrentPageDisplay();
                }
            });
            return pageItem;
        };

        if (currentPage > 1) {
            this.paginationContainer.appendChild(createPageItem(currentPage - 1, 'Prev'));
        } else {
            this.paginationContainer.appendChild(createPageItem(currentPage - 1, 'Prev', 'disabled'));
        }

        const maxVisiblePages = 3;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            this.paginationContainer.appendChild(createPageItem(1));
            if (startPage > 2) {
                this.paginationContainer.appendChild(createPageItem(startPage, '...'));
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            this.paginationContainer.appendChild(createPageItem(i, i, i === currentPage ? 'active' : ''));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                this.paginationContainer.appendChild(createPageItem(endPage, '...'));
            }
            this.paginationContainer.appendChild(createPageItem(totalPages));
        }

        if (currentPage < totalPages) {
            this.paginationContainer.appendChild(createPageItem(currentPage + 1, 'Next'));
        } else {
            this.paginationContainer.appendChild(createPageItem(currentPage + 1, 'Next', 'disabled'));
        }
    }

    updateCurrentPageDisplay() {
        this.currentPageElement.textContent = `Trang ${this.currentPage}`;
    }
}

const moviePagination = new MoviePagination('.rowSingle', '#pagination-Single');

function activeSwiper(){
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        loop: true,

        effect: 'fade', // Chọn hiệu ứng làm mờ
        fadeEffect: {
            crossFade: true 

        },

        speed: 2500, // Thời gian chuyển đổi animation

        autoplay: {
            delay: 2500,
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
}
