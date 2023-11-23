/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/Searchbar/Searchbar';
import { getVideogames, getGenres, changePage } from '../../redux/actions';
import { CardContainer, Loader, Pagination, FilterContainer } from '../../components';

const Home = () => {
  const allGames = useSelector((state) => state.allGames);
  const pagination = useSelector((state) => state.pagination);



  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getVideogames()),
        dispatch(getGenres()),
      ]);
      setLoading(false);
    };
  
    fetchData();
  }, [dispatch]);
  



  //--------------------------paginado-----------------------------------
  const { currentPage, itemsPerPage } = pagination;
  const totalPages = Math.ceil(allGames?.length / itemsPerPage);

  const handleChangePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(changePage(page));
    }
  };

 
  return (
    <div>
    {loading ? <Loader /> : (
      <>
        <SearchBar />
        <FilterContainer />
        {allGames?.length > 0 && (
          <>
            <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage} />
            <CardContainer />
            <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage} />
          </>
        )}
      </>
    )}
  </div>
  
  );
};

export default Home;
