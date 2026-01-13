import React from 'react';

const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;

const RichTextContent = ({ html, className }) => {
  if (!html) return null;

  const classes = ['prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed', className].filter(Boolean).join(' ');
  const looksLikeHtml = htmlTagRegex.test(html);

  if (!looksLikeHtml) {
    return (
      <div className={classes}>
        <p>{html}</p>
      </div>
    );
  }

  return (
    <div 
      className={classes} 
      dangerouslySetInnerHTML={{ __html: html }} 
      style={{
        // Fallback for lists and basic styles if tailwind-typography is not available
        listStyleType: 'initial',
        paddingLeft: 'initial',
      }}
    />
  );
};

export default RichTextContent;
