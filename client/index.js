document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAlla')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});


const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const typerecherche = document.querySelector('#typerecherche').value;
    const searchValue = document.querySelector('#search-input').value;
    if (typerecherche == 1) {
        fetch('http://localhost:5000/searchn/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
    } else {
        fetch('http://localhost:5000/searchg/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
    }

};
const updateBtn = document.querySelector('#update-row-btn');


function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');
    

    console.log(updateNameInput);

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
};


function insertRowIntoTable(data) {
    
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Supprimer</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Modifier</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {    
    const table = document.querySelector('table tbody');

    if (data.length === 0) {                            // Retourne "Aucun Résultat" si il n'ya a pas de donnée //
        table.innerHTML = "<tr><td class='no-data' colspan='5'>Aucun résultat</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, name, groupe,  date_added, age}) {   // Retourne les données s'il y en a //
        
        tableHtml += "<tr class>";
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${groupe}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td>${age}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Supprimer</td>`;
        tableHtml += `<td><button class="edit-row-btn"  data-id=${id}>Modifier</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
    
}