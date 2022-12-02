import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalance from '@mui/icons-material/AccountBalance';
import Person from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { blueGrey, grey } from '@mui/material/colors';

import { NAVIGATE_URL } from '@src/types/enum';
import { cookieInstance } from '@src/utils/cookieInstance';

const DRAWER_WIDTH = 240;

const menus = [
  {
    id: '1',
    icon: <AccountBalance />,
    text: '계좌 목록',
    href: NAVIGATE_URL.ACCOUNT,
  },
  {
    id: '2',
    icon: <Person />,
    text: '사용자 목록',
    href: NAVIGATE_URL.USERS,
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (router.pathname) {
      const selectMenu = menus
        .filter((menu) => router.pathname === menu.href)
        .at(0);

      if (selectMenu) {
        setTitle(selectMenu.text);
      }
    }
  }, [router.pathname]);

  const handleLogout = () => {
    cookieInstance.remove('token');
    router.push(NAVIGATE_URL.LOGIN);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <S.AppBar
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        <S.Toolbar>{title}</S.Toolbar>
      </S.AppBar>

      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <S.Logo>PREFACE</S.Logo>
        <Divider />
        <List>
          {menus.map(({ id, text, icon, href }) => (
            <Link href={href} key={id}>
              <ListItem disablePadding>
                <S.ListItemButton
                  onClick={() => setTitle(text)}
                  selected={router.pathname === href}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <S.ListItemText primary={text} />
                </S.ListItemButton>
              </ListItem>
            </Link>
          ))}
          <ListItem disablePadding>
            <S.ListItemButton onClick={() => handleLogout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <S.ListItemText primary="로그아웃" />
            </S.ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <S.ChildrenWrap>{children}</S.ChildrenWrap>
    </Box>
  );
};

export default Layout;

const S = {
  Logo: styled('div')(() => ({
    fontSize: 42.5,
    fontWeight: 900,
    textAlign: 'center',
    color: `${blueGrey[900]}`,
  })),

  AppBar: styled(AppBar)(() => ({
    '&.MuiPaper-root': {
      boxShadow: 'none',
      borderBottom: `1px solid ${grey[300]}`,
    },
  })),

  Toolbar: styled(Toolbar)(() => ({
    '&.MuiToolbar-root': {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: 700,
      color: 'black',
    },
  })),

  ListItemButton: styled(ListItemButton)(() => ({
    '&.Mui-selected': {
      backgroundColor: `${grey[300]}`,
    },
  })),

  ListItemText: styled(ListItemText)(() => ({
    '& .MuiTypography-root': {
      fontWeight: 700,
      color: `black`,
    },
  })),

  ChildrenWrap: styled('div')(() => ({
    width: '100%',
    height: '100vh',
    padding: '78px 30px 30px 30px',
    backgroundColor: `${grey[100]}`,
  })),
};
