export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string; // Optional image URL
  category: string; // Example property
  createdAt: string;
}

export interface CatalogItemCreationPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category: string;
}

export interface CatalogItemUpdatePayload {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  category?: string;
}
