// import { styled } from '@mui/material/styles';
// import { Grid, List, Paper, Container, ListItemText, ListItemIcon, ListItemButton, Typography } from '@mui/material';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import Page from '../../Page';
// import { Block } from '../Block';

// const RootStyle = styled(Page)(({ theme }) => ({
//   paddingTop: theme.spacing(11),
//   paddingBottom: theme.spacing(15),
// }));

// const ListWrapperStyle = styled(Paper)(({ theme }) => ({
//   width: '100%',
//   border: `solid 1px ${theme.palette.divider}`,
//   backgroundColor: theme.palette.background.paper,
// }));

// export default function ListsComponent() {
//   return (
//     <RootStyle>
//       <Container maxWidth="lg">
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Block title="">
//               <ListWrapperStyle>
//                 <List component="nav" aria-label="main mailbox folders">
//                   <ListItemButton>
//                     <ListItemIcon>
//                       <DraftsIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="SmartQ, in partnership with Everycorner, is dedicated to transforming public service experiences in Pakistan." />
//                   </ListItemButton>
//                   <ListItemButton>
//                     <ListItemIcon>
//                       <DraftsIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Our platform is designed to significantly reduce wait times, enhance operational efficiency, and provide a seamless user experience." />
//                   </ListItemButton>
//                 </List>
//               </ListWrapperStyle>
//             </Block>
//           </Grid>
//         </Grid>
//       </Container>
//     </RootStyle>
//   );
// }
