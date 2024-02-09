import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

export default function VerifyCode({ onVerified }) {
  const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);

  const handleChange = (index, value) => {
    const newInputs = [...otpInputs];
    newInputs[index] = value;
    setOtpInputs(newInputs);
  };

  const handleVerification = () => {
    const otp = otpInputs.join('');
  
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      
      onVerified();
    } else {

      alert('Invalid OTP. Please enter a 6-digit code.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Email Verification</Typography>
        <Typography paragraph>We have sent a code to your email</Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}> 
          {otpInputs.map((input, index) => (
            <input
              key={index}
              style={{
                width: '30px',
                height: '30px',
                textAlign: 'center',
                marginRight: '10px',
                border: '1px solid #000',
                borderRadius: '5px',
                fontSize: '20px',
              }}
              maxLength="1"
              type="text"
              value={input}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <Button variant="contained" onClick={handleVerification}>Verify Account</Button>
      </div>
    </div>
  );
}
