import React from 'react';
import { useParams } from 'react-router-dom';
import useStrapiData from '../hooks/useStrapiData';
import './BlogDetail.css';

const imageBaseUrl = 'http://localhost:1337';

const BlogDetail = () => {
  const { slug } = useParams();

  const { data: posts, loading } = useStrapiData('blogposts', [], {
    params: {
      filters: {
        slug: { $eq: slug },
      },
      populate: ['Bild', 'contentImages'],
    },
  });

  if (loading) return <p>Lade Beitrag...</p>;

  const post = posts[0];
  if (!post) return <p>Beitrag nicht gefunden</p>;

  const imageUrl = post.Bild?.url ? `${imageBaseUrl}${post.Bild.url}` : null;

  return (
    <div className="blog-detail-container">
      {imageUrl && <img src={imageUrl} className="detail-image" alt={post.Title} />}

      <div className="blog-detail-header">
        <h1>{post.Title}</h1>
        <p>{post.Beschreibung}</p>
      </div>

      <div className="blog-content">
  {post.Content.map((block, i) => (
    <React.Fragment key={i}>
      {/* Textblock */}
      {renderBlock(block, i)}

      {/* Bild links/rechts alternierend nur alle 3 Absätze */}
      {i % 3 === 0 && post.contentImages?.[Math.floor(i / 3)] && (
        <div className={`flow-image ${Math.floor(i / 3) % 2 === 0 ? 'flow-left' : 'flow-right'}`}>
          <img src={imageBaseUrl + post.contentImages[Math.floor(i / 3)].url} alt={`Bild ${Math.floor(i / 3) + 1}`} />
          {/*<div className="image-caption">{`Bild ${Math.floor(i / 3) + 1}`}</div>*/}
        </div>
      )}
    </React.Fragment>
  ))}
</div>

    </div>
  );
};

const renderBlock = (block, i) => {
  switch (block.type) {
    case 'paragraph':
      return <p key={i}>{renderChildren(block.children)}</p>;
    case 'heading':
      const HeadingTag = `h${block.level || 2}`;
      return <HeadingTag key={i}>{renderChildren(block.children)}</HeadingTag>;
    case 'quote':
      return <blockquote key={i}>{renderChildren(block.children)}</blockquote>;
    case 'ul':
      return (
        <ul key={i}>
          {block.children.map((li, j) => (
            <li key={j}>{renderChildren(li.children)}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i}>
          {block.children.map((li, j) => (
            <li key={j}>{renderChildren(li.children)}</li>
          ))}
        </ol>
      );
    default:
      return null;
  }
};

const renderChildren = (children) => {
  return children.map((child, j) => {
    let text = child.text;
    if (child.bold) text = <strong key={`b-${j}`}>{text}</strong>;
    if (child.italic) text = <em key={`i-${j}`}>{text}</em>;
    if (child.underline) text = <u key={`u-${j}`}>{text}</u>;
    if (child.url) {
      return (
        <a key={`a-${j}`} href={child.url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    }
    return <span key={j}>{text}</span>;
  });
};

export default BlogDetail;
