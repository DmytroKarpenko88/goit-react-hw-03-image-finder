import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handeKeyDowne);
  };

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handeKeyDowne);
  }

  handeKeyDowne = e => {
    if (e.code === 'Escape') {
      console.log('Close modal');
      this.props.onClose();
    }
  };

  handleBackDrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackDrop}>
        <div className={css.Modal}>
          <div style={{ width: 300, height: 200, backgroundColor: '#fff' }}>
            <img
              src={this.props.modalData.largeImageUrl}
              alt={this.props.modalData.altName}
            />
          </div>
          <button type="button" onClick={this.props.onClose}>
            close
          </button>
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
