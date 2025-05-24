import { defineStore } from 'pinia';
import type { CatalogItem, CatalogItemCreationPayload, CatalogItemUpdatePayload } from '~/modules/catalog/types';
import { catalogService } from '~/modules/catalog/services/catalogService';

export interface CatalogState {
  items: CatalogItem[];
  currentItem: CatalogItem | null;
  isLoading: boolean;
  error: string | null;
}

export const useCatalogStore = defineStore('catalog', {
  state: (): CatalogState => ({
    items: [],
    currentItem: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchItems() {
      this.isLoading = true;
      this.error = null;
      try {
        this.items = await catalogService.fetchItems();
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch catalog items';
      } finally {
        this.isLoading = false;
      }
    },
    async fetchItemById(id: string) {
      this.isLoading = true;
      this.error = null;
      try {
        this.currentItem = await catalogService.fetchItemById(id) || null;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch catalog item';
      } finally {
        this.isLoading = false;
      }
    },
    // CRUD actions (createItem, updateItem, deleteItem) will be added later
  },
});
