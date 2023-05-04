import React, { Component } from 'react';

import css from './App.module.css';
import { fetchPhoto } from '../../api/fetch-photo';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

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

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      console.log('Пішов запит');
      this.setState({ loading: true });

      await fetchPhoto(this.state.query, this.state.page)
        .then(res => {
          if (res.hits.length === 0) {
            alert('No images were found for your request');
            return;
          }
          this.setState(() => {
            return {
              photos: [...this.state.photos, ...res.hits],
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
    if (!search) {
      alert('Enter the request');
      return;
    }
    this.setState({ query: search, photos: [] });

    e.currentTarget.elements.search.value = '';
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, loading: true };
    });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery photos={this.state.photos}></ImageGallery>
        {this.state.loading && <Loader />}
        {this.state.totalItems > this.state.page * 12 &&
          !this.state.loading && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button handleClick={this.loadMore} />
            </div>
          )}
      </div>
    );
  }
}

export default App;
