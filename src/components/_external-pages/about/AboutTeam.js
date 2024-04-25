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
import { Box, Card, Container, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { varFadeIn, varFadeInUp, varFadeInDown } from '../../animate';
import { CarouselControlsArrowsBasic2 } from '../../carousel';

const MEMBERS = [
  {
    id: 1,
    name: "Osama Bin Azam",
    role: "Backend Developer",
    avatar: "/static/profiles/Osama_1.jpg",
    socialLinks: {
      facebook: 'https://www.facebook.com/osama.bin.azam',
      instagram: 'https://www.instagram.com/osama.bin.azam',
      linkedin: 'https://www.linkedin.com/in/osama-bin-azam',
      twitter: 'https://www.twitter.com/osama.bin.azam'
    }
  },
  {
    id: 2,
    name: "Shafique Ahmed",
    role: "App Developer",
    avatar: "/static/profiles/Osama_1.jpg",
    socialLinks: {
      facebook: 'https://www.facebook.com/shafique.ahmed',
      instagram: 'https://www.instagram.com/shafique.ahmed',
      linkedin: 'https://www.linkedin.com/in/shafique-ahmed',
      twitter: 'https://www.twitter.com/shafique.ahmed'
    }
  },
  {
    id: 3,
    name: "Simran Waswani",
    role: "Frontend Developer",
    avatar: "/static/profiles/Osama_1.jpg",
    socialLinks: {
      facebook: 'https://www.facebook.com/simran.waswani',
      instagram: 'https://www.instagram.com/simran.waswani',
      linkedin: 'https://www.linkedin.com/in/simran-waswani',
      twitter: 'https://www.twitter.com/simran.waswani'
    }
  },
  {
    id: 4,
    name: "Hanood Tunio",
    role: "Frontend Designer",
    avatar: "/static/profiles/bunny.png",
    socialLinks: {
      facebook: 'https://www.facebook.com/hanood.tunio',
      instagram: 'https://www.instagram.com/hanood.tunio',
      linkedin: 'https://www.linkedin.com/in/hanood-tunio',
      twitter: 'https://www.twitter.com/hanood.tunio'
    }
  }
];

function MemberCard({ member }) {
  const { name, role, avatar, socialLinks } = member;

  return (
    <Card key={name} sx={{ p: 2, mx: 1.5, height: 400 }}> {/* Increased height */}
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>
      <Box
        component="img"
        src={avatar}
        sx={{
          width: '100%',
          maxHeight: '250px', // Set maximum height for the image
          objectFit: 'cover',
          borderRadius: 1.5
        }}
      />
      <Box sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'center' }}>
        <IconButton component="a" href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
          <Icon icon={facebookFill} width={20} height={20} />
        </IconButton>
        <IconButton component="a" href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
          <Icon icon={instagramFilled} width={20} height={20} />
        </IconButton>
        <IconButton component="a" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <Icon icon={linkedinFill} width={20} height={20} />
        </IconButton>
        <IconButton component="a" href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
          <Icon icon={twitterFill} width={20} height={20} />
        </IconButton>
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
      <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
        Dream team
      </Typography>

      <Typography variant="h2" sx={{ mb: 3 }}>
        Great team is the key
      </Typography>

      <Typography
        sx={{
          mb: 10,
          mx: 'auto',
          maxWidth: 630,
          color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white')
        }}
      >
        SmartQ will provide you support if you have any problems, our support team will reply within a day and we
        also have detailed documentation.
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Slider ref={carouselRef} {...settings}>
          {MEMBERS.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </Slider>
        <CarouselControlsArrowsBasic2
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{ transform: 'translateY(-64px)' }}
        />
      </Box>
    </Container>
  );
}
