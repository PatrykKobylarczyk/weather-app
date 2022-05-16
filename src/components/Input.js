import React from 'react';

import '../styles/input.scss'

const Input = (props) => {
    return (
        <div className="city-input">
            <form onSubmit={props.checkForm}>
                <div className='input-wrap'>
                    <label>
                        <input type="text" name='name' placeholder='Enter city name...' onChange={props.cityName} />
                        <button type="submit" className='wi wi-meteor'></button>
                    </label>
                </div>
                <p className='error-msg'></p>
            </form>
        </div>
    );
}

export default Input;