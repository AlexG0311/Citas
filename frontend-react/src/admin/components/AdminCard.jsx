import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from 'react'


export default function AdminCard({ img, text, link }) {


  const [shake, setShake] = useState(false);

  const handleClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // duración de la animación
  };
  return (
    <div className={`transition-transform duration-300 transform hover:scale-105 hover:-translate-y-1 ${
        shake ? 'animate-shake' : ''
      }`}
      
       onClick={handleClick}>

         <Card sx={{ maxWidth: 345}}  className='shadow-2xl'>
      <CardActionArea component={Link} to={link}>
        <CardMedia
          sx={{ height: 140, objectFit: 'contain' }}        
          component="img"
          height="140"
          image={img}
          alt={text}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {text}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ir a {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </div>
   
  );
}
