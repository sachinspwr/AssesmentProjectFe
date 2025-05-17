import { useState, useEffect, useRef } from 'react';

export interface TypewriterOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorBlinkSpeed?: number;
}

const useTypewriter = (
  texts: string[],
  {
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenTexts = 1000,
    loop = true,
    cursor = true,
    cursorBlinkSpeed = 500
  }: TypewriterOptions = {}
) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'deleting' | 'waiting'>('typing');
  const [showCursor, setShowCursor] = useState(true);
  const animationRef = useRef<number>();
  const lastUpdateTime = useRef<number>(0);
  const currentText = texts[currentIndex] || '';

  // Handle cursor blinking
  useEffect(() => {
    if (!cursor) return;
    
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(interval);
  }, [cursor, cursorBlinkSpeed]);

  // Main animation loop
  useEffect(() => {
    if (texts.length === 0) return;

    const animate = (timestamp: number) => {
      if (!lastUpdateTime.current) lastUpdateTime.current = timestamp;
      const deltaTime = timestamp - lastUpdateTime.current;
      const speed = phase === 'typing' ? typingSpeed : deletingSpeed;

      if (deltaTime >= speed) {
        lastUpdateTime.current = timestamp;

        if (phase === 'typing') {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setPhase('waiting');
          }
        } else if (phase === 'deleting') {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            const nextIndex = (currentIndex + 1) % texts.length;
            if (!loop && nextIndex === 0) {
              setPhase('typing');
              return;
            }
            setCurrentIndex(nextIndex);
            setPhase('typing');
          }
        } else if (phase === 'waiting') {
          setPhase('deleting');
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [texts, currentIndex, phase, displayText, typingSpeed, deletingSpeed, loop]);

  // Handle waiting phase
  useEffect(() => {
    if (phase !== 'waiting') return;

    const timeout = setTimeout(() => {
      setPhase('deleting');
    }, delayBetweenTexts);

    return () => clearTimeout(timeout);
  }, [phase, delayBetweenTexts]);

  return displayText + (cursor && showCursor ? '|' : '');
};

export default useTypewriter;