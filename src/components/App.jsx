import React, { Component } from 'react';
// import axios from 'axios';

import { Container } from './App.styled';
import { fetchPhoto } from '../api/fetch-photo';
import Searchbar from './Searchbar/Searchbar';
// import { nanoid } from 'nanoid';

// import PropTypes from 'prop-types';

class App extends Component {
  state = {
    page: 1,
    query: '',
    photos: [],
    totalItems: 0,
    loading: false,
  };

  // componentDidMount() {
  //   this.setState({ loading: true });

  //   fetchPhoto(this.state.query, this.state.page)
  //     .then(res => {
  //       this.setState(() => {
  //         return {
  //           photos: [...this.state.photos, ...res.hits],
  //           totalItems: res.total,
  //         };
  //       });
  //     })
  //     .catch(error => console.log('Error'))
  //     .finally(() => this.setState({ loading: false }));
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.query);
  }

  handleFormSubmit = query => {
    console.log(query);
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <Container>
          <h2>SearchGallery</h2>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </Container>

        {this.state.loading && <h1>loading...</h1>}
        {this.state.photos && <h2>Gallery</h2>}

        <ul>
          {this.state.photos.map(({ webformatURL, tags }, index) => {
            return (
              <li key={index} className="gallery-item">
                <img src={webformatURL} alt={tags} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
