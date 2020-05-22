import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AsyncSelect from 'react-select/lib/Async'
import axios from 'axios'

const NEW_API_KEY = '?api_key=cfe422613b250f702980a3bbf9e90716'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie'
const LANGUAGE = '&language=en-US&'
const END_OPTIONS = '&page=1&include_adult=false'
const QUERY = `query=`

export default class MovieList extends Component {
    state = {selectedTitle: ''}
  
    searchTitles = async(event, value) => {
      console.log('searching : ', value)
      let searchTerm = value
  
      const urlRequest = `${SEARCH_URL}${NEW_API_KEY}${LANGUAGE}${QUERY}${searchTerm}${END_OPTIONS}`
      const newRequest = axios.get(urlRequest)
  
      if (newRequest) {
        // new promise: pending
        return newRequest.then(response => {
          // promise resolved : now I have the data, do a filter
          const compare = response.data.results.filter(i =>
            i.overview.toLowerCase().includes(value.toLowerCase())
          )
          // reurning the label for react-select baed on the title
          return compare.map(film => ({
            label: film.title,
            value: film.id
          }))
        })
      }
    }
    render() {
      return (
        <div className="App">
          <AsyncSelect
            // This is the example that the list was cleared (FIXED)
            cacheOptions
            defaultOptions
            value={this.state.selectedTitle}
            loadOptions={this.searchTitles}
            onInputChange={(property, value) => {
              console.log("changes" + property)
              this.setState({ selectedTitle: property })
            }}
          />
        </div>
      )
    }
  }

  

