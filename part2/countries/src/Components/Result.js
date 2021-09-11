import React from 'react'

const Result = (props) => {
    const countries = props.countries
    console.log(countries[0])
    const filter = props.filter
    const result = countries.filter( c => c.name.toLowerCase().match(filter.toLowerCase()))
    console.log(result.length, "length")
    if(result.length > 10 || filter === ''){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if(result.length > 1){
        return (
            <div>
                <ul>
                    {result.map( p =>
                        <li key={p.alpha2Code}>{p.name}</li>)}
                </ul>
            </div>
        )
    } else if (result.length === 0){
        <div>
            Couldn't find any country
        </div>
    } else if (result.length === 1){
        const country = result[0]
        return(
            <div>
                <h1>{country.name}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map(l =>
                    <li key={l.name}>{l.name}</li>)
                    }
                </ul>
            </div>
        )
    }
    return (
        <div>
            We had some trouble retrieving the information
        </div>
    )
}

export default Result