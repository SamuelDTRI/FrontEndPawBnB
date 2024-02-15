import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const images = [
    {
      original:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707405336/Gallery/20231017_112959_xfsdfb.jpg",
      thumbnail:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707405336/Gallery/20231017_112959_xfsdfb.jpg",
    },
    {
      original:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707405335/Gallery/20240127_094945_q1l0ej.jpg",
      thumbnail:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707405335/Gallery/20240127_094945_q1l0ej.jpg",
    },
    {
      original:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707405336/Gallery/20230727_095028_ohqpny.jpg",
      thumbnail:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707405336/Gallery/20230727_095028_ohqpny.jpg",
    },
    {
      original:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707405335/Gallery/20231010_133833_eamvs9.jpg",
      thumbnail:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707405335/Gallery/20231010_133833_eamvs9.jpg",
    },
    {
      original:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707424135/Gallery/4_lcuwaj.jpg",
      thumbnail:
        "https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707424135/Gallery/4_lcuwaj.jpg",
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
