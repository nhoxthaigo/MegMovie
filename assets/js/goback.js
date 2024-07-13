function goBack() {
    window.history.back();
}

// Load chi tiết phim khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
    getMovieDetails();
});
