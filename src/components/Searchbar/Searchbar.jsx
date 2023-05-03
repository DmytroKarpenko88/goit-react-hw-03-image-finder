import { Component } from 'react';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = evt => {
    this.setState({ inputValue: evt.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.inputValue.trim() === '') {
      alert('Зробіть запит');
      return;
    }
    this.props.onSubmit(this.state.inputValue.toLowerCase().trim());
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
