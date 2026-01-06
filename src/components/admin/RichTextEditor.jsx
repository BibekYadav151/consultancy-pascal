import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css';

const defaultModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ]
};

const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link'];

const RichTextEditor = ({ value, onChange, placeholder, minHeight = 150 }) => {
  const modules = useMemo(() => defaultModules, []);

  const handleChange = (content, _delta, _source, editor) => {
    const isEmpty = editor.getText().trim().length === 0;
    onChange(isEmpty ? '' : content);
  };

  return (
    <div className="admin-rte" style={{ '--rte-min-height': `${minHeight}px` }}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
