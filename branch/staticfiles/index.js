const inputs = document.querySelectorAll('input');
const textAreas = document.querySelectorAll('textarea');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const first = document.getElementById('first');
const last = document.getElementById('last');
const number= document.getElementById('number');
const formBody = document.getElementById('form_body');
const create = document.getElementById('create');
const save = document.getElementById('save');
const deleteBtn = document.getElementById('delete');
let pageNo = 1;
let count = 0;
let branchNo = 1;

function prevReset(rest) {
  prev.disabled = rest;
  first.disabled = rest;
}

function nextReset(rest) {
  next.disabled = rest;
  last.disabled = rest;
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

prevReset(true);
nextReset(true);

async function retrieveData() {
  if (pageNo === 0) {
    return { count: 0 };
  }
  const data = await fetch(`http://127.0.0.1:8000/api/branches/?page=${pageNo}`);
  if (!data.ok) {
    throw new Error('Failed to retrieve data');
  }
  return await data.json();
}

async function main() {
  console.log(pageNo);
  const data = await retrieveData();
  console.log({data});
  if (data.count === 0) {
    console.log('No data found');
    count = 0;
    formBody.style.display = 'none';
    number.innerHTML = '0/0';
    save.disabled = true;
    deleteBtn.disabled = true;
    return;
  }
  
  branchNo = data.results[0].branch_id;
  
  inputs.forEach(input => {
    input.value = data.results[0][input.name];
  });
  
  textAreas.forEach(textArea => {
    textArea.innerHTML = data.results[0][textArea.name];
  })
  
  count = data.count;
  
  number.innerHTML = `${pageNo}/${count}`;
  pageNo === 1 ? prevReset(true) : prevReset(false);
  pageNo === count ? nextReset(true) : nextReset(false);

  save.disabled = false;
  deleteBtn.disabled = false;
}

next.onclick = async () => {
  pageNo++;
  main();
}

prev.onclick = async () => {
  pageNo--;
  main();
}

first.onclick = async () => {
  pageNo = 1;
  main();
}

last.onclick = async () => {
  pageNo = count;
  main();
}

document.getElementById('form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const method = event.submitter.value;
  
  let url = 'http://127.0.0.1:8000/api/branches/';
  
  if (method !== 'POST') {
    url += `${branchNo}/`;
  }
  
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
    },
  }

  if (method === 'PUT') {
    options.body = JSON.stringify(data);
    alert('Branch updated successfully');
  }

  await fetch(url, options);
  
  if (method === 'POST') {
    formBody.style.display = 'grid';
    pageNo = count + 1;
    main();
    alert('Branch created successfully');
  }
  
  if (method === 'DELETE') {
    pageNo -= 1;
    alert('Branch deleted successfully');
    main();
  }
});

main();
