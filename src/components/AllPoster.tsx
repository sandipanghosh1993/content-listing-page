import React from 'react';
import Poster from './Poster';

interface AllPosterProps {
  filteredData: any;
}

interface AllPosterState {
  pageSize: number;
  content: any[];
  page: number;
}

class AllPoster extends React.Component<AllPosterProps, AllPosterState> {
  public constructor(props: AllPosterProps) {
    super(props);
    this.state = {
      pageSize: 0,
      content: [],
      page: 1
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  public static getDerivedStateFromProps(props: any, state: any) {
    if (props.filteredData) {
      return {
        content: props.filteredData
      };
    }
    return {};
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
    const posterInfo1 = require('../API/CONTENTLISTINGPAGE-PAGE1.json');
    this.setState({
      pageSize: parseInt(posterInfo1.page['page-size-returned']),
      content: posterInfo1.page['content-items'].content
    });
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  public handleScroll() {
    const poster: any = document.getElementsByClassName('Posterdiv')[0];
    const yScroll =
      window.pageYOffset != undefined
        ? pageYOffset
        : document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (
      (Math.floor(this.state.pageSize / 3) - 3) * poster.offsetHeight <
      Math.floor(yScroll)
    ) {
      if (this.state.page === 1) {
        const posterInfo2 = require('../API/CONTENTLISTINGPAGE-PAGE2.json');
        this.setState({
          pageSize:
            this.state.pageSize +
            parseInt(posterInfo2.page['page-size-returned']),
          content: [
            ...this.state.content,
            ...posterInfo2.page['content-items'].content
          ],
          page: this.state.page + 1
        });
      } else if (this.state.page === 2) {
        const posterInfo3 = require('../API/CONTENTLISTINGPAGE-PAGE3.json');
        this.setState({
          pageSize:
            this.state.pageSize +
            parseInt(posterInfo3.page['page-size-returned']),
          content: [
            ...this.state.content,
            ...posterInfo3.page['content-items'].content
          ],
          page: this.state.page + 1
        });
      }
    }
  }

  public getPoster() {
    if (this.state.content.length) {
      const posterList = [...this.state.content];
      const newList = [];
      while (posterList.length) {
        newList.push(posterList.splice(0, 3));
      }
      const allPoster = [];
      for (let i = 0; i < newList.length; i++) {
        let styleObj = {};
        if (i == 0) {
          styleObj = { marginTop: window.innerHeight * 0.06 };
        }
        allPoster.push(
          <div style={styleObj} key={i}>
            {newList[i].map((e: any, index: number) => {
              let aPoster = null;
              if (e['poster-image'] === 'posterthatismissing.jpg') {
                aPoster = require('../Slices/placeholder_for_missing_posters.png');
              } else {
                aPoster = require(`../Slices/${e['poster-image']}`);
              }
              const margin =
                index === 1
                  ? `0px ${Math.round(window.innerWidth * 0.02)}px ${Math.round(
                      window.innerWidth * 0.03
                    )}px ${Math.round(window.innerWidth * 0.02)}px`
                  : `0px 0px ${Math.round(window.innerWidth * 0.03)}px 0px`;
              return (
                <div
                  className="Posterdiv"
                  style={{ float: 'left', margin }}
                  key={index}
                >
                  <Poster
                    posterImage={aPoster}
                    name={e.name}
                    width={Math.round(window.innerWidth * 0.3)}
                    height={Math.round(window.innerHeight * 0.24)}
                  />
                </div>
              );
            })}
          </div>
        );
      }
      return allPoster;
    }
    return null;
  }

  public render() {
    return <div>{this.getPoster()}</div>;
  }
}

export default AllPoster;
