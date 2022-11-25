import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountBalance, Person } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';

const drawerWidth = 240;

const menus = [
  {
    id: '1',
    icon: <AccountBalance />,
    text: '계좌 목록',
    href: '/accounts',
  },
  {
    id: '2',
    icon: <Person />,
    text: '사용자 목록',
    href: '/users',
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    if (router.pathname) {
      const selectMenu = menus
        .filter((menu) => router.pathname === menu.href)
        .at(0);

      if (selectMenu) {
        setTitle(selectMenu.text);
      }
    }
  }, [router.pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <StyledToolbar>{title}</StyledToolbar>
      </StyledAppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
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
                <StyledListItemButton
                  onClick={() => setTitle(text)}
                  selected={router.pathname === href}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <StyledListItemText primary={text} />
                </StyledListItemButton>
              </ListItem>
            </Link>
          ))}
          <ListItem disablePadding>
            <StyledListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <StyledListItemText primary="로그아웃" />
            </StyledListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <div
        style={{
          width: '100%',
          height: '100vh',
          padding: '78px 30px 30px 30px',
          backgroundColor: `${grey[100]}`,
        }}
      >
        {children}
      </div>
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
};

const StyledAppBar = styled(AppBar)(() => ({
  '&.MuiPaper-root': {
    boxShadow: 'none',
    borderBottom: `1px solid ${grey[300]}`,
  },
}));

const StyledToolbar = styled(Toolbar)(() => ({
  '&.MuiToolbar-root': {
    backgroundColor: 'white',
    fontSize: 20,
    fontWeight: 700,
    color: 'black',
  },
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
  '&.Mui-selected': {
    backgroundColor: `${grey[300]}`,
  },
}));

const StyledListItemText = styled(ListItemText)(() => ({
  '& .MuiTypography-root': {
    fontWeight: 700,
    color: `black`,
  },
}));
