import * as React from 'react';
import type { SVGProps } from 'react';

// Import icons individually
import Alarm from './Icons/Alarm';
import Arrow from './Icons/Arrow';
import ArrowDropdown from './Icons/ArrowDropdown';
import Calendar from './Icons/Calendar';
import CategoryTab1 from './Icons/CategoryTab1';
import CategoryTab2 from './Icons/CategoryTab2';
import Check from './Icons/Check';
import Crown from './Icons/Crown';
import Delete from './Icons/Delete';
import Edit from './Icons/Edit';
import EditBtn from './Icons/EditBtn';
import Filter from './Icons/Filter';
import Heart from './Icons/Heart';
import Logout from './Icons/Logout';
import Person from './Icons/Person';
import Plus from './Icons/Plus';
import Save from './Icons/Save';
import SaveFilled from './Icons/SaveFilled';
import SaveOutline from './Icons/SaveOutline';
import VisibilityOff from './Icons/VisibilityOff';
import VisibilityOn from './Icons/VisibilityOn';

const REGISTRY = {
  alarm: Alarm,
  arrow: Arrow,
  arrow_dropdown: ArrowDropdown,
  calendar: Calendar,
  category_tab1: CategoryTab1,
  category_tab2: CategoryTab2,
  check: Check,
  crown: Crown,
  delete: Delete,
  edit: Edit,
  edit_btn: EditBtn,
  filter: Filter,
  heart: Heart,
  logout: Logout,
  person: Person,
  plus: Plus,
  save: Save,
  save_filled: SaveFilled,
  save_outline: SaveOutline,
  visibility_off: VisibilityOff,
  visibility_on: VisibilityOn,
};

export type IconName = keyof typeof REGISTRY;
export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

const Icon = ({ name, size = 24, ...props }: IconProps) => {
  const Component = REGISTRY[name];
  if (!Component) return null;
  return <Component size={size} {...props} />;
};

export default Icon;
