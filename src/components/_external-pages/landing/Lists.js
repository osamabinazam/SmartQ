import { styled } from '@mui/material/styles';
import {
  Grid,
  List,
  Paper,
  Container,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';

import Page from '../../Page';
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const ListWrapperStyle = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`
}));

// ----------------------------------------------------------------------

export default function ListsComponent() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Block title="">
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Real-time Scheduling: Book appointments instantly with live updates." />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Seamless Integration: Our platform integrates smoothly with various public services." />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="User-Centric Design: An intuitive interface for effortless navigation." />
                  </ListItemButton>
                </List>
              </ListWrapperStyle>
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
