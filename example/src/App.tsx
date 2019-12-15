import React, { Component } from 'react';

import HorizontalExample from './Components/HorizontalExample';
import VerticalExample from './Components/VerticalExample';

class App extends Component {
  render() {
    return (
      <>
        <VerticalExample />
        <br />
        <HorizontalExample />
      </>
    );
  }
}

export default App;
