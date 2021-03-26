import { Player, ControlBar } from 'video-react';
import DownloadButton from './DownloadButton';

export default function Video() {
  return (
    <Player src="http://media.w3.org/2010/05/bunny/movie.mp4" autoPlay>
      <ControlBar autoHide={false}>
        <DownloadButton order={7} />
      </ControlBar>
    </Player>
  );
};