import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core"
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


const usestyles = makeStyles ( (theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem : {
        display :"flex",
        flexDirection: "column",
        alignItems: "center",
        cursor:"pointer",
        textTransform: "uppercase",
        color : "white"
    }
  }));

  export function numberwithComas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Carousel = () => {
    const [trending, setTrending] = useState([])

    const classes = usestyles();
    const {symbol,currency} = CryptoState();

    const fetchTrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
    // console.log(trending);
    
    useEffect(() => {
        fetchTrendingCoins()
    }, [currency])
    
    const items = trending.map((coin) => {
        // console.log(coin);
         const profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link className={classes.carouselItem} 
                to={`/coins/${coin}`}
            >
            <img
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{marginBottom : 10}}
            />
            <span>
                    {coin?.symbol}
                    &nbsp;
                    <span 
                         style={{color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight:500
                        }}
                    >
                        {profit && '+'} {coin.price_change_percentage_24h?.toFixed(2)}%
                    </span>
            </span>
            <span>
                {symbol} {numberwithComas(coin.current_price.toFixed(2))}
            </span>
            </Link>
        )
    })

    const responsive = {
        0: {
           items: 2,
         },
         512: {
           items: 4,
       },
    }

  return (
    <div className={classes.carousel}>
         <AliceCarousel 
         mouseTracking
         infinite
         autoPlayInterval={1000}
         animationDuration={1500}
         responsive={responsive}
         autoPlay
         disableDotsControls
         disableButtonsControls
         items={items} 
         />
    </div>
  )
}

export default Carousel