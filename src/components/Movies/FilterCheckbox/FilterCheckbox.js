import React from 'react'
import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <div className='filtercheckbox'>
            <div className='filtercheckbox__container'>
                <label className='filtercheckbox__checkbox'>
                    <h3 className='filtercheckbox__title'>Короткометражки</h3>
                    <input className='filtercheckbox__invisible-checkbox' type='checkbox' />
                    <span className='filtercheckbox__visible-checkbox-custom'></span>
                </label>
            </div>
        </div>
    )
}

export default FilterCheckbox;