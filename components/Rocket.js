import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import rocketAnimation from '../public/rocket.json';

const Rocket = () => {
  const anime = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: rocketAnimation,
    });
    return () => lottie.stop();
  }, []);
  return <div style={{ height: 250, width: 300 }} ref={anime} />;
};

export default Rocket;
