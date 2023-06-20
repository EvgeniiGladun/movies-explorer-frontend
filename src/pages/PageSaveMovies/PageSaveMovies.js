import { React, useState, useCallback, useMemo } from "react";
import Layout from "../../components/Layout/Layout";
import MoviesCard from "../../components/Movies/MoviesCard/MoviesCard";

function PageSaveMovies(props) {
    const [filterString, setFilterString] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [showShortOnly, setShowShortOnly] = useState(false);

    const filteredMovies = useMemo(() => {
        return props.dataUserMovies.filter((movie) => {
            if (showShortOnly && movie.duration > 40) {
                return false;
            }
            return (
                movie.nameRU.toLowerCase().includes(filterString) ||
                movie.nameEN.toLowerCase().includes(filterString)
            );
        });
    }, [props.dataUserMovies, filterString, showShortOnly]);

    const handleSearch = useCallback((query) => {
        setFilterString(query);
    }, []);

    return (
        <>
            <Layout
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                preloader={props.preloader}
                dataUserMovies={filteredMovies}
                getErrorMovies={props.getErrorMovies}
                showBlockErr={props.showBlockErr}
                usersSearchRequest={handleSearch}
                showBlockCards={props.showBlockCards}
                showShortOnly={showShortOnly}
                setShowShortOnly={setShowShortOnly}
            >
                {filteredMovies.map((movie) => {
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
                    );
                }) ?? []}
            </Layout>
        </>
    );
}

export default PageSaveMovies;