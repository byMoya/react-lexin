require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('.http://127.0.0.1/images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className='index'>
        <img src={yeomanImage} alt='Yeoman Generator' />
        <div className='notice'>Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
