import { Link } from "react-router-dom";
import style from './Landing.module.css'
import clickSound from '../../assets/start.mp3'; 

const Landing = () => {

    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
      };
    
    return (
       
    <div>
        <div className= {style.landingContainer}>
            <div className= {style.imagesContainer}></div>
         <img className= {style.heroImage} src="../../../assets/start.gif" alt="start" />   
        <img className= {style.coinImage}src="../../../public/assets/coin.png" alt="insert-coin" />  

        <Link to="/home"><button className= {style.landingButton}  onClick={playClickSound}>START</button></Link> 
        
        </div>
        
    </div>

    
    )
}

export default Landing