import React, { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.click(event);
    }
  };
  render() {
    return (
      <>
        <div
          className="Overlay"
          onClick={this.props.click}
          onKeyDown={this.props.click}
        >
          <div className="Modal">
            <img
              className="img--modal"
              src={this.props.src}
              alt={this.props.alt}
            />
          </div>
        </div>
      </>
    );
  }
}