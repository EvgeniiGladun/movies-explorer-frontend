import "./Layout.css";
import { React } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";

function Layout({
    moreButton,
    showMoreMovies,
    searchValue,
    setSearchValue,
    showShortOnly,
    setShowShortOnly,
    ...props
}) {
    const locationPageMovies =
        useLocation().pathname.toLocaleLowerCase() === "/pagemovies";

    const showeMovies = () => {
        showMoreMovies();
    };

    return (
        <>
            <SearchForm
                usersSearchRequest={props.usersSearchRequest}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                showShortOnly={showShortOnly}
                setShowShortOnly={setShowShortOnly}
            />
            {props.preloader ? (
                <Preloader />
            ) : (
                <section
                    className={`cards${props.showBlockCards || !locationPageMovies
                        ? ""
                        : "cards_block_hide"
                        }`}
                >
                    {props.children}
                </section>
            )}

            {props.getErrorMovies ? (
                <div
                    className={`nothing-found ${props.showBlockErr ? "" : "nothing-found_hide"
                        }`}
                >
                    <span className="nothing-found__text_error">
                        Во время запроса произошла ошибка.
                    </span>
                    <span className="nothing-found__text_error">
                        Возможно, проблема с соединением или сервер недоступен.
                    </span>
                    <span className="nothing-found__text_error">
                        Подождите немного и попробуйте ещё раз.
                    </span>
                </div>
            ) : (
                <div
                    className={`nothing-found ${props.showBlockErr ? "" : "nothing-found_hide"
                        }`}
                >
                    <span className="nothing-found__text_error">Ничего не найдено</span>
                </div>
            )}

            {moreButton && (
                <div className="cards-next">
                    <button className="cards-next__btn-next" onClick={showeMovies}>
                        Ещё
                    </button>
                </div>
            )}
        </>
    );
}

export default Layout;