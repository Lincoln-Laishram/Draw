import React from 'react';
import { FaPen } from "react-icons/fa";
import { BsEraserFill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";
import styles from "./styles/btnStyle.module.css";

export const Tools = ({
    penColor,
    onColorChange,
    isEraser,
    toggleEraser,
    penWidth,
    eraserWidth,
    onLineWidthChange,
    clearCanvas,

}) => (
    <div className={styles.BtnContainer}>
        {/* Color Picker */}
        <div className={styles.color}>
            <label style={{ fontSize: 'larger' }}>
                <IoIosColorPalette />
            </label>
            <input
                type="color"
                value={penColor}
                onChange={onColorChange}
                style={{ marginBottom: '10px' }}
            />
        </div>

        {/* Pen / Eraser Toggle */}
        <div>
            <button onClick={toggleEraser} className={styles.penDuster}>
                {isEraser ? <FaPen /> : <BsEraserFill />}
            </button>
        </div>
        <div className={styles.setSize}>
            <select onChange={onLineWidthChange}
            >
                <option value={isEraser?eraserWidth=10:penWidth=2}>
                    {isEraser?eraserWidth:penWidth}
                </option>
                <option value={isEraser?eraserWidth=15:penWidth=4}>
                    {isEraser?eraserWidth:penWidth}
                </option>
                <option value={isEraser?eraserWidth=20:penWidth=6}>
                    {isEraser?eraserWidth:penWidth}
                </option>
                <option value={isEraser?eraserWidth=25:penWidth=8}>
                    {isEraser?eraserWidth:penWidth}
                </option>
                <option value={isEraser?eraserWidth=30:penWidth=10}>
                    {isEraser?eraserWidth:penWidth}
                </option>
                <option value={isEraser?eraserWidth=35:penWidth=12}>
                    {isEraser?eraserWidth:penWidth}
                </option>
            </select>
        </div>
        {/* Clear Button */}
        <button onClick={clearCanvas} className={styles.clear}>
            <b>
                <GrClearOption/>
            </b>
        </button>
    </div>
);

export default Tools;
