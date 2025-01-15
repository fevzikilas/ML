// This file contains JavaScript code to handle interactions on the website.

document.addEventListener('DOMContentLoaded', function() {
    const modelList = document.getElementById('model-list');
    const addModelForm = document.getElementById('add-model-form');

    // Fetch models from JSON or XML
    function fetchModels(format = 'json') {
        const url = format === 'json' ? 'data/models.json' : 'data/models.xml';
        fetch(url)
            .then(response => {
                if (format === 'json') {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (format === 'json') {
                    displayModels(data);
                } else {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data, "text/xml");
                    const models = Array.from(xmlDoc.getElementsByTagName('model')).map(model => ({
                        name: model.getElementsByTagName('name')[0].textContent,
                        algorithm: model.getElementsByTagName('algorithm')[0].textContent,
                        description: model.getElementsByTagName('description')[0].textContent
                    }));
                    displayModels(models);
                }
            })
            .catch(error => console.error('Error fetching models:', error));
    }

    // Display models in the list
    function displayModels(models) {
        modelList.innerHTML = '';
        models.forEach(model => {
            const listItem = document.createElement('li');
            listItem.textContent = `${model.name} - ${model.algorithm}: ${model.description}`;
            modelList.appendChild(listItem);
        });
    }

    // Handle form submission to add a new model
    addModelForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const modelName = document.getElementById('model-name').value;
        const modelAlgorithm = document.getElementById('model-algorithm').value;
        const modelDescription = document.getElementById('model-description').value;

        // Here you would typically send the new model data to a server or save it locally
        console.log('New model added:', { name: modelName, algorithm: modelAlgorithm, description: modelDescription });
        alert('Model added successfully!');

        // Clear the form
        addModelForm.reset();
    });

    // Initial fetch of models
    fetchModels('json'); // Change to 'xml' to fetch from XML
});