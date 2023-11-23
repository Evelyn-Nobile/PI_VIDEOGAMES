import { Link } from "react-router-dom";
import style from './Navbar.module.css';
import clickSound from '../../assets/press.mp3'; 


const Navbar = () => {
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <div className={style.navbar}>
      
<Link to="/home" className={style.navLink1} onClick={playClickSound}>
   <span className={style.navSpan1}>HOME</span>   
     </Link>

     <Link to="/create" className={style.navLink2}>
   <span className={style.navSpan2} onClick={playClickSound}>CREATE</span>
     </Link>

     <Link to="/" className={style.navLink3}>
   <span className={style.navSpan3}onClick={playClickSound} >EXIT</span>
     </Link>
     
    </div>
  );
};

export default Navbar;