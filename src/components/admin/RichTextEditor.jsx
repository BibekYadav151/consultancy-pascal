import React, { useMemo, useRef, useEffect } from 'react';
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
  const quillRef = useRef(null);
  const modules = useMemo(() => defaultModules, []);

  // Suppress findDOMNode deprecation warning from ReactQuill
  // This is a known issue with react-quill v2.0.0 and React 18
  // The warning is harmless and will be fixed in future react-quill versions
  useEffect(() => {
    if (import.meta.env.DEV) {
      const originalWarn = console.warn;
      const originalError = console.error;
      
      const filterWarning = (args) => {
        const message = args[0];
        if (typeof message === 'string' && message.includes('findDOMNode')) {
          return true;
        }
        return false;
      };

      console.warn = (...args) => {
        if (!filterWarning(args)) {
          originalWarn.apply(console, args);
        }
      };

      console.error = (...args) => {
        if (!filterWarning(args)) {
          originalError.apply(console, args);
        }
      };

      return () => {
        console.warn = originalWarn;
        console.error = originalError;
      };
    }
  }, []);

  const handleChange = (content, _delta, _source, editor) => {
    const isEmpty = editor.getText().trim().length === 0;
    onChange(isEmpty ? '' : content);
  };

  return (
    <div className="admin-rte" style={{ '--rte-min-height': `${minHeight}px` }}>
      <ReactQuill
        ref={quillRef}
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
