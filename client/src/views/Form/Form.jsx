import { useState, useEffect, useCallback } from "react"
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import validations from "./validation"
import {postVideogame,getGenres, getVideogames} from '../../redux/actions'
import { BackButton } from "../../components"
import style from './Form.module.css'


const Form = () => {

  const { newVideogame, error} = useSelector(state => state.createdVideogame);
  const genres = useSelector((state) => state.genres)
  const games = useSelector((state) => state.allGames)

const dispatch = useDispatch()
const navigate = useNavigate()

const [input, setInput] = useState({
  name: '',
  image: '',
  description:'',
  released:'',
  rating:'',
  platforms: [],
  genres: [],
  
})
//estado para restablecer los valores de los input (reset)
 // eslint-disable-next-line no-unused-vars
 const [initialInput, setInitialInput] = useState({});

// Función para restablecer los valores del formulario a los valores iniciales
const resetForm = () => {
  setInput({ ...initialInput,  description: ''});
  setErrors({});
} 


 const [errors, setErrors] = useState({})

//  const validateForm = () => {
//   const newErrors = validations(input); 

//   return newErrors;
// };


// const handleErrors = useCallback(() => {
//   const newErrors = validateForm();
//   setErrors(newErrors);
// });

const handleErrors = useCallback(() => {
  const newErrors = validations(input);
  setErrors(newErrors);
}, [input, setErrors]);



 useEffect(() => {
    dispatch(getVideogames())  
    dispatch(getGenres())   
    if (newVideogame) {
        console.log('New videogame created:', newVideogame);      
      }

      if (error) {
        console.error('We cannot create the videogame:', error);        
      }
    }, [dispatch, error, input, newVideogame]
  )

    

    const [touched, setTouched] = useState(false);

    useEffect(() => {
      if (touched) {
        handleErrors();
      }
    }, [handleErrors, input, touched]);
  
    const handleChangeInput = (event) => {
      setTouched(true); 
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    };


    const handleSubmit = async (event) => {
      event.preventDefault();
    
     // const newErrors = validateForm();
     handleErrors();
      if (Object.values(errors).every((error) => !error)) { //newerrors en la version anterior
        try {
          // Verificar si el videojuego ya existe antes de enviar la solicitud
          const existingGame = games.find((game) => game.name === input.name);
    
          if (existingGame) {
            alert('Oops! The videogame already exists. Please choose a different name.');
            return; // Detener el proceso si el videojuego ya existe
          }
    
          await dispatch(postVideogame(input));
          alert('Yeah! Videogame created successfully!');
          navigate('/home');
          setInput(initialInput);
          setErrors({});
        } catch (error) {
          alert('Oops! Something went wrong. Please try again.');
          console.error(error.message);
        }
      } else {
        alert('Please fix the errors in the form before submitting.');
      }
    };
    
    
    
    const handleRemoveField = (field, value) => {
      setInput((prevInput) => ({
        ...prevInput,
        [field]: prevInput[field].filter((selectedValue) => selectedValue !== value),
      }));
    };

    const handleGenreSelect = (event) => {
      const selectedGenre = event.target.value;
      setInput((prevInput) => ({
        ...prevInput,
        genres: [...new Set([...prevInput.genres, selectedGenre])],
      }));
      handleErrors();
    };
    
    const handlePlatformSelect = (event) => {
      const selectedPlatform = event.target.value;
      setInput((prevInput) => ({
        ...prevInput,
        platforms: [...new Set([...prevInput.platforms, selectedPlatform])],
      }));
      handleErrors();
    };
    
    
  //platforms:

  // const allPlatforms = Array.from(
  //   new Set(
  //     games?.reduce((platforms, game) => {
  //       return platforms.concat(game.platforms|| []);
  //     }, [])
  //   )
  // );
  
// const handleCheckbox = (event) => {
//     const selectedPlatform = event.target.value;
//     const isSelected = input.platforms.includes(selectedPlatform);

//     setInput({
//         ...input,
//         platforms: isSelected
//             ? input.platforms.filter((platform) => platform !== selectedPlatform)
//             : [...input.platforms, selectedPlatform],
//     });
// };

  



    return (
    
<form onSubmit={handleSubmit} className={style.formContainer} >

<h1 className={style.formTitle} >Create your own videogame!</h1>

   
<div className={style.labelContainer}>

    <div>
    <label htmlFor="name">Name:</label>     
  <input  type="text"  value={input.name} name="name" placeholder="Name" onChange={handleChangeInput} onBlur={handleErrors}/>
  <p>{errors.name}</p>
    </div>

   <div>
    <label htmlFor="image">Image Url:</label>
    <input  type="text"  value={input.image} name="image" placeholder="URL" onChange={handleChangeInput} onBlur={handleErrors}/>
    <p>{errors.image}</p>
   </div>
   </div>

    <div>
       <label htmlFor="description">Description:</label> 
       <textarea name="description" value={input.description} cols="50" rows="5" onChange={handleChangeInput} onBlur={handleErrors} >

       </textarea>
       <p>{errors.description}</p>
    </div>

<div className={style.labelContainer}>

   <div>
    <label htmlFor="released">Release Date (YYYY-MM-DD):</label>
    <input  type="text"  value={input.released} name="released"  onChange={handleChangeInput} onBlur={handleErrors}/>
    <p>{errors.released}</p>
   </div>

   <div>
    <label htmlFor="rating">Rating:</label>
    <input  type="text"  value={input.rating} name="rating" placeholder="Rating" onChange={handleChangeInput} onBlur={handleErrors} />
    <p>{errors.rating}</p>
   </div>

   </div>

   {/* < className={style.formCheckbox} >
      {/* <label  className={style.checkLabel}>Platforms:</label>  */}
      {/* {allPlatforms?.map((platform, index) => (
        <div key={index}>
          <input 
            type="checkbox"           
            name="platforms"
            value={platform}
            onChange={handleCheckbox}
          />
          <label className={style.checkText}>{platform}</label>
        </div>
      ))}
      <p>{errors.platforms}</p>
    </div> */} 
 
 <div>
  <label htmlFor="platforms">Platforms:</label>
  <select required onChange={(event) => handlePlatformSelect(event, 'platforms')} value={input.platforms && input.platforms.length > 0 ? 
    input.platforms[0] : "" }>
    <option value="" hidden>
      SELECT
    </option>
    {games && games.length > 0 &&
      [...new Set(games.reduce((platforms, game) => platforms.concat(game.platforms || []), []))].map((platform, index) => (
        <option key={index} value={platform}>
          {platform}
        </option>
      ))}
  </select>
  <p>{errors.platforms}</p>
</div>
<ul>
  <li>{input.platforms?.map((platform, index) => (
    <div key={index}>
      {platform}{' '}
      <button type="button" onClick={() => handleRemoveField('platforms', platform)} className={style.closeButton} >
        ❌
      </button>
    </div>
  ))}</li>
</ul>


<div>
  <label htmlFor="genres">Genres:</label>
  <select required onChange={(event) => handleGenreSelect(event, 'genres')}  value={input.genres && input.genres.length > 0 ?
     input.genres[0] : ""}>
    <option value="" hidden>
      SELECT
    </option>
    {genres && genres.length > 0 &&
      genres.map((genre, index) => (
        <option key={index} value={genre}>
          {genre}
        </option>
      ))}
  </select>
  <p>{errors.genres}</p>
</div>
<ul>
  <li>{input.genres?.map((genre, index) => (
    <div key={index}>
      {genre}{' '}
      <button type="button" onClick={() => handleRemoveField('genres', genre)} className={style.closeButton}>
        ❌
      </button>
    </div>
  ))}</li>
</ul>



<div className={style.buttonsContainer}>
<div className={style.backContainer} > <BackButton /> </div>
    <button type="reset" onClick={resetForm} className={style.buttonReset}>RESET</button>
    <button className={style.buttonSubmit} type="submit" disabled={ 
            !input.name ||
            !input.image ||
            !input.description ||
            !input.rating ||
            !input.released || 
            !input.genres ||
           !input.platforms||
        Object.values(errors).some((error) => error !== "")
          }
     >CREATE</button> 
</div>

</form>

    
    )
}

export default Form