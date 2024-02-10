function home() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('username');
    location.href = `http://localhost:3000/weather?username=${user}`;
}

function history() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('username');
    location.href = `http://localhost:3000/history?username=${user}`;
}

function logOut() {
    location.href = `http://localhost:3000`;
}