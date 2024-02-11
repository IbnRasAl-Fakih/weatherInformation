function home() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('username');
    location.href = `/weather?username=${user}`;
}

function history() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('username');
    location.href = `/history?username=${user}`;
}

function logOut() {
    location.href = `/`;
}