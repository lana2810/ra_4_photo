import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";
import PhotoList from "./PhotoList";

function FileSelect({ onChange }) {
  const filesRef = useRef();
  const [items, setItems] = useState([]);

  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", (evt) => {
        resolve(evt.currentTarget.result);
      });

      fileReader.addEventListener("error", (evt) => {
        reject(new Error(evt.currentTarget.error));
      });

      fileReader.readAsDataURL(file);
    });
  };

  const handleSelect = async (evt) => {
    const files = [...evt.target.files];
    const urls = await Promise.all(files.map((o) => fileToDataUrl(o)));
    urls.map((it) =>
      setItems((prevItems) => [...prevItems, { id: nanoid(), url: it }])
    );
  };

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((it) => it.id !== id));
  };

  return (
    <>
      <div className="file-select">
        <span className="overlapped">Выбрать файлы</span>
        <input
          className="input-select"
          type="file"
          multiple
          accept="image/*"
          ref={filesRef}
          onChange={handleSelect}
        ></input>
      </div>
      <PhotoList items={items} onDelete={handleDelete}></PhotoList>
    </>
  );
}

export default FileSelect;
