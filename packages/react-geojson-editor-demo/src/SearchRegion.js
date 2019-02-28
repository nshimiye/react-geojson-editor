import React from 'react';
import Autosuggest from 'react-autosuggest';

  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // function getSuggestions(value) {
  //   const escapedValue = escapeRegexCharacters(value.trim());
    
  //   if (escapedValue === '') {
  //     return [];
  //   }
  
  //   const regex = new RegExp('^' + escapedValue, 'i');
  
  //   return languages.filter(language => regex.test(language.name));
  // }
  
  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }
  
  export class SearchRegion extends React.Component {
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: [],
      };    
    }

    getSuggestions = (value) => {
      const escapedValue = escapeRegexCharacters(value.trim());
      
      if (escapedValue === '') {
        return [];
      }
    
      const regex = new RegExp('^' + escapedValue, 'i');
    
      return (this.props.regions||[]).filter(region => regex.test(region.name));
    }
  
    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
      console.log('[onSuggestionsFetchRequested]', value);
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
      console.log('[onSuggestionSelected]', suggestion);
      this.props.onSuggestionSelected(suggestion)
    }
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: this.props.placeholder,
        value,
        onChange: this.onChange
      };
  
      return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      );
    }
  }
  
  export default SearchRegion;
