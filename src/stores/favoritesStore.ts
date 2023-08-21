import { defineStore } from 'pinia';
import type { Result } from '@/interface/SeriesDetails.interface';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as Result[],
    errorMessage: '',
  }),
  actions: {
    addFavorite(series: Result) {
      if (this.favorites.length >= 10) {
        this.errorMessage = 'You have reached the maximum of 10 favorites!';
        return;
      } else if (!this.favorites.some(fav => fav.id === series.id)) {
        this.favorites.push(series);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.errorMessage = '';
      }
    },
    removeFavorite(seriesId: number) {
      const index = this.favorites.findIndex(fav => fav.id === seriesId);
      if (index !== -1) {
        this.favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.errorMessage = '';
      }
    },
    isFavorite(seriesId: number) {
      return this.favorites.some(fav => fav.id === seriesId);
    }
  }
});