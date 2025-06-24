import { useEffect, useState } from 'react'
import useStrapiData from './hooks/useStrapiData';
import fallbackData from './hero-backup.json';
import './Header.css'

const Header = () => {
  const [headerImage, setHeroImage] = useState(null);

  const { data: headerTextData } = useStrapiData('header-text', fallbackData.heroText);
  const headerText = headerTextData?.HeaderText || fallbackData.heroText;

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
    <div className="header-container">
      <div className="header-image-container">
        {headerImage ? (
          <img src={headerImage} alt="Header" className="header-image" />
        ) : (
          <p>Lade Bild...</p>
        )}
        <div className="header-image-text">{headerText ? <p>{headerText}</p> : <p>Lade Text...</p>}</div>
      </div>
    </div>
  );
};

export default Header;
