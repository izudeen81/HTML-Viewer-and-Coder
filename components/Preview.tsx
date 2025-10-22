
import React, { useRef, useEffect } from 'react';

/**
 * @interface PreviewProps
 * @property {string} htmlCode - The HTML string to be rendered.
 * @property {boolean} isWysiwygEnabled - Flag to enable or disable live editing.
 * @property {boolean} isInspectorEnabled - Flag to enable or disable element inspection.
 * @property {(newBodyHtml: string) => void} onWysiwygChange - Callback to sync content changes back to the parent.
 * @property {(elementHtml: string) => void} onElementSelect - Callback to notify parent of element selection.
 */
interface PreviewProps {
  htmlCode: string;
  isWysiwygEnabled: boolean;
  isInspectorEnabled: boolean;
  onWysiwygChange: (newBodyHtml: string) => void;
  onElementSelect: (elementHtml: string) => void;
}

/**
 * A component that renders a live preview of HTML code within a sandboxed iframe.
 * It supports a WYSIWYG mode where the user can directly edit the preview content,
 * which then syncs back to the code editor.
 * @param {PreviewProps} props - The props for the Preview component.
 * @returns {React.FC<PreviewProps>} An iframe element that displays the rendered HTML.
 */
const Preview: React.FC<PreviewProps> = ({ htmlCode, isWysiwygEnabled, isInspectorEnabled, onWysiwygChange, onElementSelect }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isMounted = useRef(false);

  // This comprehensive effect handles the initial load, subsequent code syncs,
  // and toggling of the WYSIWYG and Inspector modes.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    // This function sets up the event listeners and styles based on the current mode.
    const setupEventListeners = () => {
        const doc = iframe.contentDocument;
        if (!doc?.body) return;

        // --- Clear all previous listeners and styles to prevent conflicts ---
        doc.body.contentEditable = 'false'; // Set to false by default
        doc.body.onclick = null;
        doc.body.oninput = null;
        doc.getElementById('gemini-inspector-style')?.remove();

        if (isWysiwygEnabled) {
            doc.body.contentEditable = 'true';
            doc.body.oninput = () => {
                if (doc.body) onWysiwygChange(doc.body.innerHTML);
            };
        } else if (isInspectorEnabled) {
            // --- Setup Inspector Mode ---
            doc.body.contentEditable = 'false';
            
            // Add inspector hover styles
            const styleEl = doc.createElement('style');
            styleEl.id = 'gemini-inspector-style';
            styleEl.textContent = `
              *:not(html,body,head):hover { 
                outline: 2px dashed #f37021; 
                cursor: pointer; 
              }
            `;
            doc.head.appendChild(styleEl);

            // Add inspector click listener
            doc.body.onclick = (e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                const target = e.target as HTMLElement;
                if (target) {
                    onElementSelect(target.outerHTML);
                }
            };
        }
    };
    
    // On the initial mount, we write the full HTML using srcdoc and set up the
    // functionality once the iframe has loaded.
    if (!isMounted.current) {
        iframe.srcdoc = htmlCode;
        iframe.onload = () => {
            setupEventListeners();
            isMounted.current = true; // Mark as mounted to avoid full reloads later.
        };
    } else { 
        // For subsequent updates (e.g., from the code editor or Gemini), we sync intelligently
        // to avoid a full reload, which would lose user focus and cursor position.
        const doc = iframe.contentDocument;
        if (!doc) return;

        // Extract new head and body content
        const headRegex = /<head[^>]*>([\s\S]*)<\/head>/is;
        const bodyRegex = /<body[^>]*>([\s\S]*)<\/body>/is;

        const newHeadMatch = htmlCode.match(headRegex);
        const newBodyMatch = htmlCode.match(bodyRegex);

        const newHeadHtml = newHeadMatch ? newHeadMatch[1] : null;
        const newBodyHtml = newBodyMatch ? newBodyMatch[1] : '';

        // Update head if it has changed. This is crucial for style updates.
        if (newHeadHtml !== null && doc.head && newHeadHtml !== doc.head.innerHTML) {
            doc.head.innerHTML = newHeadHtml;
        }

        // Only update the iframe's body if the content has actually changed.
        // This prevents a feedback loop from the WYSIWYG editor itself.
        if (doc.body && newBodyHtml !== doc.body.innerHTML) {
            doc.body.innerHTML = newBodyHtml;
        }

        // Always ensure the event listeners are up-to-date with the current mode.
        setupEventListeners();
    }
  }, [htmlCode, isWysiwygEnabled, isInspectorEnabled, onWysiwygChange, onElementSelect]);

  return (
    <iframe
      ref={iframeRef}
      title="Live Preview"
      className="w-full h-full bg-white"
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default Preview;
