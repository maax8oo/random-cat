import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

type Props = {
  InitioalImageUrl: string;
};

const indexPage: NextPage<Props> = ({ InitioalImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(InitioalImageUrl);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     fetchImage().then((newImage) => {
  //       setImageUrl(newImage.url);
  //       setLoading(false);
  //     });
  //   }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        One more cat!
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
};

export default indexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      InitioalImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
