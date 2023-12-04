import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../index';
import style from './CardContainer.module.css';

const CardContainer = () => {
  const { allGames, selectedGenres, pagination, createdVideogame, selectedOrigin} = useSelector((state) => state);
  const { currentPage, itemsPerPage } = pagination;

  // eslint-disable-next-line no-unused-vars
  const [newGame, setNewGame] = useState(null);

  useEffect(() => {
    if (createdVideogame.newVideogame !== null) {
      setNewGame(createdVideogame.newVideogame);
    }
  }, [createdVideogame]);


  // Calcula el índice de inicio y fin según la página actual y la cantidad de elementos por página
  const indexOfLastGame = currentPage * itemsPerPage;
  const indexOfFirstGame = indexOfLastGame - itemsPerPage;

  // Combina los videojuegos existentes con el nuevo videojuego creado
  const allGamesWithCreated = createdVideogame.newVideogame
    ? [...allGames, createdVideogame.newVideogame]
    : allGames;

// Filtra los videojuegos combinados según origen seleccionado
    const filteredGamesWithOrigin = allGamesWithCreated.filter((game) =>
    selectedOrigin === 'all' ? true : (selectedOrigin === 'created' ? game.createdInDB : !game.createdInDB)
  );
  // segun generos
  const filteredGamesWithGenresAndOrigin = filteredGamesWithOrigin.filter((game) =>
    selectedGenres.length === 0 ? true : game.genres?.some((genre) => selectedGenres.includes(genre)),

  );
  
  const currentGames = filteredGamesWithGenresAndOrigin.slice(indexOfFirstGame, indexOfLastGame);

  // Filtra por rating
  // const filteredGamesWithRating = filteredGamesWithOrigin.filter((game) =>
  //   selectedRating === 'all' ? true : (selectedRating === 'asc' ? game.rating >= 0 && game.rating <= 5 : game.rating >= 0 && game.rating <= 5)
  // );

  // Ordena los juegos según el criterio seleccionado
  // let sortedGames = [...filteredGamesWithRating];
  // if (selectedOrder === 'asc') {
  //   sortedGames = sortedGames.sort((a, b) => a.name.localeCompare(b.name));
  // } else if (selectedOrder === 'des') {
  //   sortedGames = sortedGames.sort((a, b) => b.name.localeCompare(a.name));
  // }



  const renderStars = (rating) => {
    const stars = [];

    // Redondea el rating a la mitad más cercana
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
       
        stars.push(<span key={i}><img src='../../../public/assets/star.png' alt='star' 
        style={{ width: '17px', height: '17px', paddingTop: '15px' }}></img></span>);

      } else if (i - 0.5 === roundedRating) {
       
        stars.push(<span key={i}><img src='../../../public/assets/clasificacion.png' alt='star' 
        style={{ width: '17px', height: '17px', paddingTop: '15px' }}></img></span>);
      }
    }

    return stars;
  };

  return (
    <div className={style.container}>
      {currentGames && currentGames.map((game, index) => (
        <Card
          key={index}
          id={game.id}
          name={game.name.toUpperCase()}
          image={game.image}
          rating={game.rating}
          renderStars={() => renderStars(game.rating)} 
        />
      ))}
    </div>
  );
};

export default CardContainer;

