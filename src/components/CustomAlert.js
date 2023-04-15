import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function CustomAlert(props) {
  // get message from props
    const { message } = props;
  return (
    <Alert className='custom-alert' severity="info" color="info">
        {message}
    </Alert>
  );
}