'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function WatchContent() {
  const videoPrefix = 'https://storage.googleapis.com/k-yt-clone-processed-videos/';
  const videoSrc = useSearchParams().get('v');

  return (
    <div>
      <h1>Watch Page</h1>
      {videoSrc ? <video controls src={videoPrefix + videoSrc} /> : <p>No video selected.</p>}
    </div>
  );
}

export default function Watch() {
  return (
    <Suspense fallback={<div>Loading watch page...</div>}>
      <WatchContent />
    </Suspense>
  );
}