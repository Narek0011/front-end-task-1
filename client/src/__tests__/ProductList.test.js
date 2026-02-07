import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/ProductList/ProductList';

const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    brand: 'Brand A',
    price: 99.99,
    rating: 4.5,
    imageUrl: 'https://picsum.photos/300/200',
  },
  {
    id: 2,
    name: 'Running Shoes',
    category: 'Footwear',
    brand: 'Brand C',
    price: 59.99,
    rating: 4.2,
    imageUrl: 'https://picsum.photos/300/200',
  },
];

describe('ProductList', () => {
  it('renders product cards for each product', () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Running Shoes')).toBeInTheDocument();
  });

  it('displays prices correctly', () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$59.99')).toBeInTheDocument();
  });

  it('displays brands', () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText('Brand A')).toBeInTheDocument();
    expect(screen.getByText('Brand C')).toBeInTheDocument();
  });

  it('shows empty state when no products', () => {
    render(<ProductList products={[]} />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try adjusting your filters to find what you're looking for."
      )
    ).toBeInTheDocument();
  });
});
