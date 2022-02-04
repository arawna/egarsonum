import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    src: "https://i.hizliresim.com/jefb9bj.png",
    altText: "QR Menü",
    caption: "Hemen Başvur",
  },
  {
    src: "https://i.hizliresim.com/7u2xt56.png",
    altText: "İlk Ay Ücretsiz",
    caption: "Hemen Başvur",
  },
  {
    src: "https://cdn.discordapp.com/attachments/866005754292994049/866034017089224774/dusukmaliyet.png",
    altText: "Düşük Maliyet",
    caption: "Hemen Başvur",
  },
];

export default function WelcomeImages() {
  let [activeIndex, setActiveIndex] = useState(0);
  let [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img
          src={item.src}
          className="img-fluid"
          style={{ height: "auto", width: "100%" }}
          alt={item.altText}
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.altText}
        />
      </CarouselItem>
    );
  });

  return (
    <div>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Önceki"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Sonraki"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
}
