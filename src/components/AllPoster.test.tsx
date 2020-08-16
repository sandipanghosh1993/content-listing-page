import React from 'react';
import { render, screen } from '@testing-library/react';
import AllPoster from './AllPoster';

describe('AllPoster', () => {
  beforeEach(() => {
    render(<AllPoster filteredData={null} />);
  });

  it('should render all the posters', () => {
    expect(screen.getAllByRole('img').length).toBe(20);
  });
});
