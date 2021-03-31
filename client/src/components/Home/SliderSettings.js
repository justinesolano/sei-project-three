export const sliderSettings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 2000,
  slidesToShow: 4,
  slidesToScroll: 2,
  initialSlide: 0,
  autoplay: true,
  focusOnSelect: true,
  dragable: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
      }
    }
  ]
}