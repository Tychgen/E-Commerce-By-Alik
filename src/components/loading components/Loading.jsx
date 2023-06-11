import React from 'react';
import './styles/loading-p.scss'

const Loading = () => {
  return (
    <div class="loading">
    <div class="logo"></div>
    <div class="dots animate">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
  )
}

export default Loading
