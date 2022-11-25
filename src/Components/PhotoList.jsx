import React from "react";

function PhotoList({ items, onDelete }) {
  return (
    <div className="foto-block">
      {items.map((it) => (
        <div key={it.id} className="image-block">
          <img className="image" src={it.url} alt=""></img>
          <i className="icon" onClick={() => onDelete(it.id)}>
            {String.fromCodePoint(10006)}
          </i>
        </div>
      ))}
    </div>
  );
}

export default PhotoList;
