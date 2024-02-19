/* eslint-disable react/prop-types */
import ImageGallery from "react-image-gallery";
import NoPhotoProfile from "../../Components/imagenes/noPhotoProfile/NoPhotoProfile.webp";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./Gallery.module.css";

const Gallery = ({ infoSitter }) => {
  let imgs = [];

  if (infoSitter.photos && infoSitter.photos.length > 0) {
    imgs = infoSitter.photos.map((photo) => ({
      original: photo.url,
      thumbnail: photo.url,
    }));
  } else {
    imgs = [
      {
        original: NoPhotoProfile,
        thumbnail: NoPhotoProfile,
      },
      {
        original: NoPhotoProfile,
        thumbnail: NoPhotoProfile,
      },
      {
        original: NoPhotoProfile,
        thumbnail: NoPhotoProfile,
      },
      {
        original: NoPhotoProfile,
        thumbnail: NoPhotoProfile,
      },
      {
        original: NoPhotoProfile,
        thumbnail: NoPhotoProfile,
      },
    ];
  }

  return (
    <div className={styles.galleryContainer}>
      <ImageGallery
        items={imgs}
        thumbnailPosition={"bottom"}
        showPlayButton={false}
      />
    </div>
  );
};

export default Gallery;
