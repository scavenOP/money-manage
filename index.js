



var apis=["https://money-management-6dvx.onrender.com/api/MoneyManagement/test","https://money-management-mampi.onrender.com/api/MoneyManagement/test"]

var apitouse;

window.onload = function() {
    var username = localStorage.getItem('username');
     // Get the transaction form and the login button
  var transactionForm = document.getElementById('transaction-form');
  var homeloginButton = document.getElementById('login-button');

    // Get the All Transactions link
  var allTransactionsLink = document.querySelector('.navbar-nav .nav-item:nth-child(2) .nav-link');
  var addTransactionsLink = document.querySelector('.navbar-nav .nav-item:nth-child(1) .nav-link');
  var expenseLink = document.querySelector('.navbar-nav .nav-item:nth-child(3) .nav-link');
  var loginButton = document.getElementById('login-item');
  var signupButton = document.getElementById('signup-item');
  var usernameDisplay = document.getElementById('username-display');
  var logoutButton = document.getElementById('logout-item');
  var loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {});

  var user = localStorage.getItem('username');

if(user){
  if(user === 'niladri'){
    apitouse="https://money-management-6dvx.onrender.com";
  }else{
    console.log("mampi");
    apitouse="https://money-management-mampi.onrender.com";
  }
}


  Promise.all([
    fetch(apis[0]),
    fetch(apis[1])
  ])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(data => {
    // Hide the loading page and show the content
    document.getElementById('page-loading').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('loading').textContent = 'Failed to load data from the server.';
  });
  
    if (!username) {
      // Open the login modal
      

      
      loginModal.show();
      // Disable the All Transactions link
    allTransactionsLink.classList.add('disabled');
    allTransactionsLink.href = '#';

    addTransactionsLink.classList.add('disabled');
    expenseLink.classList.add('disabled');

    // If the user is not logged in, hide the transaction form and show the login button
    transactionForm.style.display = 'none';
    homeloginButton.style.display = 'block';
    homeloginButton.addEventListener('click', function() {
      // Open the login modal
      // Replace 'loginModal' with the id of your login modal
      loginModal.show();
    });
    }else {
        signupButton.style.display = 'none';
      loginButton.style.display = 'none';
      usernameDisplay.textContent = 'Hi ' + username;
    usernameDisplay.style.display = 'block';
    logoutButton.style.display = 'block';
        // Enable the All Transactions link
        allTransactionsLink.classList.remove('disabled');
        addTransactionsLink.classList.remove('disabled');
        expenseLink.classList.remove('disabled');
        allTransactionsLink.href = '/all-transactions';

        transactionForm.style.display = 'block';
    homeloginButton.style.display = 'none';
      }
  };



  document.getElementById('add-transaction-item').addEventListener('click', function(event) {
    event.preventDefault();
  
    // Show the transaction form
    document.getElementById('transaction-form').style.display = 'block';
  });



  function myFunction() {
    document.getElementById("submitB").disabled = true;
  }

function submitForm(event) {
    event.preventDefault();

    myFunction();


    var submitButto = document.getElementById('submitB');
    if (submitButto) {
      console.log("apitouse");
    }
    submitButto.innerHTML = 'Loading...';
    submitButto.disabled = true;

    let formData = new FormData(event.target);
    let jsonObject = {};

    for (const [key, value] of formData.entries()) {
      jsonObject[key] = value;
    }

    // Add the current date to the jsonObject
    jsonObject.date = new Date().toISOString();
    jsonObject.user = localStorage.getItem('username');
    

    fetch(
      `${apitouse}/api/MoneyManagement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Data inserted successfully");
          submitButto.textContent = 'Submit';
      submitButto.disabled = false;
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
      

      this.reset();
  }

  document.querySelector("form").addEventListener("submit", submitForm);


  document.querySelector('.navbar-nav .nav-item:nth-child(2) .nav-link').addEventListener('click', function(event) {
    event.preventDefault();
    // Remove the form
    document.querySelector('.transaction-form').remove();
    // Show the loading screen
document.getElementById('loading-screen').style.display = 'block';


fetch(`${apitouse}/api/MoneyManagement/${localStorage.getItem("username")}`)
    .then(response => response.json())
    .then(data => {
        
        // Hide the loading screen
  document.getElementById('loading-screen').style.display = 'none';

  if (data.length === 0) {
    alert('No transactions found.');
    location.reload();
    return;
}

        // Create the container
        let container = document.createElement('div');
        container.classList.add('container', 'mt-5');

        // Create the table
        let table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-hover', 'table-bordered');

        // Add table headers
        let thead = document.createElement('thead');
        thead.classList.add('table-dark');
        let headerRow = document.createElement('tr');
        Object.keys(data[0]).forEach(key => {
            if (key !== 'id') {
                let th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            }
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Add table body
        let tbody = document.createElement('tbody');
        data.forEach(transaction => {
            let row = document.createElement('tr');
            Object.entries(transaction).forEach(([key, value]) => {
                if (key !== 'id') {
                    let td = document.createElement('td');
                    if (key === 'date') {
                        let date = new Date(value);
                        value = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                    }
                    td.textContent = value;
                    row.appendChild(td);
                }
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Add the table to the container
        container.appendChild(table);
        // Add the container to the body
        document.body.appendChild(container);

        // Create the back button
        let backButton = document.createElement('button');
        backButton.textContent = 'Go back to form';
        backButton.classList.add('btn', 'btn-primary', 'mt-5');
        backButton.style.display = 'block';
        backButton.style.margin = '0 auto';
        backButton.addEventListener('click', function() {
  location.reload();
});

        // Add the back button to the body
        document.body.appendChild(backButton);
    })
    .catch((error) => console.error('Error:', error));
});


document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault();
  
    var loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {});
    loginModal.show();
  });
  
  document.getElementById('signup-link').addEventListener('click', function(event) {
    event.preventDefault();
  
    var signupModal = new bootstrap.Modal(document.getElementById('signupModal'), {});
    signupModal.show();
  });

  document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault();
  
     // Remove the local variable
  localStorage.removeItem('username');

  // Clear the username display and hide it
  var usernameDisplay = document.getElementById('username-display');
  usernameDisplay.textContent = '';
  usernameDisplay.style.display = 'none';

  // Show the login and signup buttons
  document.getElementById('login-item').style.display = 'block';
  document.getElementById('signup-item').style.display = 'block';

  // Hide the logout button
  document.getElementById('logout-item').style.display = 'none';

  // Redirect to "/"
  window.location.href = 'https://scavenop.github.io/money-manage';
  });


  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var submitButton = document.getElementById('login-sumbmit-button');

    // Add a loader to the button and disable it
    submitButton.innerHTML = 'Loading...';
    submitButton.disabled = true;
  
    // Get the form data
    var loginUsername = document.getElementById('loginUsername').value;
    var loginPassword = document.getElementById('loginPassword').value;
  
    // Make the API call to login
    fetch(`https://money-management-6dvx.onrender.com/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: loginUsername,
    password: loginPassword
  }),
})
.then(response => {
  if (response.status === 401) {
    throw new Error('Incorrect username or password.');
  }
  return response.text();
})
.then(username => {
  if (username) {
    // Close the modal
    document.querySelector('#loginModal .btn-close').click();

    // Store the username and update the page
    localStorage.setItem('username', username);
    document.getElementById('login-item').style.display = 'none';
    document.getElementById('signup-item').style.display = 'none';
    document.getElementById('logout-item').style.display = 'block';

    // Display the username
    var usernameDisplay = document.getElementById('username-display');
    usernameDisplay.textContent = 'Hi ' + username;
    usernameDisplay.style.display = 'block';
    document.getElementById('transaction-form').style.display = 'block';
    var allTransactionsLink = document.querySelector('.navbar-nav .nav-item:nth-child(2) .nav-link');
    allTransactionsLink.classList.remove('disabled');
    var addTransactionsLink = document.querySelector('.navbar-nav .nav-item:nth-child(1) .nav-link');
    addTransactionsLink.classList.remove('disabled');
    var expenseLink = document.querySelector('.navbar-nav .nav-item:nth-child(3) .nav-link');
    expenseLink.classList.remove('disabled');

    var homeloginButton = document.getElementById('login-button');
    homeloginButton.style.display = 'none';
  }
  location.reload();
})
.catch((error) => alert(error.message));
  });
  
  document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get the form data
    var signupUsername = document.getElementById('signupUsername').value;
    var signupPassword = document.getElementById('signupPassword').value;
  
    // Make the API call to sign up
    fetch(`https://money-management-6dvx.onrender.com/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: signupUsername,
        password: signupPassword
      }),
    })
    .then(response => {
      if (response.status === 200) {
        document.querySelector('#signupModal .btn-close').click();
        alert('Signed up successfully.');
      }

      
    })
    .catch((error) => console.error('Error:', error));
  });