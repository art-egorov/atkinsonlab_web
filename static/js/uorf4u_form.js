// Get the form elements
const filterCheckbox = document.getElementById('sd');
const configSelect = document.getElementById('c');

// Add an event listener to the select element
configSelect.addEventListener('change', () => {
    // Check if the selected value is "eukaryotes"
    if (configSelect.value === 'eukaryotes') {
        // Set the checkbox's checked property to false and disable it
        filterCheckbox.checked = false;
        filterCheckbox.disabled = true;
    } else {
        // Enable the checkbox and check it if it was previously disabled
        filterCheckbox.disabled = false;
        if (!filterCheckbox.disabled) {
            filterCheckbox.checked = true;
        }
    }
});

// Add another event listener to the checkbox element
filterCheckbox.addEventListener('change', () => {
    // Check if the checkbox is checked
    if (filterCheckbox.checked) {
        // Enable the checkbox if "Bacteria" is selected in the dropdown
        if (configSelect.value === 'bacteria') {
            filterCheckbox.disabled = false;
        }
    } else {
        // Uncheck the checkbox if it is disabled
        if (filterCheckbox.disabled) {
            filterCheckbox.checked = false;
        }
    }
});
