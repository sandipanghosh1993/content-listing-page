import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchField from './SearchField';

describe('SearchField', () => {
  beforeEach(() => {
    render(<SearchField getFilteredData={() => {}} />);
  });

  it('should render icons', () => {
    expect(screen.getAllByRole('img').length).toBe(3);
  });

  it('should render a searchbox', () => {
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
