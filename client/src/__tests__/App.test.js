import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Mock the API service
jest.mock('../services/api', () => ({
  fetchProducts: jest.fn(),
  fetchFilters: jest.fn(),
}));

const { fetchProducts, fetchFilters } = require('../services/api');

const mockFilterOptions = {
  categories: ['Electronics', 'Footwear'],
  brands: ['Brand A', 'Brand B'],
  priceRange: { min: 30, max: 500 },
  ratingRange: { min: 3.5, max: 4.8 },
};

const mockProductsResponse = {
  data: [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      brand: 'Brand A',
      price: 99.99,
      rating: 4.5,
      imageUrl: 'https://picsum.photos/300/200',
    },
  ],
  pagination: { page: 1, limit: 6, total: 1, totalPages: 1 },
};

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    fetchProducts.mockReturnValue(new Promise(() => {})); // never resolves
    fetchFilters.mockReturnValue(new Promise(() => {}));

    render(<App />);

    expect(screen.getByText('Loading products...')).toBeInTheDocument();
    expect(screen.getByText('Loading filters...')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    fetchProducts.mockResolvedValue(mockProductsResponse);
    fetchFilters.mockResolvedValue(mockFilterOptions);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    });

    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('renders filter panel after loading', async () => {
    fetchProducts.mockResolvedValue(mockProductsResponse);
    fetchFilters.mockResolvedValue(mockFilterOptions);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText('Category')).toBeInTheDocument();
    });

    expect(screen.getByLabelText('Brand')).toBeInTheDocument();
  });

  it('shows error state when products API fails', async () => {
    fetchProducts.mockRejectedValue(new Error('Network error'));
    fetchFilters.mockResolvedValue(mockFilterOptions);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('renders the header', () => {
    fetchProducts.mockReturnValue(new Promise(() => {}));
    fetchFilters.mockReturnValue(new Promise(() => {}));

    render(<App />);

    expect(screen.getByText('ProductStore')).toBeInTheDocument();
  });
});
