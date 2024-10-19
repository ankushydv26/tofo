import { useState, useEffect, useRef } from 'react';

// type SpeechRecognitionType = typeof window.SpeechRecognition | typeof window.webkitSpeechRecognition;

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [saveText , getSaveText] = useState<string[]>([])
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  console.log(saveText)

  useEffect(() => {
    const SpeechRecognition =
      (window).SpeechRecognition || (window).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech Recognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript:string = '';
      for (let i = 0; i < event.results.length; i++) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptChunk;
        }
      }
      setTranscript((prev) => (prev + finalTranscript));
      if(finalTranscript !== '')
          getSaveText(prev => [...prev , finalTranscript])

    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error);
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return { transcript, isListening, error, startListening, stopListening  ,saveText};
};

export default useSpeechRecognition;
