import { useNavigate } from 'react-router-dom';
import style from './BackButton.module.css'
import clickSound from '../../assets/press.mp3'; 



const BackButton = () => {


  const navigate = useNavigate();

  const handleGoBack = () => {
    const audio = new Audio(clickSound);
    audio.play();
    navigate(-1);

  };

  return (
    <button onClick={handleGoBack} className={style.backButton}>
      BACK
    </button>
  );
};

export default BackButton;