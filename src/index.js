const axios = require('axios').default;
import PicturesApiServices from './fetch-images';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  searchInput: document.querySelector('#search-input'),
  boxGallery: document.querySelector('.gallery'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  //   enableKeyboard: true,
});

const picturesApi = new PicturesApiServices();

refs.form.addEventListener('submit', searchInputQuery);

function searchInputQuery(event) {
  event.preventDefault();
  if (refs.searchInput.value !== '') {
    picturesApi.query = refs.searchInput.value;
    picturesApi.fetchPictures().then(dataSearch => {
      markupPictureCards(dataSearch);
      lightbox.refresh();
    });
  }
}

function markupPictureCards(dataSearch) {
  const markup = dataSearch.map(card => {
    return `<a href="${card.largeImageURL}"><div class="photo-card">
    <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${card.likes}</b>
      </p>
      <p class="info-item">
        <b>${card.views}</b>
      </p>
      <p class="info-item">
        <b>${card.comments}</b>
      </p>
      <p class="info-item">
        <b>${card.downloads}</b>
      </p>
    </div>
  </div></a>`;
  });
  refs.boxGallery.insertAdjacentHTML('beforeend', markup.join(''));
}
