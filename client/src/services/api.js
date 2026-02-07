import {API_BASE_URL} from '../constants';

function buildQueryString(params) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
}

export async function fetchProducts(params = {}) {
  const query = buildQueryString(params);
  const url = `${API_BASE_URL}/products${query ? `?${query}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch products (status ${response.status})`);
  }

  return response.json();
}

export async function fetchFilters() {
  const url = `${API_BASE_URL}/filters`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch filters (status ${response.status})`);
  }

  return response.json();
}
