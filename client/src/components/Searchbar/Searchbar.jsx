import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { getVideogameByName, getVideogames, clearFilters} from '../../redux/actions';
import style from '../Searchbar/Searchbar.module.css'



const SearchBar = () => {

  const dispatch = useDispatch();


  const [searchTerm, setSearchTerm] = useState('');
 

  // eslint-disable-next-line no-unused-vars
  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      dispatch(getVideogameByName(searchTerm));
      setSearchTerm('');
    }
  };
  

  const handleKeyDown = (event) => {
    // Verifica si la tecla presionada es Enter (código 13)
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
   
  const handleClearSearch = async (event) => {
    event.preventDefault();
    dispatch(getVideogames());
    dispatch(clearFilters());
  };
  
  
  return (
    <div className={style.searchContainer}>

      <input className={style.inputSearch}
        type="text" 
        placeholder="Enter a name..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      
       <button onClick={handleSearch} className={style.searchButton} >Search</button>  <button className={style.searchClearButton} onClick={(event) => handleClearSearch(event)}>CLEAR</button> 
    </div>
  );
};


export default SearchBar;



