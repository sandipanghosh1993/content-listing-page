import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface SearchFieldProps {
  getFilteredData: any;
}

interface SearchFieldState {
  text: string;
}

class SearchField extends React.Component<SearchFieldProps, SearchFieldState> {
  public constructor(props: SearchFieldProps) {
    super(props);
    this.state = {
      text: ''
    };
  }

  public getAllPages() {
    const posterInfo1 = require('../API/CONTENTLISTINGPAGE-PAGE1.json');
    const posterInfo2 = require('../API/CONTENTLISTINGPAGE-PAGE2.json');
    const posterInfo3 = require('../API/CONTENTLISTINGPAGE-PAGE3.json');
    const newList = [
      ...posterInfo1.page['content-items'].content,
      ...posterInfo2.page['content-items'].content,
      ...posterInfo3.page['content-items'].content
    ];
    return newList;
  }

  public handleSearch(text: string) {
    const newList = this.getAllPages();
    const filteredData = newList.reduce((result: any[], elem: any) => {
      const name = elem.name.toUpperCase();
      if (name.search(text.toUpperCase()) !== -1) {
        result.push(elem);
      }
      return result;
    }, []);
    this.props.getFilteredData(filteredData);
  }

  public render() {
    return (
      <div>
        <img
          style={{
            top: 0,
            border: '0px',
            position: 'fixed',
            background: '#000000',
            width: '100%'
          }}
          src={require('../Slices/nav_bar.png')}
          alt={'search'}
          height={window.innerHeight * 0.0525 + 'px'}
        />
        <input
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            top: 0,
            border: '0px',
            width: window.innerWidth - 50 + 'px',
            height: window.innerHeight * 0.0525 + 'px',
            position: 'fixed',
            left: '35px'
          }}
          type="search"
          placeholder="Search..."
          value={this.state.text}
          onChange={(event: any) => {
            this.setState({ text: event.target.value });
          }}
        />
        <img
          style={{
            top: 0,
            border: '0px',
            position: 'fixed',
            left: window.innerWidth - 40 + 'px',
            backgroundColor: '#000000',
            marginTop: window.innerHeight * 0.0078 + 'px'
          }}
          src={require('../Slices/search.png')}
          alt={'search'}
          height={window.innerHeight * 0.03 + 'px'}
          onClick={() => {
            this.handleSearch(this.state.text);
          }}
        />
        <img
          style={{
            top: 0,
            border: '0px',
            position: 'fixed',
            background: '#000000',
            marginTop: window.innerHeight * 0.0078 + 'px'
          }}
          src={require('../Slices/Back.png')}
          alt={'back'}
          height={window.innerHeight * 0.03 + 'px'}
          onClick={() => {
            this.setState({ text: '' });
            this.props.getFilteredData(this.getAllPages());
          }}
        />
      </div>
    );
  }
}

export default SearchField;
