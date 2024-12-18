import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CardsComponent(props) {
  return (
    <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          width="150"
          image={props.imgURL}
          alt="No image found"
          sx={{ maxWidth: 150 }}
        />
        <CardContent>
          <Typography >
            {props.title}
          </Typography>          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
