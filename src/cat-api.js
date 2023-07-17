// import axios from 'axios';

// axios.defaults.baseUrl = 'https://api.thecatapi.com/v1';
// axios.defaults.headers.common['x-api-key'] =
//   'live_7arTkVkDtzRbXdrHt3rFhCZt6PkcuYcQG1wgMdKkWepOr5tRNK0Z7U666i9nnXwx';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_7arTkVkDtzRbXdrHt3rFhCZt6PkcuYcQG1wgMdKkWepOr5tRNK0Z7U666i9nnXwx';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

// export function fetchBreeds() {
//   return axios.get('/breeds').then(resp => {
//     if (resp.status !== 200) {
//       throw new Error(resp.status);
//     }
//     return resp.json();
//   });

//   // .catch(err => console.log(err.message));
// }

// export function fetchCatByBreed(breedId) {
//   return axios
//     .get(
//       `images/search?breed_ids=${breedId}&api_key=live_7arTkVkDtzRbXdrHt3rFhCZt6PkcuYcQG1wgMdKkWepOr5tRNK0Z7U666i9nnXwx`
//     )
//     .then(resp => {
//       if (resp.status !== 200) {
//         throw new Error(resp.status);
//       }
//       return resp.json();
//     });
//   // .catch(err => console.log(err.message));
// }
