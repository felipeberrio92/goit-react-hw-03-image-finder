import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <>
        <li className="gallery-item" id={this.props.id}>
          <img src={this.props.src} alt={this.props.alt} />
        </li>
      </>
    );
  }
}
