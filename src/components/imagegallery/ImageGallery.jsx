import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';

export default class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className="ImageGallery" onClick={this.props.zoom}>
          {this.props.images.map(image => {
            return (
              <ImageGalleryItem
                id={image.id}
                src={image.largeImageURL}
                alt={image.tags}
              />
            );
          })}
        </ul>
      </>
    );
  }
}