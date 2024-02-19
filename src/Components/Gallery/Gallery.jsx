/* eslint-disable react/prop-types */
import ImageGallery from "react-image-gallery";
import NoPhotoProfile from "../../Components/imagenes/noPhotoProfile/NoPhotoProfile.webp"
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./Gallery.module.css";
import { sitterInfo } from "../../redux/sitterSlice";

const Gallery = ({infoSitter, id}) => {
  const noPhotos =  !infoSitter.photos || infoSitter.photos.length === 0 ;

  const noImgInGallery = [
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
  ]

  if(!noPhotos){
    const images = sitterInfo.photos.map(photo => ({
      original: photo.url,
      thumbnail: photo.url,
    }));
    console.log(images)

    return (
      <div className={styles.galleryContainer}>
        <ImageGallery
          items={images}
          thumbnailPosition={"bottom"}
          showPlayButton={false}
        />
      </div>
    );
  }

  return (
    <div className={styles.galleryContainer}>
      <ImageGallery
          items={noImgInGallery}
          thumbnailPosition={"bottom"}
          showPlayButton={false}
        />
    </div>
  );
};

export default Gallery;
