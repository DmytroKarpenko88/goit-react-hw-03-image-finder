import React, { Component } from 'react';
import axios from 'axios';

import { Container } from './App.styled';
// import { nanoid } from 'nanoid';

// import PropTypes from 'prop-types';

class App extends Component {
  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '34271519-257a556d5fe8c31a240fa9516';

  value = 'cat';
  numberPage = 1;

  config = {
    params: {
      key: this.API_KEY,
      q: this.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.numberPage,
      per_page: 12,
    },
  };

  componentDidMount() {
    const { BASE_URL, config } = this;
    axios.get(BASE_URL, config).then(console.log);
  }

  render() {
    return (
      <>
        <Container>
          <h2>SearchGallery</h2>
        </Container>
      </>
    );
  }
}

export default App;
