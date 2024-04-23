import React, { Component } from 'react';

export default class searchbar extends Component {
  render() {
    return (
      <div>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.props.query}>
            <button type="submit" className="SearchForm-button">
              <span className="button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              name="searchFormInput"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}
