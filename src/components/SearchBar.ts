import React from 'react';

// defining the component props
interface Props {
  setSearchState: Function
}

// this makes using this function MUCH cleaner
const e = React.createElement;

const SearchBar: React.FC<Props> = ({ setSearchState }) => {
  return e('div', { className: 'text-center' },
    e('input', {
      onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => { setSearchState(e.target.value) },
      className: 'm-auto md:w-1/2 w-5/6 h-14 p-2 border-solid border-2 text-lg text-center border-slate-600 rounded-md',
      type: 'number'
    })
  );
}

export default SearchBar;
