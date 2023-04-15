import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia  from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import infoThumb from '../assets/info_thumb.png';

const CustomCard = (props) => {
    const { price, time, esttime } = props;
  return (
    <Card className='custom-card'>
    <CardMedia
        component="img"
        alt="thumbnail"
        height="140"
        image={infoThumb}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Siparişiniz hazırlanıyor..
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
