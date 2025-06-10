// In a real app, this would be replaced with API calls to a backend
let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

let currentId = 2; // To generate new IDs

// DOM elements
const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userIdInput = document.getElementById('userId');
const submitBtn = document.getElementById('submitBtn');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

// Display users when page loads
document.addEventListener('DOMContentLoaded', displayUsers);

// Form submission
userForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = nameInput.value;
    const email = emailInput.value;
    const userId = userIdInput.value;
    
    if (userId) {
        // Update existing user
        updateUser(userId, name, email);
    } else {
        // Create new user
        createUser(name, email);
    }
    
    // Reset form
    userForm.reset();
    userIdInput.value = '';
    submitBtn.textContent = 'Add User';
});

// CREATE operation
function createUser(name, email) {
    currentId++;
    const newUser = { id: currentId, name, email };
    users.push(newUser);
    displayUsers();
}

// READ operation - display all users
function displayUsers() {
    userTable.innerHTML = '';
    
    users.forEach(user => {
        const row = userTable.insertRow();
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
    });
}

// UPDATE operation - load user data into form
function editUser(id) {
    const user = users.find(user => user.id === id);
    
    if (user) {
        userIdInput.value = user.id;
        nameInput.value = user.name;
        emailInput.value = user.email;
        submitBtn.textContent = 'Update User';
    }
}

// UPDATE operation - save changes
function updateUser(id, name, email) {
    const user = users.find(user => user.id === Number(id));
    
    if (user) {
        user.name = name;
        user.email = email;
        displayUsers();
    }
}

// DELETE operation
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== id);
        displayUsers();
    }
}
