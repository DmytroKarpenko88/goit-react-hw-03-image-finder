import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, tags, largeImageUrl, openModalWindow }) => {
  const newModalData = {
    largeImageUrl: largeImageUrl,
    altName: tags,
  };

  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => openModalWindow(newModalData)}
    >
      <img src={url} alt={tags} className={css.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.protoType = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
