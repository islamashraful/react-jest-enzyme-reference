import React from "react";
import PropTypes from "prop-types";
import CarouselButton from "./CarouselButton";
import CarouselSlide from "./CarouselSlide";

class Carousel extends React.PureComponent {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
  };

  state = {
    slideIndex: 0,
  };

  handlePrevClick = () => {
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({
      slideIndex: (slideIndex + slides.length - 1) % slides.length, // 1
    }));
  };

  handleNextClick = () => {
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({
      slideIndex: (slideIndex + 1) % slides.length,
    }));
  };

  render() {
    const { slides, ...rest } = this.props;

    return (
      <div {...rest}>
        <CarouselSlide {...slides[this.state.slideIndex]} />
        <CarouselButton data-action="prev" onClick={this.handlePrevClick}>
          Prev
        </CarouselButton>
        <CarouselButton data-action="next" onClick={this.handleNextClick}>
          Next
        </CarouselButton>
      </div>
    );
  }
}

export default Carousel;
