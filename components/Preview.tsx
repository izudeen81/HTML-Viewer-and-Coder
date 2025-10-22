
import React from 'react';

interface PreviewProps {
  htmlCode: string;
}

const Preview: React.FC<PreviewProps> = ({ htmlCode }) => {
  return (
    <iframe
      srcDoc={htmlCode}
      title="Live Preview"
      className="w-full h-full bg-white"
      sandbox="allow-scripts"
    />
  );
};

export default Preview;
