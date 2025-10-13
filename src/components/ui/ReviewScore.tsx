import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartIconProps {
  size?: number;
  fill: 'full' | 'lined';
  className?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({ size = 24, fill, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    fill={fill === 'full' ? 'var(--color-purple-300)' : 'var(--color-gray-50)'}
    viewBox="0 0 24 24"
    role="img"
    aria-label="heart icon">
    <path
      fill="current"
      d="M22.1 9.1C22 5.7 19.3 3 15.9 3c-1.1 0-2.8.8-3.5 2.1-.1.3-.5.3-.6 0-.8-1.2-2.4-2-3.6-2-3.3 0-6.1 2.7-6.2 6v.2c0 1.7.7 3.3 1.9 4.5v.1c.1.1 4.9 4.3 7.1 6.2.6.5 1.5.5 2.1 0 2.2-1.9 6.9-6.1 7.1-6.2v-.1c1.2-1.1 1.9-2.7 1.9-4.5z"
    />
  </svg>
);

interface AnimatedHeartProps {
  isFilled: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  index: number;
  disabled: boolean;
}

const AnimatedHeart: React.FC<AnimatedHeartProps> = React.memo(
  ({ isFilled, isHovered, onClick, onHoverStart, onHoverEnd, index, disabled }) => {
    const HEART_SIZE = 40; // 아이콘 사이즈 고정

    return (
      <motion.button
        type="button"
        onClick={onClick}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        className="relative"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          outline: 'none',
          boxShadow: 'none',
          cursor: disabled ? 'default' : 'pointer',
        }}
        role="radio"
        whileTap={disabled ? {} : { scale: 0.85 }}
        whileHover={disabled ? {} : { scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        aria-label={`${index + 1}점 평가`}
        aria-checked={isFilled}
        aria-disabled={disabled}>
        <div className="relative" style={{ width: HEART_SIZE, height: HEART_SIZE }}>
          {/* Lined 하트 (항상 표시) */}
          <div className="absolute inset-0">
            <HeartIcon size={HEART_SIZE} fill="lined" />
          </div>

          {/* Full 하트 (애니메이션) */}
          <AnimatePresence>
            {(isFilled || isHovered) && (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 25,
                  mass: 0.5,
                }}>
                <HeartIcon size={HEART_SIZE} fill="full" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 반짝임 효과 */}
          {isFilled && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}>
              <div
                className="h-full w-full rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, color-mix(in srgb, var(--color-purple-300) 30%, transparent) 0%, transparent 70%)',
                }}
              />
            </motion.div>
          )}
        </div>
      </motion.button>
    );
  },
);

AnimatedHeart.displayName = 'AnimatedHeart';

// ReviewScore 메인 컴포넌트
export interface ReviewScoreProps {
  value?: number;
  onChange?: (score: number) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const ReviewScore: React.FC<ReviewScoreProps> = ({
  value = 0,
  onChange,
  disabled = false,
  label = '만족스러운 경험이었나요?',
  className = '',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const MAX_SCORE = 5; // 5점 만점 고정

  const handleClick = useCallback(
    (index: number) => {
      if (disabled) return;
      const newScore = index + 1;
      onChange?.(newScore);
    },
    [disabled, onChange],
  );

  const handleHoverStart = useCallback(
    (index: number) => {
      if (disabled) return;
      setHoveredIndex(index);
    },
    [disabled],
  );

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: MAX_SCORE }, (_, index) => {
      const isFilled = index < value;
      const isHovered = hoveredIndex !== null && index <= hoveredIndex;

      return (
        <AnimatedHeart
          key={index}
          index={index}
          isFilled={isFilled}
          isHovered={isHovered}
          onClick={() => handleClick(index)}
          onHoverStart={() => handleHoverStart(index)}
          onHoverEnd={handleHoverEnd}
          disabled={disabled}
        />
      );
    });
  }, [value, hoveredIndex, disabled, handleClick, handleHoverStart, handleHoverEnd]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {label && <p className="text-base font-medium text-gray-800">{label}</p>}

      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label="평점 선택"
        style={{ width: 204, height: 40 }}>
        {hearts}
      </div>
    </div>
  );
};

export default ReviewScore;
