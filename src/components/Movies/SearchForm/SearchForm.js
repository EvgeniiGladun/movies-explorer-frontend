import React from 'react'
import lens from '../../../images/searchform/magnifier.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
    return (
        <section className='searchform'>
            <div className='searchform__container'>

                <form className='searchform__form'>
                    <div className='searchform__form__container'>
                        <div className='searchform__form-input__container'>
                            <input className='searchform__form-input' type='text' placeholder='Фильм' required />
                            <button className='searchform__form-btn' type='submit'>
                                <img className='searchform__form-btn__lens' src={lens} alt='Поиск фильма' />
                            </button>
                        </div>
                        <FilterCheckbox />
                    </div>

                </form>
            </div>

        </section>
    )
}

export default SearchForm;