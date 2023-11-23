import style from './Loader.module.css'

const Loader = () => {
    return (
        <div className={style.loaderContainer}>
        <img className={style.loaderImg} src="../../../public/assets/loader-unscreen.gif" alt="Loading..." />
        <h2 className={style.loaderText} >Loading</h2>
      </div>
    )
}

export default Loader; 