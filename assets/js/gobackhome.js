function goBack() {
    const previousPage = sessionStorage.getItem('previousPage');

    if (previousPage) {
        window.location.href = previousPage;
    } else {
        window.history.back();
    }
}
