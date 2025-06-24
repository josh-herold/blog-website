import React from 'react';

export const renderRichText = (content) => {
  if (!Array.isArray(content)) return null;

  return content.map((block, i) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={i}>{renderChildren(block.children)}</p>;

      case 'heading':
        const level = block.level || 2;
        const HeadingTag = `h${level}`;
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

        case 'image': {
          const src = block.url;         // hier kein `localhost` voranstellen
          const alt = block.alt || 'Bild';
          const caption = block.caption;
        
          return (
            <figure key={i} className="rt-image">
              <img src={src} alt={alt} />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          );
        }

      default:
        return null;
    }
  });
};

const renderChildren = (children) => {
  return children.map((child, j) => {
    if (typeof child.text !== 'string') return null;

    let text = child.text;

    if (child.bold) text = <strong key={`b-${j}`}>{text}</strong>;
    if (child.italic) text = <em key={`i-${j}`}>{text}</em>;
    if (child.underline) text = <u key={`u-${j}`}>{text}</u>;
    if (child.url) {
      text = (
        <a key={`a-${j}`} href={child.url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    }

    return <span key={j}>{text}</span>;
  });
};
