import React from 'react';
import './RichTextContent.css';

const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;

const RichTextContent = ({ html, className }) => {
  if (!html) return null;

  const classes = ['rich-text-content', className].filter(Boolean).join(' ');
  const looksLikeHtml = htmlTagRegex.test(html);

  if (!looksLikeHtml) {
    return (
      <div className={classes}>
        <p>{html}</p>
      </div>
    );
  }

  return <div className={classes} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default RichTextContent;
