import React from 'react';
import useTypewriter from '../hooks/useTypewriter';

interface TypewriterProps {
  texts: string[];
}

function Typewriter({ texts }: TypewriterProps) {
  const typedText = useTypewriter(
    texts,
    {
      typingSpeed: 150,
      deletingSpeed: 50,
      delayBetweenTexts: 1000,
      loop: true,
      cursor: true
    }
  );
  
  return <h1>{typedText}</h1>;
}

export { Typewriter };
