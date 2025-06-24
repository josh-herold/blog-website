// components/Hero.jsx
import { useEffect, useState } from 'react';
import useStrapiData from './hooks/useStrapiData';
import fallbackData from './hero-backup.json';
import './Hero.css';

const Hero = () => {
  const [heroImage, setHeroImage] = useState(null);

  // Hero-Text laden
  const { data: heroTextData } = useStrapiData('hero-text', fallbackData.heroText);
  const heroText = heroTextData?.HeroText || fallbackData.heroText;

  // Bilder laden
  const { data, loading } = useStrapiData(
    'header-images',
    [],
    { params: { populate: '*' } }
  );

  // Bild-URL extrahieren und setzen
  useEffect(() => {
    if (!loading && data.length > 0) {
      const imageData = data[0]?.headerImage?.[0];
      if (imageData?.url) {
        const imageUrl = `http://localhost:1337${imageData.url}`;
        setHeroImage(imageUrl);
      }
    }
  }, [data, loading]);

  return (
    <div className="hero-container" id="hero">
      <div className="hero-image-container">
        {heroImage ? (
          <img src={heroImage} alt="HeroTest" className="hero-image" />
        ) : (
          <p>Lade Bild...</p>
        )}
      </div>
      <div className="hero-text-container">
        {heroText ? <p>{heroText}</p> : <p>Lade Text...</p>}
      </div>
    </div>
  );
};

export default Hero;
