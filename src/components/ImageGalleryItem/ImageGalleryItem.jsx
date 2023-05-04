import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.protoType = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
