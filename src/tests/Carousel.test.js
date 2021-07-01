import React from "react";
import { shallow, mount } from "enzyme";
import Carousel, { Carousel as CoreCarousel } from "../Carousel";
import CarouselButton from "../CarouselButton";
import CarouselSlide from "../CarouselSlide";

describe("Carousel", () => {
  let wrapper;
  const slides = [
    {
      imgUrl: "https://example.com/slide1.png",
      description: "Slide 1",
      attribution: "Uno Pizzeria",
    },
    {
      imgUrl: "https://example.com/slide2.png",
      description: "Slide 2",
      attribution: "Dos Equis",
    },
    {
      imgUrl: "https://example.com/slide3.png",
      description: "Slide 3",
      attribution: "Three Amigos",
    },
  ];

  // beforeEach(() => {
  //   wrapper = shallow(<Carousel slides={slides} />);
  // });

  // it("has an initial `slideIndex` of 0", () => {
  //   expect(wrapper.state("slideIndex")).toBe(0);
  // });

  // it("decrements `slideIndex` when Prev is clicked", () => {
  //   wrapper.setState({ slideIndex: 1 });
  //   wrapper.find('[data-action="prev"]').simulate("click");
  //   expect(wrapper.state("slideIndex")).toBe(0);
  // });

  // it("increments `slideIndex` when Next is clicked", () => {
  //   wrapper.setState({ slideIndex: 1 });
  //   wrapper.find('[data-action="next"]').simulate("click");
  //   expect(wrapper.state("slideIndex")).toBe(2);
  // });

  // it("renders the current slide as a CarouselSlide", () => {
  //   let slideProps;
  //   slideProps = wrapper.find(CarouselSlide).props();
  //   expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[0] });

  //   wrapper.setState({ slideIndex: 1 });
  //   slideProps = wrapper.find(CarouselSlide).props();
  //   expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[1] });
  // });

  // describe("with last slide selected", () => {
  //   it("slideIndex set to 0 when Next is clicked", () => {
  //     wrapper.setState({ slideIndex: slides.length - 1 });
  //     wrapper.find('[data-action="next"]').simulate("click");
  //     expect(wrapper.state("slideIndex")).toBe(0);
  //   });
  // });

  // describe("with the first slide selected", () => {
  //   it("`slideIndex` to the max value when Prev is clicked", () => {
  //     wrapper.setState({ slideIndex: 0 });
  //     wrapper.find('[data-action="prev"]').simulate("click");
  //     expect(wrapper.state("slideIndex")).toBe(slides.length - 1);
  //   });
  // });

  // describe("with a middle slide selected", () => {
  //   beforeEach(() => {
  //     wrapper.setState({ slideIndex: 1 });
  //   });

  describe("component with HOC", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Carousel slides={slides} />);
    });

    it("should set slideIndex={0} on the core component", () => {
      expect(wrapper.find(CoreCarousel).prop("slideIndex")).toBe(0);
    });

    it("should pass `slides` to the core component", () => {
      expect(wrapper.find(CoreCarousel).prop("slides")).toBe(slides);
    });

    it("allows `slideIndex` to be controlled", () => {
      const mounted = mount(<Carousel slides={slides} slideIndex={1} />);
      expect(mounted.find(CoreCarousel).prop("slideIndex")).toBe(1);
      mounted.setProps({ slideIndex: 0 });
      expect(mounted.find(CoreCarousel).prop("slideIndex")).toBe(0);
    });
  });

  describe("core component", () => {
    const slideIndexDecrement = jest.fn();
    const slideIndexIncrement = jest.fn();
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <CoreCarousel
          slides={slides}
          slideIndex={0}
          slideIndexDecrement={slideIndexDecrement}
          slideIndexIncrement={slideIndexIncrement}
        />
      );
    });

    it("should render a <div>", () => {
      expect(wrapper.type()).toBe("div");
    });

    it('renders a CarouselButton labeled "Prev"', () => {
      expect(
        wrapper
          .find(CarouselButton)
          .at(0)
          .prop("children")
      ).toBe("Prev");
    });

    it('renders a CarouselButton labeled "Next"', () => {
      expect(
        wrapper
          .find(CarouselButton)
          .at(1)
          .prop("children")
      ).toBe("Next");
    });

    it("passes defaultImg and defaultImgHeight to the CarouselSlide", () => {
      const defaultImg = () => "test";
      const defaultImgHeight = 1234;
      wrapper.setProps({ defaultImg, defaultImgHeight });
      expect(wrapper.find(CarouselSlide).prop("Img")).toBe(defaultImg);
      expect(wrapper.find(CarouselSlide).prop("imgHeight")).toBe(
        defaultImgHeight
      );
    });

    it("allows individual slides to override Img and imgHeight", () => {
      const Img = () => "test";
      const imgHeight = 1234;
      wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }] });
      expect(wrapper.find(CarouselSlide).prop("Img")).toBe(Img);
      expect(wrapper.find(CarouselSlide).prop("imgHeight")).toBe(imgHeight);
    });

    it("renders the current slide as a CarouselSlide", () => {
      let slideProps;
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[0],
      });
      wrapper.setProps({ slideIndex: 1 });
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...CarouselSlide.defaultProps,
        ...slides[1],
      });
    });

    it("decrements `slideIndex` when Prev is clicked", () => {
      wrapper.find('[data-action="prev"]').simulate("click");
      expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });

    it("increments `slideIndex` when Next is clicked", () => {
      wrapper.find('[data-action="next"]').simulate("click");
      expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
    });
    // });
  });
});
