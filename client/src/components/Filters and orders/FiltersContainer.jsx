// FilterContainer.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByGenre,
  filterByOrigin,
  orderAscAndDesc,
  orderByRating,
  getGenres,
  getVideogames,
   clearFilters
} from '../../redux/actions';
import style from './FilterContainer.module.css';

const FilterContainer = () => {
  
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);


  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [order, setOrder] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleFilterGenres = (event) => {
    event.preventDefault();
    const selectedGenre = event.target.value;    
    dispatch(filterByGenre(selectedGenre));
    setSelectedGenre(selectedGenre);

  };




  const handleOrigin = (event) => {
    
    dispatch(filterByOrigin(event.target.value));
    setSelectedOrigin(event.target.value);
  };



  
  const handleOrder = (event) => {
    const selectedOrder = event.target.value;
    setOrder(selectedOrder);
    dispatch(orderAscAndDesc(selectedOrder));
  };

  const handleRating = (event) => {
    const rating = event.target.value;
    setSelectedRating(rating);
    dispatch(orderByRating(rating));
  };

  const handleResetFilters = () => {
    dispatch(getVideogames());
    dispatch(getGenres())
    setSelectedGenre('All');
    setSelectedOrigin('all');
    setOrder('all');
    setSelectedRating('all');
    dispatch(filterByGenre('All'));
    dispatch(filterByOrigin('all'));
    dispatch(orderAscAndDesc('all'));
    dispatch(orderByRating('all'));
    dispatch(clearFilters());
  };

  return (
    <div className={style.mainContainer}>
      
      
<div className={style.orderContainer}>
<div >
        <p 
        className={style.nameText}
        >NAME:</p>
        <select
          onChange={handleOrder}
          value={order}
          className={style.nameSelect}
        >
          <option value="all">All</option>
          <option value="asc">A - Z</option>
          <option value="des">Z - A</option>
        </select>
      </div>

      <div>
        <p
            className={style.ratingText}
            >RATING:</p>
        <select
          onChange={handleRating}
          value={selectedRating}
          className={style.ratingSelect}
        >
          <option value="all">All</option>
          <option value="asc">5 - 0</option>
          <option value="des">0 - 5</option>
        </select>
      </div>
</div>
     
<div className={style.filterContainer} > 
      <div  >
        <p className={style.genreText}>GENRE:</p>
        <select
          className={style.genreSelect}
          onChange={(event) => handleFilterGenres(event)}
          value={selectedGenre}
        >
          <option value="All">All</option>
          {genres &&
            genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
        </select>
      </div>

      <div>
        <p 
        className={style.originText}
        >ORIGIN:</p>
        <select
          onChange={(event) => handleOrigin(event)}
          className={style.originSelect}
          value={selectedOrigin}
        >
          <option value="all">All</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
      </div>
      </div>
     
      <div className={style.resetContainer}>  <button onClick={handleResetFilters} className={style.resetButton} >RESET FILTERS</button></div>
    
    </div>
  );
};

export default FilterContainer;
