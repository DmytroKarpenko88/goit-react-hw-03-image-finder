import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ photos }) => {
  return (
    <ul className={css.ImageGallery}>
      {/* <!-- Набір <li> із зображеннями --> */}
      {photos.map(({ webformatURL, tags }, index) => {
        return (
          <ImageGalleryItem
            key={index}
            webformatURL={webformatURL}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
