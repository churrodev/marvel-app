import { defineStore } from 'pinia';
import axios from 'axios';
import type { SeriesDetails, Result } from '@/interface/SeriesDetails.interface';

export const useSeriesDetailStore = defineStore('seriesDetail', {
  state: () => ({
    seriesDetail: {} as Result,
    relatedStories: [] as Result[],
    relatedComics: [] as Result[],
  }),
  actions: {
    async fetchSeriesDetail(id: number) {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const apiKey = import.meta.env.VITE_API_KEY;
      const hash = import.meta.env.VITE_HASH;

      const response = await axios.get<SeriesDetails>(`${baseURL}/public/series/${id}?ts=1&apikey=${apiKey}&hash=${hash}`);
      this.seriesDetail = response.data.data.results[0];

      if (this.seriesDetail.stories.available) {
        const storiesResponse = await axios.get<SeriesDetails>(`${baseURL}/public/series/${id}/stories?ts=1&apikey=${apiKey}&hash=${hash}`);
        this.relatedStories = storiesResponse.data.data.results;
      }

      if (this.seriesDetail.comics.available) {
        const comicsResponse = await axios.get<SeriesDetails>(`${baseURL}/public/series/${id}/comics?ts=1&apikey=${apiKey}&hash=${hash}`);
        this.relatedComics = comicsResponse.data.data.results;
      }
    },

    toggleFavorite(id: number) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const index = favorites.indexOf(id);
      if (index === -1) {
        favorites.push(id);
      } else {
        favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
});