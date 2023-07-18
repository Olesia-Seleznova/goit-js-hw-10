import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const refs = {
  breedSelectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

fetchBreeds()
  .then(data => randerBreedslist(data))
  .catch(err => {
    refs.errorEl.hidden = true;
    console.log(err.message),
      Notiflix.Notify.failure(`${refs.errorEl.textContent}`);
  });

function randerBreedslist(data) {
  const catsInform = data
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  refs.breedSelectEl.insertAdjacentHTML('beforeend', catsInform);
  new SlimSelect({
    select: refs.breedSelectEl,
  });
}

refs.errorEl.hidden = true;

refs.breedSelectEl.addEventListener('change', createCatCard);

function createCatCard(evt) {
  refs.loaderEl.hidden = false;

  fetchCatByBreed(evt.target.value)
    .then(data => catCardRender(data))
    .catch(err => {
      refs.errorEl.hidden = true;
      console.log(err.message),
        Notiflix.Notify.failure(`${refs.errorEl.textContent}`);
    });
}

function catCardRender(data) {
  refs.loaderEl.hidden = true;
  let catInform = data[0];
  refs.catInfoEl.innerHTML = `<img class="cat-img" src="${catInform.url}" alt="${catInform.data[0].name}" width=400px>
        <div class="cat-info-card">
          <h1 class="cat-title">${catInform.data[0].name}</h1>
          <p class="cat-description">${catInform.data[0].description}</p>
          <p class="cat-temperament"><span class cat-temperament-description>Temperament: ${catInform.data[0].temperament}</span></p>
          </div>`;
}
