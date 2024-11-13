import eraser from "./png images/Eraser.png.png";
import React, { useRef, useEffect, useState } from 'react';
import { Tools } from "./Tools";
import { forwardRef } from "react";
import styles from "./styles/canvas.module.css";

export const Canvas = forwardRef(({ drawingData, onSave }, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
    const [penColor, setPenColor] = useState('black');
    const [penWidth, setPenWidth] = useState(2);
    const [eraserWidth, setEraserWidth] = useState(10);
    const [isEraser, setIsEraser] = useState(false);
    const canvasBG = 'white';
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
    
        // Function to handle resizing the canvas
        const resize = () => {
          const isMobile = window.innerWidth <= 768;
          canvas.width = isMobile ? window.innerWidth - 50 : 1300;
          canvas.height = isMobile ? window.innerHeight-160 : 500;
    
          // Fill the background color
          context.fillStyle = canvasBG;
          context.fillRect(0, 0, canvas.width, canvas.height);
    
          // Redraw saved drawing data if it exists
          if (drawingData) {
            const img = new Image();
            img.src = drawingData;
            img.onload = () => {
              context.drawImage(img, 0, 0);
            };
          }
        };
    
        // Call resize initially
        resize();
    
        // Add event listener to resize canvas on window resize
        window.addEventListener("resize", resize);
    
        // Cleanup listener on component unmount
        return () => window.removeEventListener("resize", resize);
      }, [canvasBG, drawingData]);
    

    const getPosition = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.touches ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
        const y = e.touches ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
        return { x, y };
    };

    const startDrawing = (e) => {
        // e.preventDefault();
        setIsDrawing(true);
        const { x, y } = getPosition(e);
        setLastPosition({ x, y });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
    
        canvas.addEventListener("touchstart", startDrawing, { passive: false });
        canvas.addEventListener("touchmove", draw, { passive: false });
        canvas.addEventListener("touchend", stopDrawing);
    
        return () => {
            canvas.removeEventListener("touchstart", startDrawing);
            canvas.removeEventListener("touchmove", draw);
            canvas.removeEventListener("touchend", stopDrawing);
        };
    }, []);
    

    const draw = (e) => {
        if (!isDrawing) return;
        // e.preventDefault();

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { x, y } = getPosition(e);

        context.strokeStyle = isEraser ? canvasBG : penColor;
        context.lineWidth = isEraser ? eraserWidth : penWidth;
        context.lineCap = 'round';

        context.beginPath();
        context.moveTo(lastPosition.x, lastPosition.y);
        context.lineTo(x, y);
        context.stroke();

        setLastPosition({ x, y });
    };

    const stopDrawing = () => {
        if (isDrawing) {
            const canvas = canvasRef.current;
            const dataUrl = canvas.toDataURL();
            onSave(dataUrl);
            setIsDrawing(false);
        }
    };  
    
    const handleColorChange = (e) => {
        setPenColor(e.target.value);
        setIsEraser(false);
    };

    const toggleEraser = () => {
        setIsEraser((prev) => !prev);
    };

    const handleLineWidthChange = (e) => {
        const newValue = e.target.value;
        if (isEraser) {
            setEraserWidth(newValue);
        } else {
            setPenWidth(newValue);
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        onSave(null);
    };


    
    return (
        <div>
            <Tools 
                penColor={penColor} 
                onColorChange={handleColorChange} 
                isEraser={isEraser} 
                toggleEraser={toggleEraser} 
                penWidth={penWidth} 
                eraserWidth={eraserWidth} 
                onLineWidthChange={handleLineWidthChange} 
                clearCanvas={clearCanvas}
            />
            <br />
            <center>
                <canvas 
                    ref={canvasRef}
                    className={styles.canvas}
                    style={{ cursor: isEraser ? `url(${eraser}) 15 15,auto` : 'crosshair' }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    
                />
            </center>
        </div>
    );
});