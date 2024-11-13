import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import { MdLibraryAdd } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import styles from "./styles/bottomtools.module.css"
export const Tools2 = (
    {
        currentSlide,
        drawings,
        setDrawings,
        setCurrentSlide,
        nextSlide,
        prevSlide,
        downloadImage }
) => {
    return (
        <>
            <div className={styles.container}>
                <button className={styles.prev} onClick={prevSlide} disabled={currentSlide === 0}>
                    <GrChapterPrevious />
                </button>
                <button className={styles.next} onClick={nextSlide} disabled={currentSlide === drawings.length - 1}>
                    <GrChapterNext />
                </button>
                <button
                    onClick={() => {
                        setDrawings([...drawings, null]);
                        setCurrentSlide(drawings.length);
                    }}
                    className={styles.addPage}
                >
                    <MdLibraryAdd />
                </button>
                <button className={styles.download} onClick={downloadImage}>
                    <IoMdDownload />
                </button>
                <b className={styles.detail} style={{ float: "right" }}>
                    Page: {drawings.length > 1 ? `${currentSlide + 1}/${drawings.length}` : 1}
                </b>
            </div>
        </>
    )
}