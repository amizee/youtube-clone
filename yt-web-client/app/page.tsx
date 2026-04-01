import styles from './page.module.css';
import Upload from './upload';
import Link from 'next/link';
import Image from 'next/image';

import { getVideos } from './firebase/functions';

export default async function Home() {
  const videos = await getVideos();

  return (
    <div>
      <main className={styles.main}>
        <Upload />
        {
          videos.map((video) => (
            <Link href={`/watch?v=${video.filename}`} key={video.id}>
              <Image src={'/thumbnail.png'} alt='video' width={120} height={80}
                className={styles.thumbnail}/>
            </Link>
          ))
        }
      </main>
    </div>
  );
}

export const revalidate = 30;