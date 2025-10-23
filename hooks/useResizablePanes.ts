// FIX: Import `React` to make its namespace available for type annotations like `React.MouseEvent`.
import React, { useRef, useEffect, useCallback } from 'react';

/**
 * A custom React hook to manage the logic for resizable vertical panes.
 * @param {number} minWidth - The minimum width in pixels for the resizable pane.
 * @returns {{ editorPaneRef: React.RefObject<HTMLDivElement>; handleResizeMouseDown: (e: React.MouseEvent) => void; }} An object containing the ref for the pane and the mouse down handler for the resizer.
 */
export const useResizablePanes = (minWidth = 300) => {
    const editorPaneRef = useRef<HTMLDivElement>(null);
    const isResizing = useRef(false);

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
        document.body.style.cursor = 'col-resize';
    };

    const handleResizeMouseUp = useCallback(() => {
        isResizing.current = false;
        document.body.style.cursor = 'default';
    }, []);

    const handleResizeMouseMove = useCallback((e: MouseEvent) => {
        if (isResizing.current && editorPaneRef.current) {
            const newWidth = e.clientX;
            const maxWidth = window.innerWidth - minWidth;
            if (newWidth > minWidth && newWidth < maxWidth) {
                editorPaneRef.current.style.width = `${newWidth}px`;
            }
        }
    }, [minWidth]);

    useEffect(() => {
        window.addEventListener('mousemove', handleResizeMouseMove);
        window.addEventListener('mouseup', handleResizeMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleResizeMouseMove);
            window.removeEventListener('mouseup', handleResizeMouseUp);
        };
    }, [handleResizeMouseMove, handleResizeMouseUp]);

    return { editorPaneRef, handleResizeMouseDown };
};
