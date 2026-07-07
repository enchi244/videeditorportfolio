import useReveal from '../hooks/useReveal';

/**
 * <Reveal> - wraps children in a scroll-triggered fade/slide animation.
 *
 * Props:
 *  - as: element tag to render (default 'div')
 *  - direction: 'up' | 'left' | 'right' | 'fade' | 'scale' (default 'up')
 *  - delay: ms delay applied once the element becomes visible (stagger effect)
 *  - className: extra classes merged onto the wrapper
 *
 * Usage: <Reveal delay={120}><Card /></Reveal>
 */
export default function Reveal({ as = 'div', direction = 'up', delay = 0, className = '', style = {}, children, ...rest }) {
  const [ref, isVisible] = useReveal();
  const Tag = as;

  const directionClass = direction === 'up' ? '' : `reveal--${direction}`;

  return (
    <Tag
      ref={ref}
      className={`reveal ${directionClass} ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
