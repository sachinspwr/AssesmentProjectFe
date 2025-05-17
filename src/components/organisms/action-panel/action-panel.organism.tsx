import { Icon, Label } from '@components/atoms';
import { Card } from '@components/molecules';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { isHorizontalPosition, isVerticalPosition } from '@utils/functions/position.functions';
import { Link } from 'react-router-dom';

export type Action = {
  id: number;
  label?: ReactNode;
  icon?: IconType;
  title?: string;
  path?: string;
  onActionInvoke?: (id: number) => void;
};

type ActionPanelProps = DefaultProps & {
  position?: Position;
  actionConfig: Action[];
  styles?: {
    wrapperStyles?: ClassName;
    cardClasses?: ClassName;
    listWrapperStyles?: ClassName;
  };
  labelPosition?: Position;
};

function ActionPanel({
  position: positionOfContainer = 'top',
  labelPosition: positionOfLabel = 'right',
  actionConfig,
  styles,
}: ActionPanelProps) {
  // const wrapperStyleByPosition = {
  //   top: 'top-1 left-0 right-0',
  //   ['top-left']: 'top-1 left-0',
  //   ['top-right']: 'top-1 right-0',
  //   bottom: 'bottom-1 right-0 left-0',
  //   ['bottom-left']: 'bottom-1 left-0',
  //   ['bottom-right']: 'bottom-1 right-0',
  //   left: 'left-1 top-0 bottom-0',
  //   right: 'right-1 top-0 bottom-0',
  // };

  const labelStyleBYPosition = {
    top: 'order-first',
    ['top-left']: 'order-first',
    ['top-right']: 'order-first',
    bottom: 'order-last',
    ['bottom-left']: 'order-last',
    ['bottom-right']: 'order-last',
    left: '',
    right: '',
    center: '',
  };

  const handleHorizontalForLabel = (pos: Position) => {
    return pos === 'bottom' ? 'flex-col' : 'flex-col-reverse';
  };

  // const position = wrapperStyleByPosition[positionOfContainer];

  return (
    <div className={`fixed z-10  flex justify-center items-center ${styles?.wrapperStyles}`}>
      <Card className={`!p-2 !px-4 flex justify-center items-center ${styles?.cardClasses}`}>
        <ul
          className={`flex ${isHorizontalPosition(positionOfContainer) ? 'flex-col' : 'flex-row'} gap-7 ${styles?.listWrapperStyles}`}
        >
          {actionConfig.map(({ id, label, icon, title, path, onActionInvoke }) => (
            // gap between label and icon
            <Link to={path!}>
              <li
                key={id}
                className={`relative flex 
                  ${isVerticalPosition(positionOfLabel!) ? handleHorizontalForLabel(positionOfLabel!) : null} 
                  justify-${isHorizontalPosition(positionOfContainer!) && isHorizontalPosition(positionOfLabel!) && positionOfLabel === 'left' ? 'between' : 'start'} 
                  items-center gap-2 cursor-pointer hover:text-blue-700`}
                onClick={() => onActionInvoke && onActionInvoke(id)}
              >
                {icon && <Icon icon={icon} title={title} />}
                {label && (
                  <Label
                    className={`${isHorizontalPosition(positionOfLabel!) ? labelStyleBYPosition[positionOfLabel!] : null} cursor-pointer hover:text-blue-700`}
                  >
                    {label}
                  </Label>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export { ActionPanel };
