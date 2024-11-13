import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Tools2 } from "./Tools2";
import {Canvas} from "./Canvas,"
import logo from "./png images/LOGO.png"
function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [drawings, setDrawings] = useState([null]);
    const captureRef = useRef(null);
  
    /*SLIDE SHOW SECTION*/

    //Next slides
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % drawings.length);
    };
    //Previous slides
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? drawings.length - 1 : prev - 1));
    };

    //Save drawing
    const saveDrawing = (dataUrl) => {
        setDrawings((prevDrawings) => {
            const updatedDrawings = [...prevDrawings];
            updatedDrawings[currentSlide] = dataUrl;
            return updatedDrawings;
        });
    };

    //Download the webpage
    const downloadImage = () => {
        if (!captureRef.current) {
            console.error("Capture ref is not attached.");
            return;
        }

        toPng(captureRef.current)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "capture.png";
                link.click();
            })
            .catch((err) => {
                console.error("Failed to download image", err);
            });
    };

    return (
        <>
        <img className="logo" src={logo} alt="" />
            <div ref={captureRef}> 
            <Canvas
                drawingData={drawings[currentSlide]}
                onSave={saveDrawing}
            />
            </div>
            <Tools2 
              currentSlide={currentSlide}
              drawings={drawings}
              setDrawings={setDrawings}
              setCurrentSlide={setCurrentSlide}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
              downloadImage={downloadImage}              
            />
        </>
    );
}

export default App;
