import { useState } from 'react';
// material
import DraftsIcon from '@mui/icons-material/Drafts';
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
// routes
// import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
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

// function ListItemLink(props) {
//   return <ListItemButton component="a" {...props} />;
// }

export default function ListsComponent() {
  const [open, setOpen] = useState(true);
  const [setSelectedIndex] = useState(1);
  const [checked, setChecked] = useState([0]);
  const [toggle, setToggle] = useState(['wifi']);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleCheck = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleToggle = (value) => () => {
    const currentIndex = toggle.indexOf(value);
    const newChecked = [...toggle];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setToggle(newChecked);
  };

  return (
    <RootStyle>
      

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Block title="">
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  
                    <ListItemIcon>
                     
                    </ListItemIcon>
                    <ListItemText primary="Predictive Features: Anticipate and minimize wait times using Maps and historical data." />
                 
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Real-Time Queue Management: Effortlessly control and monitor your queues." />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="User-Friendly Interface: A modern and intuitive platform for both vendors and customers." />
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
