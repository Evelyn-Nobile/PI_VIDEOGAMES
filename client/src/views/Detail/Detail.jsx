import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react";
import {useParams} from "react-router-dom"
import {  getDetails, clearDetails} from "../../redux/actions"
import { BackButton } from "../../components";
import style from './Detail.module.css'



const Details = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const detail = useSelector(state => state.detail)

    
          useEffect(() => {
       dispatch(clearDetails());
       
         dispatch(getDetails(id)); 
          },
        [dispatch, id]);
  
   
  

    return (
    
<div className={style.detailContainer}>
<div className={style.backButtonDetails}>
    <BackButton />
  </div>
  <div className={style.detailsSection}>
    <h2>{detail.name?.toUpperCase()}</h2>
    <img src={detail.image} alt={detail.name} />
    <p>Genres: {detail.genres?.join(' - ')}</p>
    <p className={style.description} >Description: {detail.description}</p>
    <p>Released: {detail.released}</p>
    <p>Platforms: {detail.platforms?.join(' - ')}</p>
    <p>Rating: {detail.rating}</p>
  </div>
  
</div>


    
    )
}

export default Details