import React from "react";

export default function Emoji(props){
  return(
    <span aria-label={props.label}>{props.emoji}</span>
  )
}