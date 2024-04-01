const menuList = document.getElementById('menu');

async function getItems () {
  const apiKey = JSON.parse(sessionStorage.getItem('user')).api_key; // user's API key
  url = "https://ict4510.herokuapp.com/api/menus?api_key=" + apiKey;

  const response = await fetch(url, {
    method: 'GET'
  });
  console.log(response);

  if (response.ok) {
    const menu = (await response.json()).menu; // user object from API response
    console.log(menu);
    return menu;
  }
}

async function populateMenu (promise) {
  const array = await promise;
  array.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

    const div1 = document.createElement('div');
    div1.classList.add('ms-2', 'me-auto');

    const div2 = document.createElement('div');
    div2.classList.add('fw-bold');
    div2.appendChild(document.createTextNode(item.item));

    div1.appendChild(div2);
    div1.appendChild(document.createTextNode(item.description));

    const span = document.createElement('span');
    span.classList.add('badge', 'bg-success', 'rounded-pill');
    span.appendChild(document.createTextNode(`$${item.price}`));

    li.appendChild(div1);
    li.appendChild(span);

    menuList.appendChild(li);
  });
}

populateMenu(getItems());