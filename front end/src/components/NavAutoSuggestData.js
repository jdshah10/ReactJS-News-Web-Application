import React from "react";
import AsyncSelect from 'react-select/lib/Async';
import { withRouter } from 'react-router-dom';

class NavAutoSuggestData extends React.Component{
 state= { results: [], selectedResult: null, finaljson: []}

  fetchData = async ( inputValue ) => {
      try {
        if(inputValue){
          //console.log("input in select menu : " + inputValue);
            const response = await fetch(
              `https://jainam-shah.cognitiveservices.azure.com/bing/v7.0/suggestions?q=${inputValue}`,
              {
                  headers: {
                      "Ocp-Apim-Subscription-Key": "6263c587b09e47ea9a944c8bad817531"
                  }
              }   
            );
          //console.log("data fetched : ", response.json());
          const data = await response.json();
          const resultsRaw = data.suggestionGroups[0].searchSuggestions;
          const results = resultsRaw.map(result => ({ title: result.displayText, url: result.url }));
          this.setState({ results:results });
          
          const finaljson = [];
          for( var i = 0 ; i < results.length ; i++){
            finaljson.push({
              value:results[i]['title'],
              label: results[i]['title']
            });
          }
          return finaljson.filter(i => i.label);
        }
          
      } catch (error) {
          console.error(`Error fetching search result for keyword : ${inputValue}`);
      }
      
  };

  handleInputChange = (inputValue) => {
          localStorage.setItem("inputValue",'?q=' + inputValue.value)
          this.setState({selectedResult : inputValue.value})
          this.props.history.push({
            pathname: '/search',
            search : '?q=' + inputValue.value,
            valueChange : inputValue.value,
          }); 
      return inputValue;
  };
  render() {
    return (
      <div style={{width:"260px"}} >
        <AsyncSelect 
        value = {this.state.inputValue}
          placeholder="Enter keyword.."
          cacheOptions
          loadOptions={this.fetchData}
          
          onChange ={(e) => {this.handleInputChange(e);}}
          defaultOptions={false}
        />
      </div>
    );
  }
}

export default withRouter(NavAutoSuggestData);