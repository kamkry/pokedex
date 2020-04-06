import { useEffect, useRef, useState } from 'react';

const useWaitForStopTyping = (input: string): string => {
  const [readyInput, setReadyInput] = useState('');
  const timeoutRef = useRef(null as any);
  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setReadyInput(input);
    }, 500);
  }, [input]);
  return readyInput;
};

export default useWaitForStopTyping;
