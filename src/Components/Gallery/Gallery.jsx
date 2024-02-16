import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./Gallery.module.css";

const Gallery = ({infoSitter}) => {
  const images = infoSitter.photos.map(photo => ({
    original: photo.url,
    thumbnail: photo.url,
  }));
  
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