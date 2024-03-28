import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceholderImage from "../../assets/placeholder.png";
import styles from "./card.module.scss";

interface CardProps {
  url: string;
  name: string;
  species: string;
  status: string;
  gender: string;
}

export const Card: FC<CardProps> = ({ url, name, species, status, gender }) => {
  return (
    <div className={styles.card}>
      <LazyLoadImage
        src={url}
        className={styles.image}
        alt={`${name}-${species}`}
        width={200}
        height={200}
        placeholderSrc={PlaceholderImage}
      />
      <div className={styles.overlay}>
        <div className={styles.header}>
          <svg className={styles.arc} xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
          <h3 className={styles.title}>{name || ""}</h3>
        </div>
        <p className={styles.description}>
          {species} &bull; {status} &bull; {gender}
        </p>
      </div>
    </div>
  );
};
