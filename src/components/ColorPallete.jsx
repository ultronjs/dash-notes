import React from 'react'

function ColorPallete({setNote }) {
  const colorPallete = [
    { name: "Yellow", color_class: "bg_yellow", hexCode: "FFE66E" },
    { name: "Green", color_class: "bg_green", hexCode: "A1EF9B" },
    { name: "Mauve", color_class: "bg_mauve", hexCode: "D7AFFF" },
    { name: "Pink", color_class: "bg_pink", hexCode: "FFAFDF" },
    { name: "Blue", color_class: "bg_blue", hexCode: "9EDFFF" },
    { name: "Gray", color_class: "bg_gray", hexCode: "D1D1D1" },
    { name: "Silver", color_class: "bg_silver", hexCode: "767676" },
  ];
  const setColorOfTheNote = (color_class) => {
    setNote(prevState =>({...prevState,color:color_class}))

  };
  return (
    <div className="color_pallete_container">
      {colorPallete.map((element) => (
        <div
          className={`color_pallete_element ${element.color_class}`}
          onClick={() => setColorOfTheNote(element.color_class)}
        ></div>
      ))}
    </div>
  );
}

export default ColorPallete