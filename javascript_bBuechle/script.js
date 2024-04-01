const overlay = document.getElementById('overlay');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const signinButton = document.getElementById('signin-button');
const cancelButton = document.getElementById('cancel-button');

// determine if an admin is logged in
function isAdmin () {
  if (sessionStorage.getItem('user')) return true;
  else return false;
}

// determine if user is currently on admin dashboard page
function isOnDashboard () {
  if (window.location.href.slice(-15) === '/dashboard.html') return true;
  else return false;
}

// perform initial page actions based on admin login presence
function checkForAdmin () {
  if (isOnDashboard() && !isAdmin()) {
    window.location.replace("./index.html");
  }
  else if (isAdmin()) {
    logoutButton.classList.remove('hidden'); // unhide logout button
  }
}

// display log-in or navigate to dashboard if admin is logged in
loginButton.addEventListener('click', () => {
  if (isAdmin()) window.location.href = "./dashboard.html";
  else overlay.classList.remove('hidden');
});

// hide overlay again when cancel button is clicked
cancelButton.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

signinButton.addEventListener('click', async function () {
  const login = { 
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  }; // object that stores values of username and password form fields

  // attempt to log into API with username and password
  const response = await fetch('https://ict4510.herokuapp.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(login)
  });

  // if login is successful
  if (response.ok) {
    const user = (await response.json()).user; // user object from API response

    overlay.classList.add('hidden'); // hide overlay
    logoutButton.classList.remove('hidden'); // unhide logout button

    sessionStorage.setItem('user', JSON.stringify(user)); // store user object

    window.location.href = "./dashboard.html"; // redirect to dashboard page
  }
});

// log out of admin account
logoutButton.addEventListener('click', () => {
  sessionStorage.removeItem('user'); // delete user object from session storage
  logoutButton.classList.add('hidden'); // hide logout button
  loginButton.classList.remove('hidden'); // unhide login button
  if (isOnDashboard()) window.location.replace("./index.html");
});

checkForAdmin();