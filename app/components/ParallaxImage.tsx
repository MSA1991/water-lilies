import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from 'react-parallax-mouse';
import flower from '../assets/images/flower.webp';
import leaf from '../assets/images/leaf.webp';

export const ParallaxImage = () => (
  <MouseParallaxContainer
    globalFactorX={0.1}
    globalFactorY={0.1}
    className="relative aspect-square w-full scale-110"
  >
    <MouseParallaxChild
      factorX={0.3}
      factorY={0.5}
      className="absolute left-0 top-0 z-10"
    >
      <img src={flower} alt="квітка водяної лілії" className="h-auto w-full" />
    </MouseParallaxChild>

    <MouseParallaxChild factorX={0.5} factorY={0.7}>
      <img src={leaf} alt="листок водяної лілії" className="h-auto w-full" />
    </MouseParallaxChild>
  </MouseParallaxContainer>
);
