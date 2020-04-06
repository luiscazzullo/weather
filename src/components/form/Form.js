import React, { useState } from 'react';
import Error from '../error/Error';

const Form = ({ search, setSearch, setQuery }) => {
    const { city, country } = search;
    const [error, setError] = useState(false);
    const handleOnChange = ev => {
        setSearch({
            ...search,
            [ev.target.name] : ev.target.value
        })
    }
    const handleOnSubmit = ev => {
        ev.preventDefault();
        if(city.trim() === '' || country.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        setQuery(true)
    }
    return ( 
        <form
            onSubmit={handleOnSubmit}
        >
            {error ? 
                <Error message="Todos los campos son obligatorios" />
                : null
            }
            <div className="input-field col s12">
              <input 
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={handleOnChange}
              />  
              <label htmlFor="city">Ciudad: </label>
            </div>
            <div className="input-field col s12">
              <select
                name="country"
                id="country"
                value={country}
                onChange={handleOnChange}
              >
                <option value="">-- Seleccione un país --</option>
                <option value="US">Estados Unidos</option>
                <option value="MX">México</option>
                <option value="AR">Argentina</option>
                <option value="CO">Colombia</option>
                <option value="CR">Costa Rica</option>
                <option value="ES">España</option>
                <option value="PE">Perú</option>
              </select>
              <label htmlFor="country">País: </label>
            </div>
            <div>
                <input 
                    type="submit"
                    value="Buscar clima"
                    className="waves-effect waves-ligth btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
     );
}
 
export default Form;