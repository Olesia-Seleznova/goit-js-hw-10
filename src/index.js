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

refs.breedSelectEl.addEventListener('click', getBreedColection);

refs.loaderEl.hidden = false;
refs.errorEl.hidden = true;

function getBreedColection(evt) {
  refs.loaderEl.hidden = true;

  fetchBreeds()
    .then(data => randerBreedslist(data))
    .catch(err => Notiflix.Notify.failure(`${refs.errorEl.textContent}`));
}

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

refs.catInfoEl.addEventListener('change', createCatCard);

function createCatCard(evt) {
  refs.loaderEl.hidden = false;
  fetchCatByBreed(evt.currentTarget.value)
    .then(data => catCardRender(data))
    .catch(err => Notiflix.Notify.failure(`${refs.errorEl.textContent}`));
}

function catCardRender(data) {
  let catInform = data[0];
  refs.catInfoEl.innerHTML = `<img class="cat-img" src="${catInform.cfa_url}" alt="${catInform.name}" width=400px>
        <div class="cat-info-card">
          <h1 class="cat-title">${catInform.name}</h1>
          <p class="cat-description">${catInform.description}</p>
          <p class="cat-temperament"><span class cat-temperament-description>Temperament: ${catInform.temperament}</span></p>
          </div>`;
}
