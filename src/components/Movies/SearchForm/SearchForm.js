import "./SearchForm.css";
import { React } from "react";
import { useLocation } from "react-router-dom";
import lens from "../../../images/searchform/magnifier.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
    searchValue,
    setSearchValue,
    showShortOnly,
    setShowShortOnly,
    ...props
}) {
    const location = useLocation().pathname.toLocaleLowerCase();

    // Отправка запроса на фильм
    const submitRequestMovies = (evt) => {
        const valueInput = document.getElementById("searchform-input-movies");

        evt.preventDefault();
        if (!checkValidationRequest()) {
            return;
        }
        return props.usersSearchRequest(valueInput.value);
    };

    // Отправка запроса на сохраненные фильмы
    const submitRequestSaveMovies = (evt) => {
        const valueInput = document.getElementById("searchform-input-movies");

        evt.preventDefault();
        if (!checkValidationRequest()) {
            return;
        }
        return props.usersSearchRequest(valueInput.value);
    };

    // Проверка пустого запроса
    const checkValidationRequest = () => {
        const valueInput = document.getElementById("searchform-input-movies");
        const showErrorInput = document.querySelector(
            ".searchform__error-inputSearch"
        );

        if (valueInput.value.length !== 0) {
            showErrorInput.classList.remove("active");
            return true;
        }
        showErrorInput.textContent = "Нужно ввести ключевое слово";
        showErrorInput.classList.add("active");
        return false;
    };

    return (
        <section className="searchform">
            <div className="searchform__container">
                <form
                    onSubmit={
                        location === "/pagemovies"
                            ? submitRequestMovies
                            : submitRequestSaveMovies
                    }
                    className="searchform__form"
                >
                    <div className="searchform__form__container">
                        <div className="searchform__form-input__container">
                            <input
                                className="searchform__form-input"
                                type="text"
                                placeholder="Фильм"
                                id="searchform-input-movies"
                                value={searchValue}
                                onChange={(evt) => setSearchValue(evt.target.value)}
                            />
                            <button className="searchform__form-btn" type="submit">
                                <img
                                    className="searchform__form-btn__lens"
                                    src={lens}
                                    alt="Поиск фильма"
                                />
                            </button>
                        </div>
                        <FilterCheckbox
                            checkBoxStat={showShortOnly}
                            checkboxStatus={setShowShortOnly}
                        />
                    </div>

                    <span className="searchform__error-inputSearch"></span>
                </form>
            </div>
        </section>
    );
}

export default SearchForm;