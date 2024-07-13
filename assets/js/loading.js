function loadingPage(timeLoad = 2000) {
    setTimeout(function () {
        var loaderContainer = document.querySelector('.loader-container');

        if (loaderContainer) {
            loaderContainer.classList.add('fade-out');

            setTimeout(function () {
                loaderContainer.style.display = 'none';
            }, 1000);
        }
    }, timeLoad);
}
loadingPage();