// import DraftsIcon from '@mui/icons-material/Drafts';
import { styled } from '@mui/material/styles';
import { Grid, List, Paper, Container, ListItemText, ListItemIcon, ListItemButton, Typography } from '@mui/material';
import { Block } from '../Block';
import Page from 'src/components/Page';
import DoneIcon from '@mui/icons-material/Done';
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const ListWrapperStyle = styled(Paper)(({ theme }) => ({
  width: '50vw',
  
  borderRadius: theme.spacing(2),
  
}));

export default function ListsComponent() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container >
          <Grid item xs={12}>
            <Block >
              <Typography variant="h3"  fontWeight="bold" color="primary" gutterBottom>
                Features
              </Typography>
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItemButton>
                    <ListItemIcon>
                    <DoneIcon sx={{ color: 'primary.main', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: 32 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                        Appointment Scheduling
                      </Typography>
                      }
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemIcon>
                    <DoneIcon sx={{ color: 'primary.main', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: 32 }} />


                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          Real-time Monitoring
                        </Typography>
                        
                      }
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemIcon>
                    <DoneIcon sx={{ color: 'primary.main', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: 32 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                            Queue Management
                        </Typography>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                    <DoneIcon sx={{ color: 'primary.main', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: 32 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                         Geo Location Tracking
                        </Typography>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                    <DoneIcon sx={{ color: 'primary.main', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: 32 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                            Real-time Updates
                        </Typography>
                      }
                    />
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