import React, { Component } from 'react';

import HorizontalExample from './Components/HorizontalExample';
import VerticalExample from './Components/VerticalExample';
import VerticalHorizontalExample from './Components/VerticalHorizontalExample';

class App extends Component {
  render() {
    return (
      <>
        <VerticalExample />
        <br />
        <HorizontalExample />
        <br />
        <VerticalHorizontalExample />
      </>
    );
  }
}

export default App;
