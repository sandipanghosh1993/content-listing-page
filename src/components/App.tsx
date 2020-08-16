import React, { Suspense } from 'react';
import Poster from './Poster';
import SearchField from './SearchField';

const AllPoster: any = React.lazy(() => import('./AllPoster'));

interface AppProps {}

interface AppState {
  filteredData: any;
}

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = {
      filteredData: null
    };
  }

  public getFilteredData(data: any) {
    this.setState({ filteredData: data });
  }

  public render() {
    return (
      <div>
        <Suspense
          fallback={
            <h2 style={{ color: 'white', textAlign: 'center' }}>Loading...</h2>
          }
        >
          <SearchField getFilteredData={this.getFilteredData.bind(this)} />
          <AllPoster filteredData={this.state.filteredData} />
        </Suspense>
      </div>
    );
  }
}

export default App;
