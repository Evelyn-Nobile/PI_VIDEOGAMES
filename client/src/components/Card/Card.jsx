/* eslint-disable react/prop-types */
//va a renderizar la info de los videogames en formato de card y vamos a tener un link para ingresar a los detalles
import {Link} from "react-router-dom"
import style from './Card.module.css'
const Card = ({id,name, image, renderStars, rating}) => {
    return (
    <div className={style.cardContainer} > 
    <div className={style.card}>
       <h2 className={style.cardName} >{name}</h2>      
     <img className={style.cardImg} src={image} alt={name} />
     {/* Llamar a la función renderStars para mostrar las estrellas */}
     <div >{renderStars(rating)}</div> 
     <div className={style.details} >
     <p className={style.detailsTx} >DETAILS:</p>
<Link to={`/details/${id}`}><img className={style.detailsImg} src= "../../../public/assets/plus.png" alt="details"></img></Link>   
     </div>
     
    </div>
    </div>
    
    )
}

export default Card