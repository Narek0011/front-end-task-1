export const API_BASE_URL = 'http://localhost:3001'; // Best practice use it from the .env file

export const PRODUCTS_PER_PAGE = 6;

export const RATING_OPTIONS = [
  {value: '', label: 'All Ratings'},
  {value: '3', label: '3+ Stars'},
  {value: '3.5', label: '3.5+ Stars'},
  {value: '4', label: '4+ Stars'},
  {value: '4.5', label: '4.5+ Stars'},
];

export const INITIAL_FILTERS = {
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  minRating: '',
};