import './style.css';
import Swal from 'sweetalert2';

const coinInput = document.querySelector('#coin-input');
const sendButton = document.querySelector('#send-button');
const sectionMain = document.getElementById('section-main');
const divMain = document.getElementById('div-main');

const number = 3;
sendButton.addEventListener('click', (event) => {
  event.preventDefault();
  divMain.innerHTML = '';
  sectionMain.innerHTML = '';
  fetch(`https://api.exchangerate.host/latest?base=${coinInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (coinInput.value.length === 0) {
        throw new Error('Você precisa passar uma moeda');
      }
      if (coinInput.value !== data.base) {
        throw new Error('Moeda inexistente');
      }
      const object = Object.entries(data.rates);
      const h2 = document.createElement('h2');
      h2.className = 'text';
      h2.innerHTML = `Valores referentes à 1${coinInput.value} <br>`;
      divMain.appendChild(h2);
      object.forEach((coin) => {
        const div = document.createElement('div');
        div.className = 'manyCoins';
        div.innerHTML = `${coin[0]}:<span class='coinValue'>
        ${coin[1].toFixed(number)}</span>`;
        sectionMain.appendChild(div);
      });
    })
    .catch((error) => Swal.fire({
      text: error.message,
      title: 'Oops...',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#48bd46',
      confirmButtonTextColor: 'black',
      color: '#fff',
      background: 'rgba(30, 30, 30, 0.6)',
    }));
});
