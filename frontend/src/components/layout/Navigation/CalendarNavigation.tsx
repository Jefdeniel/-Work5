import { Menu, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { MenuItem, SideBarProps } from '../../../@types/Nav';

import IconButton from '../../ui/IconButton/IconButton';
import CalendarNavItem from './CalendarNavItem';
import Logo from '../../ui/Logo';
import Icon from '../../ui/Icon/Icon';
import CalendarCard from '../../calendar/CalendarCard/CalendarCard';
import { PlusIcon } from '../../ui/Icon/SvgIcons';
import Input from '../../ui/Input/Input';
import CalendarCardList from '../../calendar/CalendarCard/CalendarCardList';

import './navigation.scss';
import CalendarSearch from './CalendarSearch/CalendarSearch';

const menuItems: MenuItem[] = [
  {
    link: '/calendar/create',
    icon: <PlusIcon />,
    label: 'general:navigation.create',
    className: 'create-calendar',
  },
];

// TODO Test loop for user avatars in calendar card
const userAvatars = ['/icons/user-profile.svg', ''];

const CalendarNavigation = ({
  isMenuBroken,
  isMenuCollapsed,
  isMenuToggled,
  setIsMenuToggled,
  setIsMenuBroken,
}: SideBarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['general']);

  const menuWidth = isMenuToggled ? menuItems.length * 75 + 'px' : 'auto';
  const handleOnClickMenu = (link: string) => {
    navigate(link);
    isMenuBroken && setIsMenuToggled(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    isMenuBroken && setIsMenuToggled(false);
  };

  return (
    <>
      <Sidebar
        collapsed={isMenuCollapsed}
        toggled={isMenuToggled}
        onBackdropClick={() => setIsMenuToggled(false)}
        onBreakPoint={setIsMenuBroken}
        breakPoint="md"
        backgroundColor="var(--sa-bright)"
        width="250px"
        style={{
          borderRight: '1px solid var(--sa-primary-200)',
        }}
        className={`sidebar`}
      >
        <div className={`full-sidebar-content`}>
          <Row className="mb-large">
            <Col>
              <Link to="/">
                <Logo
                  className={`mt-1`}
                  width={isMenuCollapsed ? '50px' : '50px'}
                  height={isMenuCollapsed ? '50px' : '50px'}
                />
              </Link>
            </Col>

            <Col className={`d-flex justify-content-end`}>
              {!isMenuCollapsed && (
                <IconButton
                  className={`settings-btn align-self-center`}
                  icon={<Icon src="/icons/settings.svg" alt="Settings icon" />}
                  onClick={handleSettingsClick}
                />
              )}
            </Col>
          </Row>

          {!isMenuCollapsed && (
            <Row className={`mb-large`}>
              <CalendarSearch />
            </Row>
          )}

          <Row>
            <span className={`heading heading--sm clr-primary-300 mb-base`}>
              {t('general:navigation.title')}
            </span>
          </Row>

          <ul>
            <CalendarCard
              img="/img/google-calendar-logo.svg"
              name="Google"
              userAvatars={userAvatars}
              link="/calendar/google"
            />

            <CalendarCardList layout="column" />
          </ul>

          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                fontWeight: active ? 'var(--fw-bold)' : 'var(--fw-regular)',
                color: active
                  ? 'var(--sa-primary-500-base)'
                  : 'var(--sa-primary-950)',
                borderRadius: 'var(--br-base)',
                height: 40,
                '&:hover': {
                  backgroundColor: active ? 'none' : 'var(--sa-primary-100)',
                },
              }),
            }}
          >
            {menuItems.map(({ link, icon, className, label }) => (
              <CalendarNavItem
                key={link}
                link={link}
                icon={icon}
                className={`${className} calendar-overview-card`}
                onClick={handleOnClickMenu}
              >
                {t(label?.toString() ?? '')}
              </CalendarNavItem>
            ))}
          </Menu>

          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 25,
              width: menuWidth,
              display: 'flex',
              justifyContent: isMenuToggled ? 'space-between' : 'center',
            }}
          ></div>
        </div>
      </Sidebar>
    </>
  );
};

export default CalendarNavigation;
