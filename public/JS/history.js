window.onload = async function() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const user = urlParams.get('username');
        const response = await fetch('/getHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: user}),
        });
        const responseData = await response.json();
        result = ``;
        for (let item in responseData) {
            result += `
            <tr>
                <td>${responseData[item].date}</td>
                <td>${responseData[item].time}</td>
                <td class="text-capitalize">${responseData[item].city}</td>
                <td>${responseData[item].temperature}</td>
                <td>${responseData[item].description}</td>
                <td>${responseData[item].humidity}</td>
                <td>${responseData[item].pressure}</td>
                <td>${responseData[item].visibility}</td>
                <td>${responseData[item].windSpeed}</td>
                <td>${responseData[item].sunrise}</td>
                <td>${responseData[item].sunset}</td>
            </tr>`;
        }
        document.getElementById("historyBody").innerHTML = result;
    } catch (error) {
        console.error('Error: ', error);
    }
}