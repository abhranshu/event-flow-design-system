export interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  price: number;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
} 