import { defineStore } from 'pinia';
import axios from 'axios';
import type { Series, Data, Result } from '@/interface/Series.interface';

export const useSeriesStore = defineStore('series', {
  state: () => ({
    loading: false,
    initialLoading: true,
    page: 1,
    seriesData: {} as Series,
    hasMore: true,
    searchResults: [] as Result[],
    searchMode: false,
  }),
  actions: {
    async FETCH_SERIES() {
      if (this.loading || !this.hasMore) return;
      this.loading = true;
      try {
        const limit = 8;
        const offset = (this.page - 1) * limit;
        const url = `${import.meta.env.VITE_BASE_URL}/public/series?ts=1&apikey=${import.meta.env.VITE_API_KEY}&hash=${import.meta.env.VITE_HASH}&limit=${limit}&offset=${offset}`;
        const response = await axios.get<Series>(url);

        if (this.page === 1) {
          this.SET_SERIES_DATA(response.data);
          this.initialLoading = false; 
        } else {
          this.ADD_SERIES_DATA(response.data);
        }
  
        if (response.data.data.count < limit) {
          this.hasMore = false; 
        }
  
        this.page++;

      } catch (error) {
        console.error('Error al obtener las series:', error);
      }
      this.loading = false;
    },
    SET_SERIES_DATA(data: Series) {
      this.seriesData = data;
    },
    ADD_SERIES_DATA(data: Series) {
      this.seriesData.data?.results.push(...data.data?.results || []);
    },
    async SEARCH_SERIES(name: string) {
      if (!name) {
        this.searchResults = [];
        this.searchMode = false;
        return;
      }

      this.loading = true;
      
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/public/series?ts=1&apikey=${import.meta.env.VITE_API_KEY}&hash=${import.meta.env.VITE_HASH}&titleStartsWith=${name}`;
        const response = await axios.get<Series>(url);
        this.searchResults = response.data.data?.results || [];
      } catch (error) {
        console.error('Error al buscar las series:', error);
        this.searchResults = [];
      }

      this.loading = false;
      this.searchMode = true;

    }    
  },
  getters: {
    seriesResults(): Result[] {
      return this.seriesData.data?.results || [];
    },
    searchSeriesResults(): Result[] {
      return this.searchResults;
    }
  }  
});
