/* eslint-disable @typescript-eslint/no-unused-vars */
type ClassName = typeof string;
type Position =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'center';

type Variant = 'primary' | 'secondary' | 'positive' | 'warning' | 'negative' | 'default';

type DefaultProps = {
  className?: ClassName;
};

type ActionMode ="create" | 'edit' | 'view';

type OnComplete = (result: { isSuccess: true } | { isSuccess: false; error: Error}) => void;

 interface SavableTab {
  save: () => void;
}


/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

type Scope = 'all' | 'public' | 'personal';

type Constructor<T = {}> = new (...args: any[]) => T;

type OnCompleteHandler<T> = (
  data: T,
  options?: {
    shouldExit?: boolean;
    shouldPublish?: boolean;
    skipNavigation?: boolean;
  }
) => void;


type SidebarItem = {
  label: string;
  path: string;
  icon: IconType;
  separator?: boolean;
};


type NavLink = SidebarItem & {
  subLinks?: NavLink[]; // Add subLinks to the type
};