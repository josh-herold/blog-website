
import { useEffect, useState } from 'react';
import useStrapiData from '../hooks/useStrapiData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Blog.css';


const Blog = () => {
  const { data: posts, loading } = useStrapiData('blogposts', [], {
    params: {
      populate: 'Bild'
    }
  });

  if (loading) return <p>Lade Beiträge...</p>;

  return (
    <div className='blog-container'>
      <div className='blog-header'>
      
      <motion.img
  src="src/assets/cam.jpg"
  alt=""
  initial={{ x: '-30vw', opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.0, duration: 0.7, ease: "easeOut" }}
/>
      <div className="blog-inside"></div>
      
      <motion.p 
      className="inside-text"
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
    >
      Willkommen auf meinem Foto‑ und Technik‑Blog! Hier teile ich Projekte,
      Tutorials und Einblicke hinter die Kulissen.
    </motion.p></div>
        
      
      {posts.length === 0 && <p>Keine Beiträge gefunden.</p>}
      <h1>Travel</h1>
      <div className="blog-grid">
        
  {posts.map(post => {
    const imageUrl = post.Bild?.url
      ? `http://localhost:1337${post.Bild.url}`
      : null;

    const altText = post.Bild?.alternativeText || post.Title;

    return (
        
        <Link to={`/blog/${post.slug}`}>
      <div className="blog-post" key={post.id}>
        <div className="blog-image">{imageUrl && <img className="blog-img" src={imageUrl} alt={altText} />}</div>
        <div className="blog-text"> <h3>{post.Title}</h3>
        
        <p>{post.Beschreibung}</p>
        <p className="blog-date">{new Date(post.publishedAt).toLocaleDateString()}</p>
</div>
        
       
      </div>
      </Link>
    );
  })}
</div>

    </div>
  );
};

export default Blog;


