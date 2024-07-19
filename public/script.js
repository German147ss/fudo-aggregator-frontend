document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Upload the file
        const uploadResponse = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error('File upload failed');
        }

        const jsonResponse = await uploadResponse.json();
        displayFormattedData(jsonResponse);
    } catch (error) {
        alert(error.message);
    }
});

function displayFormattedData(data) {
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = '';

    data.forEach(group => {
        const groupElement = document.createElement('div');
        groupElement.className = 'group';

        const groupTitle = document.createElement('h2');
        groupTitle.textContent = `${group.Grupo}`;
        groupElement.appendChild(groupTitle);

        const groupInfo = document.createElement('p');
        groupInfo.innerHTML = `<strong>Cantidad:</strong> ${group.Cantidad}<br><strong>Gasto:</strong> $${group.Gasto.toFixed(2)}`;
        groupElement.appendChild(groupInfo);

        outputElement.appendChild(groupElement);
    });
}
