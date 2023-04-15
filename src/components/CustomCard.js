import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia  from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import infoThumb from '../assets/rider.gif';

const CustomCard = (props) => {
    const { price, time, esttime } = props;
  return (
    <Card className='custom-card'>
    <CardMedia
        component="img"
        alt="thumbnail"
        image={infoThumb}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Siparişiniz yolda!
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Sipariş Tarihi: {time}
            <br/>
            Tahmini Varış: {esttime}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
