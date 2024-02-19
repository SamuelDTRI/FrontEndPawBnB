/* eslint-disable react/prop-types */
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./Gallery.module.css";

const Gallery = ({ infoSitter }) => {
  const images = [
    {
      original:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707330140/enzo-y-yp_ozsk8j.jpg",
      thumbnail:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707330140/enzo-y-yp_ozsk8j.jpg",
    },
  ];
  return (
    <div className={styles.galleryContainer}>
      <ImageGallery
        items={images}
        thumbnailPosition={"bottom"}
        showPlayButton={false}
      />
    </div>
  );
};

export default Gallery;
