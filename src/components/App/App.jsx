import React, { Component } from 'react';
// import axios from 'axios';

import css from './App.module.css';
import { fetchPhoto } from '../../api/fetch-photo';
import Searchbar from '../Searchbar/Searchbar';
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
    if (prevState.query !== this.state.query) {
      console.log('Пішов запит');
      this.setState({ loading: true });

      fetchPhoto(this.state.query, this.state.page)
        .then(res => {
          this.setState(() => {
            return {
              photos: [...res.hits],
              totalItems: res.total,
            };
          });
        })
        .catch(error => console.log('Error'))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const search = e.currentTarget.elements.search.value;

    this.setState({ query: search });
    console.log('this.state.query', this.state.query);
    e.currentTarget.elements.search.value = '';
  };

  render() {
    return (
      <div>
        <div className={css.App}>
          <h2>SearchGallery</h2>
          <Searchbar onSubmit={this.onSubmit} />
        </div>

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
