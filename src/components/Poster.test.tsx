import React from 'react';
import { render, screen } from '@testing-library/react';
import Poster from './Poster';

describe('Poster', () => {
  beforeEach(() => {
    render(
      <Poster
        posterImage={require('../Slices/poster1.jpg')}
        name="testposter"
        width={100}
        height={100}
      />
    );
  });

  it('should render a poster', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render text', () => {
    expect(screen.getByText('testposter')).toBeInTheDocument();
  });
});
