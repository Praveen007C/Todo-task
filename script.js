let entries = [];

// Function to add new entry
document.getElementById('add-entry').addEventListener('click', (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const entry = { description, amount, type };
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
    displayEntries();
    resetForm();
});

// Function to display entries
function displayEntries() {
    const entryList = document.getElementById('entry-list');
    entryList.innerHTML = '';
    entries.forEach((entry) => {
        const entryHTML = `
            <li>
                <span>${entry.description}</span>
                <span>$${entry.amount.toFixed(2)}</span>
                <span>${entry.type}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </li>
        `;
        entryList.innerHTML += entryHTML;
    });
    updateSummary();
}

// Function to update summary
function updateSummary() {
    const totalIncome = entries.reduce((acc, entry) => {
        if (entry.type === 'income') {
            return acc + entry.amount;
        }
        return acc;
    }, 0);
    const totalExpenses = entries.reduce((acc, entry) => {
        if (entry.type === 'expense') {
            return acc + entry.amount;
        }
        return acc;
    }, 0);
    const netBalance = totalIncome - totalExpenses;
    document.getElementById('total-income').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('total-expenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('net-balance').textContent = `$${netBalance.toFixed(2)}`;
}

// Function to reset form
function resetForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'income';
}

// Function to filter entries
document.querySelectorAll('input[name="filter"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        const filter = radio.id;
        if (filter === 'all') {
            displayEntries();
        } else {
            const filteredEntries = entries.filter((entry) => entry.type === filter);
            displayFilteredEntries(filteredEntries);
        }
    });
});

// Function to display filtered entries
function displayFilteredEntries(filteredEntries) {
    const entryList = document.getElementById('entry-list');
    entryList.innerHTML = '';
    filteredEntries.forEach((entry) => {
        const entryHTML = `
            <li>
                <span>${entry.description}</span>
                <span>$${entry.amount.toFixed(2)}</span>
                <span>${entry.type}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </li>
        `;
        entryList.innerHTML += entryHTML;
    });
    updateSummary();
}

// Function to edit entry
document.getElementById('entry-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit')) {
        const entryIndex = Array.prototype.indexOf.call(e.target.parentNode.parentNode.children, e.target.parentNode);
        const entry = entries[entryIndex];
        document.getElementById('description').value = entry.description;
        document.getElementById('amount').value = entry.amount;
        document.getElementById('type').value = entry.type;
    }
});

// Function to delete entry
document.getElementById('entry-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const entryIndex = Array.prototype.indexOf.call(e.target.parentNode.parentNode.children, e.target.parentNode);
        entries.splice(entryIndex, 1);
        localStorage.setItem('entries', JSON.stringify(entries));
        displayEntries();
    }
});

// Load entries from local storage
document.addEventListener('DOMContentLoaded', () => {
    const storedEntries = localStorage.getItem('entries');
    if (storedEntries) {
        entries = JSON.parse(storedEntries);
        displayEntries();
    }
});