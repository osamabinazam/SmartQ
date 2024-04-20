import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Card, Button, Container, Typography, IconButton } from '@mui/material';
// utils
// import mockData from '../../../utils/mock-data';
//
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import { CarouselControlsArrowsBasic2 } from '../../carousel';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

// ----------------------------------------------------------------------

// const MOCK_MEMBERS = [...Array(5)].map((_, index) => ({
//   id: mockData.id(index),
//   name: mockData.name.fullName(index),
//   role: mockData.role(index),
//   avatar: mockData.image.avatar(index)
// }));

const MEMBERS = [
  {
    id:1,
    name:"Osama Bin Azam",
    role:"Backend Developer",
    avatar:"/static/profiles/Osama_1.jpg"
  },

  {
    id:2,
    name:"Shafique Ahmed",
    role:"App Developer",
    avatar:"/static/profiles/Osama_1.jpg"
  },

  {
    id:3,
    name:"Simran Waswani",
    role:"Frontend Developer",
    avatar:"/static/profiles/Osama_1.jpg"
  },

  {
    id:4,
    name:"Hanood Tunio",
    role:"Frontend Designer",
    avatar:"/static/profiles/bunny.png"
  },

  {
    id:5,
    name:"Hadiqa Gul",
    role:"Marketing Manager",
    avatar:"/static/profiles/Osama_1.jpg"
  },

  {
    id:6,
    name:"Aditiya kapoor",
    role:"Graphics Designer",
    avatar:"/static/profiles/Osama_1.jpg"
  },
]

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string
  })
};

function MemberCard({ member }) {
  // console.log(member)
  const { name, role, avatar } = member;
  return (
    <Card key={name} sx={{ p: 1, mx: 1.5 }}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>
      <Box component="img" src={avatar} sx={{ width: '100%', height: '100%' , borderRadius: 1.5 }} />
       <Box sx={{ mt: 2, mb: 1 }}>
       {[facebookFill, instagramFilled, linkedinFill, twitterFill].map((social, index) => (
        <IconButton key={index}>
            <Icon icon={social} width={20} height={20} />
           </IconButton>
         ))}
       </Box>
     </Card>
  );
}

export default function AboutTeam() {
  const carouselRef = useRef();
  const theme = useTheme();

  const settings = {
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '0 80px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Container maxWidth="lg" sx={{ pb: 10, textAlign: 'center' }}>
      <MotionInView variants={varFadeInDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Dream team
        </Typography>
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Great team is the key
        </Typography>
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <Typography
          sx={{
            mb: 10,
            mx: 'auto',
            maxWidth: 630,
            color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white')
          }}
        >
          Minimal will provide you support if you have any problems, our support team will reply within a day and we
          also have detailed documentation.
        </Typography>
      </MotionInView>

      <Box sx={{ position: 'relative' }}>
        <Slider ref={carouselRef} {...settings}>
          {MEMBERS.map((member) => (
            <MotionInView key={member.id} variants={varFadeIn}>
              <MemberCard member={member} />
            </MotionInView>
          ))}
        </Slider>
        <CarouselControlsArrowsBasic2
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{ transform: 'translateY(-64px)' }}
        />
      </Box>
      {/* <Button
        variant="outlined"
        color="inherit"
        size="large"
        endIcon={<Icon icon={roundArrowRightAlt} width={24} height={24} />}
        sx={{ mx: 'auto' }}
      >
        View all team members
      </Button> */}
    </Container>
  );
}
