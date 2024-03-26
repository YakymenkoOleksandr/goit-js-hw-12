import iziToast from 'izitoast'; // Бібліотека для повідомлень
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios'; // Бібліотека для запитів

const inputOfWords = document.querySelector('.inputOfWords'); // Інпут
const buttonForInput = document.querySelector('.buttonForInput'); // Кнопка

export let wordOfUser = '';
export let amountOfHits = 0;

buttonForInput.addEventListener('click', event => {
  // Надсилання запиту на сервер
  loaderF();
  event.preventDefault();
  userList.innerHTML = '';
  wordOfUser = inputOfWords.value.trim();
  checkInputValidity();
  inputOfWords.value = '';
});

export async function checkInputValidity() {
  // Перевірка валідності запиту
  return fetchImages()
    .then(images => {
      if (wordOfUser === '') {
        iziToast.show({
          color: 'red',
          message: `Sorry, the input field must be filled in to start the photo search.`,
          position: 'topCenter',
        });
      } else if (images.length === 0) {
        iziToast.show({
          color: 'red',
          message: `Sorry, there are no images matching your search query. Please try again!`,
          position: 'topCenter',
        });
      } else {
        renderImg(images);
      }
    })
    .catch(error => console.log(error))
    .finally(() => spanElementRem());
}

async function fetchImages() {
  // Запит на сервер для отримання даних про фотографії
  const myApiKey = '42977219-0f6c9f9217f976d8651793c3a';
  const params = {
    key: myApiKey,
    q: wordOfUser,
    image_type: 'photo',
    per_page: 15,
    orientation: 'horizontal',
    safesearch: true,
    page: loadPage,
  };

  const data = await axios
    .get('https://pixabay.com/api/', { params })
    .then(response => {
      if (!response.data.hits) {
        throw new Error('No images found');
      }
      const totalHits = response.data.totalHits;
      amountOfHits = totalHits;
      return response.data.hits;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });

  return data;
}

import {
  userList,
  renderImg,
  loaderF,
  spanElementRem,
  loadPage,
} from './render-functions.js';
