import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Animation, Arc as Shape } from 'calvin-svg';

const Arc = ({
  children,
  cornerRadius,
  delay,
  duration = 500,
  ease = 'cubic-out',
  endAngle,
  height,
  opacity: defaultOpacity = 1,
  startAngle,
  thickness = 8,
  width,
  ...props
}) => {
  const prevEndAngle = useRef(startAngle);
  const prevStartAngle = useRef(startAngle);

  useEffect(() => {
    prevEndAngle.current = endAngle;
    prevStartAngle.current = startAngle;
  }, [endAngle, startAngle]);

  return (
    <Shape
      cornerRadius={cornerRadius}
      endAngle={endAngle}
      height={height}
      opacity={0}
      startAngle={startAngle}
      thickness={thickness}
      width={width}
      {...props}
    >
      <Animation
        attribute="d"
        delay={delay}
        duration={duration}
        ease={ease}
        fill="freeze"
        step={percentage =>
          Shape.d({
            cornerRadius,
            endAngle:
              prevEndAngle.current +
              (endAngle - prevEndAngle.current) * percentage,
            height,
            startAngle:
              prevStartAngle.current +
              (startAngle - prevStartAngle.current) * percentage,
            thickness,
            width,
          })
        }
      />
      <Animation
        attribute="opacity"
        delay={delay}
        duration={50}
        fill="freeze"
        from={0}
        once
        to={defaultOpacity}
      />
      {children}
    </Shape>
  );
};

Arc.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  cornerRadius: PropTypes.number,
  delay: PropTypes.number,
  duration: PropTypes.number,
  ease: PropTypes.string,
  endAngle: PropTypes.number.isRequired,
  height: PropTypes.number,
  opacity: PropTypes.number,
  startAngle: PropTypes.number.isRequired,
  thickness: PropTypes.number,
  width: PropTypes.number,
};

export default memo(Arc);
