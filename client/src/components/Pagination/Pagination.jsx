/* eslint-disable react/prop-types */
import style from './Pagination.module.css'
const Pagination = ({ currentPage, totalPages, onChangePage }) => {

  const pageNumbers = [];
for (let i = 1; i <= totalPages; i++) {
  pageNumbers.push(i);
}

  return (
    
    <div>

      <div className={style.paginationContainer}>
      <button onClick={() => onChangePage(currentPage - 1)} disabled={currentPage === 1} className={style.pagButtons}>
        <img  src="../../../public/assets/Previous.png" alt="prev" className={style.pagImg}/>
      </button>
      {pageNumbers.map((number) => (
        <button className={style.numberButton} key={number} onClick={() => onChangePage(number)} disabled={currentPage === number}>
          {number}
        </button>
      ))}

      <button onClick={() => onChangePage(currentPage + 1)} disabled={currentPage === totalPages} className={style.pagButtons}>
       <img className={style.pagImg}  src="../../../public/assets/Next.png" alt="next" />
      </button>
    </div>
    </div>
  );
};

export default Pagination;
