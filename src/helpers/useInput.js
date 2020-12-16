import { useState } from 'react';

// TODO make this useInputProps()

// use Input auto capitalizes first char
export default function useInput(defaultInputStr = "", handleChange) {
  const [inputStr, setInputStr] = useState(defaultInputStr)

  function handleChangeDefault(event) {
    const str = firstCharUppercase(event.target.value);
    setInputStr(str);
    
    //run custom handleChange
    if (handleChange) handleChange(event)
  }

  const inputProps = { value: inputStr, onChange: handleChangeDefault }
  return [inputProps, inputStr, setInputStr];
}

function firstCharUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}