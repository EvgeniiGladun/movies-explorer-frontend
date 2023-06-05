import { React, useState, useEffect, useCallback, useMemo } from 'react'
import Layout from '../../components/Layout/Layout';
import MoviesCard from '../../components/Movies/MoviesCard/MoviesCard';
import { firstMovies, nextStep } from '../../utils/constants';

function PageSaveMovies(props) {

    const [moreButton, setMoreButton] = useState(false);
    const [movies, setMovies] = useState(props.dataUserMovies ? props.dataUserMovies : []);
    const [page, setPage] = useState(1);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const handleResize = useCallback(() => {
        setScreenWidth(window.innerWidth);
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const moviesToRander = useMemo(() => {
        const countToRender = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;

        console.log(countToRender)
        return movies.slice(0, countToRender * page);
    }, [movies, page, screenWidth])

    const handleMoreClick = useCallback(() => {
        setPage((prev) => prev + 1);
    }, [])

    console.log(movies)

    return (
        <>
            <Layout
                preloader={props.preloader}
                dataUserMovies={props.dataUserMovies}
                getErrorMovies={props.getErrorMovies}
                showBlockErr={props.showBlockErr}
                usersSearchRequest={props.usersSearchRequest}
                showBlockCards={props.showBlockCards}
                moreButton={moreButton}
            >
                {
                    props.dataUserMovies
                        ? moviesToRander.map((movie) => {
                            return (
                                <MoviesCard
                                    movie={movie}
                                    hendlerMoviesLike={props.hendlerMoviesLike}
                                    handleAddPlaceSubmit={props.handleAddPlaceSubmit}
                                    hendlerMoviesDelete={props.hendlerMoviesDelete}
                                    dataUserMovies={props.dataUserMovies}
                                    key={movie._id}
                                    {...movie}
                                />
                            )
                        }) : []
                }
                {
                    movies > moviesToRander && <div className='cards-next'>
                        <button className='cards-next__btn-next' onClick={handleMoreClick}>Ещё</button>
                    </div>
                }
            </ Layout>
        </>
    )
}

export default PageSaveMovies