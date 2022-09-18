import { HexColorPicker } from "react-colorful";
import React, { useState } from "react";

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function ColorToHex(color) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function ConvertRGBtoHex(red, green, blue) {
  return ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}

const ColorPicker = () => {
  const [color, setColor] = useState("#000000");
  const [hexColorInput, setHexColor] = useState("000000");
  const [rInput, setRInput] = useState(0);
  const [gInput, setGInput] = useState(0);
  const [bInput, setBInput] = useState(0);
  
  const changeHex = (hexValue) => {
    setHexColor(hexValue);
    let reg=/^([0-9a-f]{3}){1,2}$/i;
    if(!reg.test(hexValue)) // not a valid value
      return;
    
    setColor(`#${hexValue}`);
    let rgb = hexToRgb(`#${hexValue}`);
    setRInput(rgb.r);
    setGInput(rgb.g);
    setBInput(rgb.b);
  }

  const changeRedRgb = (value) => {
    setRInput(value);

    if (!(value >= 0 && value <= 255))
      return;

    var hexString = ConvertRGBtoHex(+value, +gInput, +bInput);
    changeHex(hexString);
  }
  const changeBlueRgb = (value) => {
    setBInput(value);

    if (!(value >= 0 && value <= 255))
      return;

      var hexString = ConvertRGBtoHex(+rInput, +gInput, +value);
    changeHex(hexString);;
  }
  const changeGreenRgb = (value) => {
    setGInput(value);

    if (!(value >= 0 && value <= 255))
      return;

    var hexString = ConvertRGBtoHex(+rInput, +value, +bInput);
    changeHex(hexString);
  }

  const onPickerChange = (hexString) =>
  {
    setColor(hexString);
    let hexWithoutHash = hexString.substring(1);
    setHexColor(hexWithoutHash); //remove hash
    let rgb = hexToRgb(hexString);
    setRInput(rgb.r);
    setGInput(rgb.g);
    setBInput(rgb.b);
  }
  
  return (
    <React.Fragment>

    <div className="row">
      <h1>
        Color picker and converter
      </h1>
      <h6>
      Pick a color you like from the color picker 
        and get its correspondent RGB and Hex
          values, or fill either the RGB or Hex 
          fields in order to get its conversion
      </h6>
    </div>
    <div className="row">
      <div className="col-lg-5">
        <h1 className="display-6">Mix</h1>
        <HexColorPicker color={color} onChange={onPickerChange} />
      </div>
      <div className="col-lg-1">
        <h1 className="display-6">
          <i class="bi bi-droplet-fill" style={{ color: color }}></i>
        </h1>        
      </div>
      <div className="col-lg-3">
          <h1 className="display-6">Hex</h1>
          <div className="input-group">
            <span class="input-group-text">#</span>
            <input
              type="text"
              value={hexColorInput}
              onChange={(e) => changeHex(e.target.value)}
              className="form-control"
            />
         </div>
      </div>
      <div className="col-lg-3">
          <h1 className="display-6">Rgb</h1>
          <div>
          <div class="input-group">
            <span class="input-group-text">R</span>
            <input
              type="number"
              min="0" max="255"
              value={rInput}
              onChange={(e) => changeRedRgb(e.target.value)}
              className="form-control"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text">G</span>
            <input
              type="number"
              min="0" max="255"
              value={gInput}
              onChange={(e) => changeGreenRgb(e.target.value)}
              className="form-control"
            />
            </div>
            <div class="input-group">
            <span class="input-group-text">B</span>
            <input
              type="number"
              min="0" max="255"
              value={bInput}
              onChange={(e) => changeBlueRgb(e.target.value)}
              className="form-control"
            />
            </div>
         </div>         
      </div>

    </div>

    </React.Fragment>
  );
};

export default ColorPicker;