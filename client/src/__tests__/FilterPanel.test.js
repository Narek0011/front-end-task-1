import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from '../components/FilterPanel/FilterPanel';

const mockFilterOptions = {
  categories: ['Electronics', 'Footwear', 'Clothing'],
  brands: ['Brand A', 'Brand B', 'Brand C', 'Brand D'],
  priceRange: { min: 30, max: 500 },
  ratingRange: { min: 3.5, max: 4.8 },
};

const defaultFilters = {
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  minRating: '',
};

describe('FilterPanel', () => {
  it('renders all filter groups', () => {
    render(
      <FilterPanel
        filterOptions={mockFilterOptions}
        filters={defaultFilters}
        onFilterChange={jest.fn()}
        onReset={jest.fn()}
        hasActiveFilters={false}
      />
    );

    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Brand')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimum Rating')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimum price')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum price')).toBeInTheDocument();
  });

  it('renders category options from API data', () => {
    render(
      <FilterPanel
        filterOptions={mockFilterOptions}
        filters={defaultFilters}
        onFilterChange={jest.fn()}
        onReset={jest.fn()}
        hasActiveFilters={false}
      />
    );

    const categorySelect = screen.getByLabelText('Category');
    // "All Categories" + 3 from API
    expect(categorySelect.options).toHaveLength(4);
    expect(categorySelect.options[1].textContent).toBe('Electronics');
    expect(categorySelect.options[2].textContent).toBe('Footwear');
    expect(categorySelect.options[3].textContent).toBe('Clothing');
  });

  it('calls onFilterChange when category is selected', () => {
    const onFilterChange = jest.fn();

    render(
      <FilterPanel
        filterOptions={mockFilterOptions}
        filters={defaultFilters}
        onFilterChange={onFilterChange}
        onReset={jest.fn()}
        hasActiveFilters={false}
      />
    );

    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'Electronics' },
    });

    expect(onFilterChange).toHaveBeenCalledWith('category', 'Electronics');
  });

  it('calls onFilterChange when brand is selected', () => {
    const onFilterChange = jest.fn();

    render(
      <FilterPanel
        filterOptions={mockFilterOptions}
        filters={defaultFilters}
        onFilterChange={onFilterChange}
        onReset={jest.fn()}
        hasActiveFilters={false}
      />
    );

    fireEvent.change(screen.getByLabelText('Brand'), {
      target: { value: 'Brand B' },
    });

    expect(onFilterChange).toHaveBeenCalledWith('brand', 'Brand B');
  });

  it('calls onFilterChange when min price is entered', () => {
    const onFilterChange = jest.fn();

    render(
      <FilterPanel
        filterOptions={mockFilterOptions}
        filters={defaultFilters}
        onFilterChange={onFilterChange}
        onReset={jest.fn()}
        hasActiveFilters={false}
      />
    );

    fireEvent.change(screen.getByLabelText('Minimum price'), {
      target: { value: '50' },
    });

    expect(onFilterChange).toHaveBeenCalledWith('minPrice', '50');
  });

  it('calls onFilterChange when rating is selected', () => {
    const onFilterChange = jest.fn();

    render(
      <FilterPanel
        filterOptions={mockFilterOptions}
        filters={defaultFilters}
        onFilterChange={onFilterChange}
        onReset={jest.fn()}
        hasActiveFilters={false}
      />
    );

    fireEvent.change(screen.getByLabelText('Minimum Rating'), {
      target: { value: '4' },
    });

    expect(onFilterChange).toHaveBeenCalledWith('minRating', '4');
  });

  it('does not show reset button when no filters are active', () => {
    render(
      <FilterPanel
        filterOptions={mockFilterOptions}
        filters={defaultFilters}
        onFilterChange={jest.fn()}
        onReset={jest.fn()}
        hasActiveFilters={false}
      />
    );

    expect(screen.queryByText('Clear All Filters')).not.toBeInTheDocument();
  });

  it('shows reset button when filters are active and calls onReset', () => {
    const onReset = jest.fn();

    render(
      <FilterPanel
        filterOptions={mockFilterOptions}
        filters={{ ...defaultFilters, category: 'Electronics' }}
        onFilterChange={jest.fn()}
        onReset={onReset}
        hasActiveFilters={true}
      />
    );

    const resetBtn = screen.getByText('Clear All Filters');
    expect(resetBtn).toBeInTheDocument();

    fireEvent.click(resetBtn);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('returns null when filterOptions is null', () => {
    const { container } = render(
      <FilterPanel
        filterOptions={null}
        filters={defaultFilters}
        onFilterChange={jest.fn()}
        onReset={jest.fn()}
        hasActiveFilters={false}
      />
    );

    expect(container.innerHTML).toBe('');
  });
});
