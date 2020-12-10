import React from 'react';

import './Styles.scss';

const ProgressBar = ({current, total}) => {

 const calcWidth = (current, total) => {
     if(!current || !total) return '100%'
     return (current) / (total) * 100 + "%";
 }   

  return(
    <div className="progressBar">
      <div className="progressBar--fill" style={{width: calcWidth(current, total)}} />
      <div className="progressBar--background"></div>
    </div>
  )
}

export default ProgressBar; 