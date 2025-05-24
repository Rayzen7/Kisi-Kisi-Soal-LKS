import React from "react";

const Button = ({ onClick, color = '', icon = '', paddingValue = 6, width = 30, height = 30 }) => {
  return (
    <button 
        style={{padding: `${paddingValue}px`}}
        onClick={onClick} 
        className={`rounded-md cursor-pointer 
          ${color === 'green' ? 'bg-green-600 hover:bg-green-700' : 
          color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 
          'bg-red-600 hover:bg-red-700'} `}>
        <span className='fill-white'>
            {
                icon == 'add' ? <svg xmlns="http://www.w3.org/2000/svg" style={{width: `${width}px`, height: `${height}px`}} viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/></svg> :
                icon == 'edit' ? <svg xmlns="http://www.w3.org/2000/svg" style={{width: `${width}px`, height: `${height}px`}} viewBox="0 0 24 24"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"/></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" style={{width: `${width}px`, height: `${height}px`}} viewBox="0 0 24 24"><path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-4 9H8v-2h8v2z"/></svg>
            }
        </span>
    </button>
  )
}

export default Button;