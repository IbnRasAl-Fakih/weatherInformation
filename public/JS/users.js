window.onload = async function() {
    try {
        const response = await fetch('/getUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const responseData = await response.json();
        result = ``;
        for (let item in responseData) {
            result += `
            <tr>
                <td>${Number(item)+ 1}</td>
                <td>${responseData[item]._id}</td>
                <td>${responseData[item].name}</td>
                <td>${responseData[item].password}</td>
                <td>${responseData[item].createdAt}</td>
                <td>${responseData[item].updatedAt}</td>
                <td>${responseData[item].adminStatus}</td>
                <td>
                    <button onclick="deleteUser('${responseData[item].name}')" class="bg-danger p-1 button"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
                    <button onclick="editUser('${responseData[item].name}')" class="bg-success p-1 button"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg></button>
                </td>
            </tr>`;
        }
        document.getElementById("usersBody").innerHTML = result;
    } catch (error) {
        console.error('Error: ', error);
    }
}

async function deleteUser(name) {
    document.getElementById("username").value = name;
    document.getElementById("deleteUser").click();
}

function editUser(name) {
    document.getElementById("editTable").classList.remove("d-none");
    document.getElementById("editName").value = name;
    location.href = "#editTable";
}

function editFunction() {
    document.getElementById("adminStatus").value = document.getElementById("myCheckbox").checked;
    document.getElementById("editButton").click();
}