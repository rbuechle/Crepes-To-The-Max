const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async function () {
  const user = JSON.parse(sessionStorage.getItem('user')); // get user stored in session storage

  const apiKey = user.api_key; // user's API key
  console.log(apiKey);

  const url = "https://ict4510.herokuapp.com/api/menus?api_key=" + apiKey;

  const token = user.token; // user's session token
  console.log(token);

  const menuItem = {
    item: document.getElementById('item').value,
    description: document.getElementById('desc').value,
    price: document.getElementById('price').value
  }; // object that stores item name, description, and price from dashboard form
  console.log(item);

  // attempt to submit item to API
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(menuItem)
  });
  console.log(response);
});