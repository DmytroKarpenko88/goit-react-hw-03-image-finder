import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './App.module.css';
import { fetchPhoto } from '../../api/fetch-photo';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

// import PropTypes from 'prop-types';

class App extends Component {
  state = {
    page: 1,
    query: '',
    photos: [],
    totalItems: 0,
    loading: false,
    isModalShow: false,
    modalData: {
      largeImageUrl: '',
      altName: '',
    },
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

  async componentDidUpdate(_, prevState) {
    const { query, page, photos } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });

      await fetchPhoto(query, page)
        .then(res => {
          if (res.hits.length === 0) {
            Notify.failure('No images were found for your request');
            return;
          }
          this.setState(() => {
            Notify.success(`We found ${res.total} images`);
            return {
              photos: [...photos, ...res.hits],
              totalItems: res.total,
            };
          });
        })
        .catch(error => Notify.failure(error.message))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const search = e.currentTarget.elements.search.value;
    if (!search) {
      Notify.failure('Enter the request');
      return;
    }
    this.setState({ query: search, photos: [], page: 1 });

    e.currentTarget.elements.search.value = '';
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, loading: true };
    });
  };

  toggleModalIsSow = () => {
    this.setState(({ isModalShow }) => ({
      isModalShow: !isModalShow,
    }));
  };

  openModalWindow = newModalData => {
    if (newModalData.largeImageUrl !== this.state.modalData.largeImageUrl) {
      this.setState(() => {
        return {
          modalData: { ...newModalData },
        };
      });
    }
    this.toggleModalIsSow();
  };

  render() {
    const { photos, loading, totalItems, page, isModalShow, modalData } =
      this.state;

    const { onSubmit, openModalWindow, loadMore, toggleModalIsSow } = this;

    return (
      <div className={css.App}>
        {/* ---------Searchbar------------- */}

        <Searchbar onSubmit={onSubmit} />

        {/* ---------Gallery------------- */}

        <ImageGallery
          photos={photos}
          openModalWindow={openModalWindow}
        ></ImageGallery>
        {loading && <Loader />}
        {photos.length > 0 && totalItems > page * 12 && !loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button handleClick={loadMore} />
          </div>
        )}
        <>
          {/* ---------Modal window------------- */}

          {isModalShow && (
            <Modal modalData={modalData} onClose={toggleModalIsSow} />
          )}
        </>
      </div>
    );
  }
}

export default App;
