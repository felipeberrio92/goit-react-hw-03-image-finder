import Loader from './loader/Loader';
import ImageGallery from './imagegallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import { Component } from 'react';
import Button from './button/Button';
import Modal from './modal/Modal';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      img: '',
      alt: '',
      imageArray: [],
      page: 1,
      totalHits: 0,
      totalPages: 0,
      isLoading: false,
      toggleModal: false,
    };
    this.getQueryParams = this.getQueryParams.bind(this);
    this.updateGallery = this.updateGallery.bind(this);
    this.handleImageView = this.handleImageView.bind(this);
  }
  fetchAPI = query => {
    const API_KEY = '43480888-581f680cd405dc1334e7ef33b';
    return fetch(
      `https://pixabay.com/api/?q=${query}&safesearch=true&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
  };

  async getQueryParams(event) {
    event.preventDefault();
    this.setState({
      query: event.target.searchFormInput.value,
      page: 1,
      isLoading: true,
    });
    const images = await this.getImages(event.target.searchFormInput.value);
    this.setState({
      imageArray: [...images],
    });
    this.setState({ isLoading: false });
  }
  async updateGallery() {
    this.setState({ page: this.state.page + 1 });
    const newImages = await this.getImages(this.state.query);
    this.setState({
      imageArray: [...this.state.imageArray, ...newImages],
    });
  }
  async getImages(fetchData) {
    const response = await this.fetchAPI(fetchData);
    const data = await response.json();
    this.setState({
      totalHits: data.total,
      totalPages: Math.ceil(data.total / 12),
    });
    return data.hits;
  }
  handleImageView(event) {
    this.setState({
      toggleModal: !this.state.toggleModal,
      src: event.target.src,
      alt: event.target.alt,
    });
  }
  render() {
    return (
      <div>
        <Searchbar query={this.getQueryParams}></Searchbar>
        {this.state.isLoading ? (
          <Loader></Loader>
        ) : (
          <ImageGallery
            images={this.state.imageArray}
            zoom={this.handleImageView}
          ></ImageGallery>
        )}
        {this.state.totalHits > 12 &&
        this.state.page < this.state.totalPages ? (
          <div className="flex-center">
            <Button
              nameButton="Load More..."
              handleButton={this.updateGallery}
            />
          </div>
        ) : (
          <></>
        )}
        {this.state.toggleModal ? (
          <Modal
            click={this.handleImageView}
            src={this.state.src}
            alt={this.state.alt}
          ></Modal>
        ) : (
          <></>
        )}
      </div>
    );
  }
}