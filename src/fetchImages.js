import axios from 'axios';

const searchImages = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export default class ImagesApiServise {
  constructor() {
    this.searchQuery = ' ';
    this.page = 1;
  }

  async fetchImages() {
    const params = {
      q: this.searchQuery.trim(),
      key: '35001315-ff900fe6dc9bb67b55de16f8c',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    };

    try {
      const response = await searchImages.get('', { params });
      this.page += 1;
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1
  }
}
