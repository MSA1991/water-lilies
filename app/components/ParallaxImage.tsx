import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from 'react-parallax-mouse';

import flower from '../assets/images/flower.webp';
import flowerMobile from '../assets/images/flower-mobile.webp';
import leaf from '../assets/images/leaf.webp';
import leafMobile from '../assets/images/leaf-mobile.webp';

export const ParallaxImage = () => (
  <MouseParallaxContainer
    globalFactorX={0.1}
    globalFactorY={0.1}
    className="relative aspect-square w-full scale-110"
  >
    <MouseParallaxChild
      factorX={0.3}
      factorY={0.5}
      className="absolute inset-0 z-10"
    >
      <picture>
        <source
          srcSet={flowerMobile}
          media="(max-width: 1023px)"
          type="image/webp"
        />

        <img
          src={flower}
          className="h-auto w-full"
          alt="квітка водяної лілії"
          width="860"
          height="860"
        />
      </picture>
    </MouseParallaxChild>

    <MouseParallaxChild factorX={0.5} factorY={0.7}>
      <picture>
        <source
          srcSet={leafMobile}
          media="(max-width: 1023px)"
          type="image/webp"
        />

        <img
          src={leaf}
          className="h-auto w-full"
          alt="листок водяної лілії"
          width="860"
          height="860"
        />
      </picture>
    </MouseParallaxChild>
  </MouseParallaxContainer>
);
