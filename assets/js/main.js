document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname.split("/").pop();
    const target = {
        "index.html": "home",
        "cartoon-movie.html": "cartoon-movie",
        "theater-movies.html": "theater-movies",
        "single-movies.html": "single-movies",
        "series-movies.html": "series-movies"
    };

    if (target[path]) {
        document.getElementById(target[path]).classList.add('active');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const currentPageNumber = urlParams.get('page') || 1;

    document.getElementById('current-page').textContent = `Trang ${currentPageNumber}`;

    // Gọi fetchMovies với currentPageNumber ban đầu
    fetchMovies(currentPageNumber);

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-input').value;
        searchMovies(query);
    });
});

function navigateToDetailPage(movieId, currentPage) {
    sessionStorage.setItem('previousPage', currentPage);
    window.location.href = `/detailPage.html?id=${movieId}`;
}

