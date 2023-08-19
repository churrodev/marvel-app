import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCharactersStore = defineStore('characters', {
    state: () => ({
      data: [] as any[]
    }),
    actions: {
      async FETCH_CHARACTERS(name: string) {
        /* const url = `http://localhost:8080/api/characters?limit=12&name=${name}` */
        const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=4949acb87cf20dc6fd0ded533e73fcea&hash=53a1a9fce51330825524d5f3fa64ad8c`
        const { data } = await axios.get(url)
        console.log(data)
        this.RECEIVE_CHARACTERS(data.results)
      },
      RECEIVE_CHARACTERS(characters: any[]) {
        this.data = characters
      }
    },
    getters: {
      characters() {
        return this.data.map(data => {
          return {
            name: data.name,
            url: data.urls[1] ? data.urls[1].url : data.urls[0].url,
            image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
            description: data.description === '' ? 'No description listed for this character.' : data.description
          }
        })
      }
    }
})