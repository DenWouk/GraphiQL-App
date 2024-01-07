import { MutableRefObject } from 'react';

export function resizeContainer(
  box: MutableRefObject<HTMLDivElement | null>,
  top: MutableRefObject<HTMLDivElement | null>
) {
  const resizableElement = box.current;

  const styles = window.getComputedStyle(resizableElement as HTMLDivElement);

  let height = parseInt(styles.height, 10);

  let yCord = 0;

  (resizableElement as HTMLDivElement).style.bottom = '60px';

  function onMouseMoveTopResize(event: MouseEvent) {
    const dy = event.clientY - yCord;

    height = height - dy;
    yCord = event.clientY;

    (resizableElement as HTMLDivElement).style.height = `${height}px`;
  }

  function onMouseUpTopResize() {
    document.removeEventListener('mousemove', onMouseMoveTopResize);
  }

  function onMouseDownTopResize(event: MouseEvent) {
    yCord = event.clientY;

    const styles = window.getComputedStyle(resizableElement as HTMLDivElement);
    (resizableElement as HTMLDivElement).style.bottom = styles.bottom;
    (resizableElement as HTMLDivElement).style.top = null!;

    document.addEventListener('mousemove', onMouseMoveTopResize);
    document.addEventListener('mouseup', onMouseUpTopResize);
  }

  const resizeTop = top.current;

  (resizeTop as HTMLDivElement).addEventListener(
    'mousedown',
    onMouseDownTopResize
  );

  return () => {
    (resizeTop as HTMLDivElement).removeEventListener(
      'mousedown',
      onMouseDownTopResize
    );
  };
}
