import type { CatalogItem, CatalogItemCreationPayload, CatalogItemUpdatePayload } from '~/modules/catalog/types';

let mockItems: CatalogItem[] = [
  { id: 'cat1', name: 'Smart Widget', description: 'A very smart widget for all your needs.', price: 29.99, stock: 150, category: 'Electronics', createdAt: new Date(Date.now() - 100000000).toISOString(), imageUrl: 'https://via.placeholder.com/150/007bff/ffffff?Text=SmartWidget' },
  { id: 'cat2', name: 'Durable Gadget', description: 'Built to last, this gadget is amazing.', price: 75.50, stock: 75, category: 'Gadgets', createdAt: new Date(Date.now() - 200000000).toISOString(), imageUrl: 'https://via.placeholder.com/150/28a745/ffffff?Text=DurableGadget' },
  { id: 'cat3', name: 'Eco Friendly Gizmo', description: 'Save the planet with this gizmo.', price: 15.00, stock: 300, category: 'Home Goods', createdAt: new Date(Date.now() - 50000000).toISOString(), imageUrl: 'https://via.placeholder.com/150/ffc107/000000?Text=EcoGizmo' },
  { id: 'cat4', name: 'Luxury Contraption', description: 'The finest contraption money can buy.', price: 199.99, stock: 30, category: 'Luxury', createdAt: new Date(Date.now() - 300000000).toISOString(), imageUrl: 'https://via.placeholder.com/150/dc3545/ffffff?Text=LuxuryContraption' },
];

export const catalogService = {
  fetchItems: async (): Promise<CatalogItem[]> => {
    console.log('CatalogService: Fetching items...');
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...mockItems];
  },

  fetchItemById: async (id: string): Promise<CatalogItem | undefined> => {
    console.log(`CatalogService: Fetching item by id ${id}...`);
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockItems.find(item => item.id === id);
  },

  createItem: async (itemData: CatalogItemCreationPayload): Promise<CatalogItem> => {
    console.log('CatalogService: Creating item...', itemData);
    await new Promise(resolve => setTimeout(resolve, 450));
    const newItem: CatalogItem = {
      id: `cat${mockItems.length + 1}`,
      ...itemData,
      createdAt: new Date().toISOString(),
    };
    mockItems.push(newItem);
    return newItem;
  },

  updateItem: async (id: string, itemData: CatalogItemUpdatePayload): Promise<CatalogItem | undefined> => {
    console.log(`CatalogService: Updating item ${id}...`, itemData);
    await new Promise(resolve => setTimeout(resolve, 450));
    const itemIndex = mockItems.findIndex(item => item.id === id);
    if (itemIndex === -1) return undefined;
    mockItems[itemIndex] = { ...mockItems[itemIndex], ...itemData };
    return mockItems[itemIndex];
  },

  deleteItem: async (id: string): Promise<boolean> => {
    console.log(`CatalogService: Deleting item ${id}...`);
    await new Promise(resolve => setTimeout(resolve, 450));
    const initialLength = mockItems.length;
    mockItems = mockItems.filter(item => item.id !== id);
    return mockItems.length < initialLength;
  },
};
