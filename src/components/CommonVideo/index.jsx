import React, { useRef, useState } from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import vid from '../../assets/vid.mp4';

const CommonVideoPreview = ({ src, className, video = vid }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef();

  const handleVideo = () => {
    setPlayVideo((prev) => !prev);

    if (playVideo) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <div
      className={`${
        className ? className : ' '
      } uploaded-video-wrapp c-pointer`}
      onClick={handleVideo}
    >
      <video
        onEnded={() => {
          setPlayVideo((prev) => !prev);
        }}
        src={video}
        ref={videoRef}
      ></video>
      <button className={playVideo ? 'video-button' : ''}>
        {playVideo ? (
          <FontAwesomeIcon icon={faPauseCircle} />
        ) : (
          <FontAwesomeIcon icon={faPlayCircle} />
        )}
      </button>
    </div>
  );
};

export default CommonVideoPreview;
