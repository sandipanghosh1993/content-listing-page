import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import App from './App';

describe('Poster', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should render a searchbox', async () => {
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should render all the posters and icons', () => {
    expect(screen.getAllByRole('img').length).toBe(23);
  });
});
