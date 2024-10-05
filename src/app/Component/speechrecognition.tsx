import React from 'react';
import useSpeechRecognition from './useSpeechRecognition';

const SpeechToText = () => {
  const { transcript, isListening, error, startListening, stopListening, saveText } = useSpeechRecognition();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Speech Recognition</h1>

      {error && <p className="text-red-600 mb-4">Error: {error}</p>}

      <button
        onClick={isListening ? stopListening : startListening}
        className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out 
      ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>

      <p className="mt-4 text-lg text-gray-700 text-center max-w-md">
        {transcript ? `Transcript: ${transcript}` : 'Start speaking to see the transcript here'}
      </p>

      <div className="mt-6 w-full max-w-md">
        <label htmlFor="customInput" className="block text-lg font-medium text-gray-700">
          Input Custom Text:
        </label>
        <input
          type="text"
          id="customInput"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 text-gray-700"
          placeholder="Type something here..."
        />
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Transcripts:</h2>
        <ul className="list-disc list-inside space-y-2">
          {saveText.length > 0 ? (
            saveText.map((text, index) => (
              <li key={index} className="text-gray-600">
                {text}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No transcripts saved yet.</p>
          )}
        </ul>
      </div>
    </div>

  );
};

export default SpeechToText;
