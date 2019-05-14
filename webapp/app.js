const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout');

// Login Logic
loginForm.onsubmit = loginAndStore;
async function loginAndStore(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log('email, password', email, password);
  const response = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
     })
  });
  console.log("response", response);

  const data = await response.json();
  console.log("data", data);

  localStorage.setItem('accessToken', data.token);
};

// Logout Logic
logoutButton.onclick = logoutAndDeleteStore;
function logoutAndDeleteStore() {
  localStorage.removeItem('accessToken');
};
