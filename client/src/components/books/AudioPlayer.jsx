import React, { useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioBookPlayer = ({ audioUrl, onProgress }) => {
  useEffect(() => {
    console.log('AudioPlayer received URL:', audioUrl);
  }, [audioUrl]);

  if (!audioUrl) {
    return <div className="text-red-500">No audio URL provided</div>;
  }

  return (
    <div className="w-full">
      <AudioPlayer
        autoPlay={false}
        src={audioUrl}
        showJumpControls={true}
        showFilledVolume={true}
        layout="horizontal"
        customControlsSection={[
          'MAIN_CONTROLS',
          'VOLUME_CONTROLS',
        ]}
        onListen={(e) => onProgress(e.target.currentTime)}
        onError={(e) => {
          console.error('Audio player error:', e);
          console.log('Failed to load URL:', audioUrl);
        }}
        style={{
          background: 'transparent',
          boxShadow: 'none',
        }}
        customStyles={{
          progressBar: {
            backgroundColor: '#374151',
          },
          progress: {
            backgroundColor: '#3B82F6',
          },
          volumeBar: {
            backgroundColor: '#374151',
          },
          volume: {
            backgroundColor: '#3B82F6',
          },
          time: {
            color: '#E5E7EB',
          },
          loopButton: {
            color: '#E5E7EB',
          },
          playButton: {
            color: '#E5E7EB',
          },
          volumeButton: {
            color: '#E5E7EB',
          }
        }}
      />
    </div>
  );
};

export default AudioBookPlayer;