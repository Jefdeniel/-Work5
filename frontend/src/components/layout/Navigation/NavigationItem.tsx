import { MenuItem } from 'react-pro-sidebar';
import { useLocation } from 'react-router-dom';

interface Props {
  icon: React.ReactNode;
  link: string;
  onClick: (link: string, isSubMenu?: boolean) => void;
  isSubMenu?: boolean;
  style?: React.CSSProperties;
  children: string;
}

const NavigationItem = ({
  icon,
  link,
  onClick,
  isSubMenu,
  style,
  children,
}: Props) => {
  const location = useLocation();

  const isActive = location.pathname.includes(link);

  const handleOnClick = () => {
    onClick(link, isSubMenu);
  };

  return (
    <MenuItem
      style={{
        backgroundColor: 'white',
        margin: '16px 12px',
        padding: '12px 8px',
        ...{ style },
      }}
      icon={icon}
      onClick={handleOnClick}
      active={isActive}
    >
      {children}
    </MenuItem>
  );
};

export default NavigationItem;
