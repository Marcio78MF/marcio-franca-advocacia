import styles from './VideoEmbed.module.css';

type Props = {
  videoId: string;
  title: string;
};

export default function VideoEmbed({ videoId, title }: Props) {
  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
