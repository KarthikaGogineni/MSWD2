import React from 'react'
import BasicCountryInfo from './BasicCountryInfo'


const Search = ({ countries, newfilter,showC }) => {
    const filtered = countries.filter(country =>
      country.name.toUpperCase().includes(newfilter.toUpperCase())
    );
    const listLen = filtered.length;
    console.log(filtered);
    if(newfilter===''){
          return <div />
    }
    else{

     if (listLen >= 10) {
      return <div>Too many matches, specify another letter(s)</div>;
    }
  
    else if (listLen > 1 && listLen < 10) {
      return filtered.map(country => (
        <div key={country.name}>
          {country.name}<button value={country.name} onClick={showC}>show</button>
          
        </div>
      ));
    } 
    else {
      return (
        <div>
          <BasicCountryInfo country={filtered[0]} />
        </div>
      );
    }
}
  };
export default Search  