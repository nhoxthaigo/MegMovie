//detailPage.js
function getDetailMovie() {
    const urlParams = new URLSearchParams(window.location.search);
    const filmId = urlParams.get('id');
    const episodeIndex = urlParams.get('episode') || 0; // Lấy số tập từ query params, mặc định là tập đầu tiên

    fetch(`https://phimapi.com/phim/${filmId}`)
        .then(res => res.json())
        .then(data => {
            let html = `
                <div class="info-box">
                    <div class="img-film">
                        <img src="${data.movie.poster_url}" alt="${data.movie.name}">
                    </div>
                    <div class="info-film">
                        <div class="name color-1">
                            <h1>${data.movie.name}</h1>
                        </div>
                        <div class="title">
                            <h4>Thể loại:</h4> <span>${data.movie.category.map(cat => cat.name).join(', ')}</span>
                        </div>
                        <div class="title">
                            <h4>Số tập:</h4> <span>${data.movie.episode_current}/${data.movie.episode_total}</span>
                        </div>
                        <div class="title">
                            <h4>Thời lượng:</h4> <span>${data.movie.time}</span>
                        </div>
                        <div class="title">
                            <h4>Ngôn Ngữ:</h4> <span>${data.movie.lang}</span>
                        </div>
                        <div class="title">
                            <h4>Phát hành:</h4> <span>${data.movie.year}</span>
                        </div>
                        <div class="title">
                            <h4>Quốc gia:</h4> <span>${data.movie.country.map(country => country.name).join(', ')}</span>
                        </div>
                        <div class="title">
                            <h4>Đạo diễn:</h4> <span>${data.movie.director.join(', ')}</span>
                        </div>
                    </div>
                </div>
                <div class="ec-title">
                        <div class="content-movie color-1">
                            <h2>Nội dung</h2>
                        </div>
                        <div class="summary-movie">
                            <p>${data.movie.content}</p>
                        </div>
                    </div>
                <div class="episode-content">
                    <div class="ec-title">
                        <div class="watch-movie color-1">
                            <h2>Danh sách tập phim</h2>
                        </div>
                        
                        <div class="list-episode">
                        <div class="box-number">
                        ${data.movie.episode_total ==1 ? `
                            <a href="movie-show.html?id=${filmId}&episode=0" class="watch-now-button active" data-index="0">Xem Phim Ngay</a>
                        ` : `
                            ${data.episodes[0].server_data.map((server, index) => `
                                <a href="movie-show.html?id=${filmId}&episode=${index}" class="watch-now-button${index == episodeIndex ? ' active' : ''}" data-index="${index}">Xem ngay tập ${index + 1}</a>
                            `).join('')}
                        `}
                    </div>
                        </div>
                    </div>
                </div>
            `;

            detailBox.innerHTML = html;

            // Tạo sự kiện click cho các nút Xem ngay
            const watchNowButtons = document.querySelectorAll('.watch-now-button');
            watchNowButtons.forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const episodeIndex = this.getAttribute('data-index');
                    // Redirect tới trang movie-show.html với id và số tập
                    window.location.href = `movie-show.html?id=${filmId}&episode=${episodeIndex}`;
                });
            });
        });
}

getDetailMovie();