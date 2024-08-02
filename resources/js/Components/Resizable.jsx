import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function Resizable({
    children,
    className,
    side = 'right',
    minWidthPx = 200,
    defaultWidthPx = 350,
    maxWidthPercent = 30,
}) {
    const [width, setWidth] = useState(parseInt(localStorage.getItem('resizableWidth')) || defaultWidthPx);
    const [isResizing, setIsResizing] = useState(false);
    const resizableRef = useRef(null);

    const handleMouseMove = useCallback(
        (e) => {
            if (!isResizing || !resizableRef.current) {
                return;
            }

            const resizableRect = resizableRef.current.getBoundingClientRect();
            let newWidth;

            if (side === 'right') {
                newWidth = e.clientX - resizableRect.left;
            } else if (side === 'left') {
                newWidth = resizableRect.right - e.clientX;
            }

            const newWidthPercent = (newWidth / window.innerWidth) * 100;
            const isWidthInRange = newWidth >= minWidthPx && newWidthPercent <= maxWidthPercent;

            setWidth((previousWidth) => {
                return isWidthInRange ? newWidth : previousWidth;
            });
        },
        [isResizing, side]
    );

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
        document.body.style.userSelect = ''; // Re-enable text selection
        document.body.style.cursor = ''; // Revert cursor to default
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    useEffect(() => {
        localStorage.setItem('resizableWidth', width.toString());
    }, [width]);

    const handleMouseDown = useCallback(() => {
        setIsResizing(true);
        document.body.style.userSelect = 'none'; // Disable text selection
        document.body.style.cursor = 'e-resize'; // Change cursor to col-resize
    }, []);

    const handleStyle = useMemo(() => {
        return side === 'right' ? { right: '-20px' } : { left: '-20px' };
    }, [side]);

    const handleLineStyle = useMemo(() => {
        return side === 'left' ? { marginLeft: 'auto' } : {};
    }, [side]);

    return (
        <div className="relative flex">
            <div ref={resizableRef} style={{ width: `${width / 16}rem` }} className={`overflow-x-hidden ${className}`}>
                {children}
            </div>

            <div
                className="group absolute h-full w-[20px] cursor-e-resize"
                style={handleStyle}
                onMouseDown={handleMouseDown}
            >
                <div
                    className={`h-full w-[2px] transition-colors ${isResizing ? 'bg-blue-500' : 'bg-gray-300'} group-hover:bg-blue-500`}
                    style={handleLineStyle}
                ></div>
            </div>
        </div>
    );
}
