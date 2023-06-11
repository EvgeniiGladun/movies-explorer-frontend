import { React, useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import MoviesCard from "../../components/Movies/MoviesCard/MoviesCard";
import { firstMovies, nextStep } from "../../utils/constants";
import apiOther from "../../utils/MoviesApi";

function PageMovies(props) {
    const [filterString, setFilterString] = useState(
        localStorage.getItem("filterString") ?? ""
    );
    const [searchValue, setSearchValue] = useState(filterString);
    const [showShortOnly, setShowShortOnly] = useState(false);
    const [moreButton, setMoreButton] = useState(false);
    const [showMovies, setShowMovies] = useState([]);
    const [paginator, setPaginator] = useState();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showBlockCards, setShowBlockCards] = useState(false);
    const [showBlockErr, setShowBlockErr] = useState(false);
    const [getErrorMovies, setGetErrorMovies] = useState(false);
    const [dataMovies, setDataMovies] = useState([]);

    const handleResize = useCallback(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getMoviesList = () => {
        props.handleShowPreloader(true);
        setShowBlockErr(false);
        setShowBlockCards(true);

        apiOther
            .getMoviesList()
            .then((moviesList) => {
                let arrayMovies = moviesList.filter((movie) => {
                    if (showShortOnly && movie.duration > 40) {
                        return false;
                    }
                    return (
                        movie.nameRU.toLowerCase().includes(filterString) ||
                        movie.nameEN.toLowerCase().includes(filterString)
                    );
                });

                setDataMovies(arrayMovies);

                if (arrayMovies.length <= 0) {
                    setShowBlockCards(false);
                    setGetErrorMovies(false);
                    setShowBlockErr(true);
                    return;
                }
            })
            .catch(() => {
                setGetErrorMovies(true);
                setShowBlockCards(false);
            })
            .finally(() => {
                props.handleShowPreloader(false);
            });
    };

    useEffect(() => {
        localStorage.setItem("filterString", filterString);
    }, [filterString]);

    useEffect(() => {
        const shortOnly = localStorage.setItem("showShortOnly", showShortOnly);

        if (shortOnly) {
            setShowShortOnly(JSON.parse(shortOnly));
        }
    }, [showShortOnly]);

    useEffect(() => {
        showFirstMovies();
    }, [dataMovies, screenWidth]);

    useEffect(() => {
        setMoreButton(paginator < dataMovies.length);
    }, [showMovies]);

    useEffect(() => {
        getMoviesList();
    }, [filterString, showShortOnly]);

    const showFirstMovies = () => {
        const firstMoviesCount =
            screenWidth > 1279
                ? firstMovies.large
                : screenWidth > 954
                    ? firstMovies.medium
                    : screenWidth > 768
                        ? firstMovies.small
                        : firstMovies.smallest;

        setPaginator(firstMoviesCount);
        setShowMovies(dataMovies.slice(0, firstMoviesCount));
    };

    const handleSearch = useCallback((query) => {
        setFilterString(query);
    }, []);

    const showMoreMovies = () => {
        const additionalMoviesCount =
            screenWidth > 1279
                ? nextStep.large
                : screenWidth > 954
                    ? nextStep.medium
                    : screenWidth > 768
                        ? nextStep.small
                        : nextStep.smallest;

        const nextPaginator = paginator + additionalMoviesCount;
        setShowMovies(dataMovies.slice(0, nextPaginator));
        setPaginator(nextPaginator);
    };

    return (
        <>
            <Layout
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                preloader={props.preloader}
                moviesList={dataMovies}
                showBlockCards={showBlockCards}
                showBlockErr={showBlockErr}
                usersSearchRequest={handleSearch}
                getErrorMovies={getErrorMovies}
                showMoreMovies={showMoreMovies}
                moreButton={moreButton}
                showShortOnly={showShortOnly}
                setShowShortOnly={setShowShortOnly}
            >
                {showMovies.map((movie) => {
                    return (
                        <MoviesCard
                            movie={movie}
                            hendlerMoviesLike={props.hendlerMoviesLike}
                            handleAddPlaceSubmit={props.handleAddPlaceSubmit}
                            dataUserMovies={props.dataUserMovies}
                            key={movie.id}
                            {...movie}
                        />
                    );
                })}
            </Layout>
        </>
    );
}

export default PageMovies;