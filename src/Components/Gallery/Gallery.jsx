/* eslint-disable react/prop-types */
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./Gallery.module.css";

const Gallery = ({ infoSitter }) => {
  return (
    <div className={styles.galleryContainer}>
      <ImageGallery
        items={infoSitter.photos}
        thumbnailPosition={"bottom"}
        showPlayButton={false}
      />
    </div>
  );
};

export default Gallery;
