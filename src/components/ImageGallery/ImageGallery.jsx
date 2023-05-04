import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ photos, openModalWindow }) => {
  return (
    <ul className={css.ImageGallery}>
      {/* <!-- Набір <li> із зображеннями --> */}
      {photos.map(({ webformatURL, tags, largeImageUrl }, index) => {
        return (
          <ImageGalleryItem
            key={index}
            url={webformatURL}
            tags={tags}
            openModalWindow={openModalWindow}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
