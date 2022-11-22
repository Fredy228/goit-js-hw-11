const axios = require('axios').default;

export default class PicturesApiServices {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY_API = '31525078-c25aa98820f24120add7be3d2';
    const paramentrsFetch = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const resaltSearch = await axios.get(
      `${BASE_URL}?key=${KEY_API}&q=${this.searchQuery}${paramentrsFetch}`
    );
    const dataSearch = resaltSearch.data.hits;
    console.log(dataSearch);
    return dataSearch;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery.trim();
  }
}
