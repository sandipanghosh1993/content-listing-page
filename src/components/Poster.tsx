import React from 'react';

interface PosterProps {
  posterImage: string;
  name: string;
  width: number;
  height: number;
}

interface PosterState {}

class Poster extends React.Component<PosterProps, PosterState> {
  public constructor(props: PosterProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <>
        <img
          src={this.props.posterImage}
          alt={this.props.name}
          width={this.props.width + 'px'}
          height={this.props.height + 'px'}
        />
        <p
          style={{
            color: 'white',
            marginTop: '0px',
            whiteSpace: 'nowrap',
            maxWidth: this.props.width + 'px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {this.props.name}
        </p>
      </>
    );
  }
}

export default Poster;
