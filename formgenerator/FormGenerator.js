const selectForm = () => {
    const form = document.querySelector('#form-select');

    createForm(1).then(form => {
        formContainer.innerHTML = '';
        formContainer.appendChild(form);
    })

    form.addEventListener('change', (event) => {
        if (event.target.tagName === 'SELECT') {
            createForm(event.target.value).then(form => {
                formContainer.innerHTML = '';
                formContainer.appendChild(form);
            })
        }
    });
};

const createForm = async (id) => {
    const form = document.createElement('form');
    const response = await fetch(`./data/form-test-${id}.json`);
    const parsedData = await response.json();

    parsedData.fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        form.appendChild(label);

        if (field.attrs.type === 'select') {
            const select = document.createElement('select');
            select.name = field.attrs.name;
            select.className = 'form-control';
            field.attrs.variants.forEach(variant => {
                const option = document.createElement('option');
                option.value = variant.value;
                option.textContent = variant.label;
                select.appendChild(option);
            });
            form.appendChild(select);
        } else if (['radio', 'checkbox'].includes(field.attrs.type)) {
            field.attrs.variants.forEach(variant => {
                const input = document.createElement('input');
                input.type = field.attrs.type;
                input.name = field.attrs.name;
                input.value = variant.value;
                input.className = 'form-control';

                const label = document.createElement('label');
                label.textContent = variant.label;

                form.appendChild(input);
                form.appendChild(label);
            });
        } else {
            const input = document.createElement(field.attrs.type === 'textarea' ? 'textarea' : 'input');
            input.className = 'form-control';
            input.type = field.attrs.type;
            input.name = field.attrs.name;
            form.appendChild(input);
        }
    });

    parsedData.buttons.forEach(button => {
        const input = document.createElement('input');
        input.type = 'submit';
        input.className = 'btn btn-dark w-100 my-2';
        input.value = button;
        form.appendChild(input);
    });

    return form;
};

const formContainer = document.getElementById('form-container');
selectForm()
