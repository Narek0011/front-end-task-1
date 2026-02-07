import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

describe('Pagination', () => {
  const basePagination = {
    page: 1,
    limit: 6,
    total: 30,
    totalPages: 5,
  };

  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination
        pagination={{ ...basePagination, totalPages: 1 }}
        currentPage={1}
        onPageChange={jest.fn()}
      />
    );

    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when pagination is null', () => {
    const { container } = render(
      <Pagination
        pagination={null}
        currentPage={1}
        onPageChange={jest.fn()}
      />
    );

    expect(container.innerHTML).toBe('');
  });

  it('displays total product count', () => {
    render(
      <Pagination
        pagination={basePagination}
        currentPage={1}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByText('30 products found')).toBeInTheDocument();
  });

  it('displays singular "product" for count of 1', () => {
    render(
      <Pagination
        pagination={{ ...basePagination, total: 1, totalPages: 2 }}
        currentPage={1}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByText('1 product found')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        pagination={basePagination}
        currentPage={1}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        pagination={basePagination}
        currentPage={5}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
  });

  it('highlights current page', () => {
    render(
      <Pagination
        pagination={basePagination}
        currentPage={3}
        onPageChange={jest.fn()}
      />
    );

    const currentBtn = screen.getByLabelText('Page 3');
    expect(currentBtn).toHaveAttribute('aria-current', 'page');
  });

  it('calls onPageChange when a page button is clicked', () => {
    const onPageChange = jest.fn();

    render(
      <Pagination
        pagination={basePagination}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Page 2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page when next is clicked', () => {
    const onPageChange = jest.fn();

    render(
      <Pagination
        pagination={basePagination}
        currentPage={2}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with previous page when previous is clicked', () => {
    const onPageChange = jest.fn();

    render(
      <Pagination
        pagination={basePagination}
        currentPage={3}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
