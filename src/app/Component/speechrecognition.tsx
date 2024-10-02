import React from 'react';
import useSpeechRecognition from './useSpeechRecognition';

const SpeechToText = () => {
  const { transcript, isListening, error, startListening, stopListening } = useSpeechRecognition();

  return (
    <div>
      <h1>Speech Recognition</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcript: {transcript || 'Start speaking to see the transcript here'}</p>
    </div>
  );
};

export default SpeechToText;
