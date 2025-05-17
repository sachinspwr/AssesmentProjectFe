export const isHorizontalPosition = (pos: Position) => pos === 'left' || pos === 'right';
export const isVerticalPosition = (pos: Position) =>
  pos === 'top' ||
  pos === 'top-left' ||
  pos === 'top-right' ||
  pos === 'bottom' ||
  pos === 'bottom-left' ||
  pos === 'bottom-right';
