import base, { hex } from 'dpm-base';
import { useState } from 'react';
import  { ToastContainer, toast } from "react-toastify";


function NumberConverterComponent()
{
    let startingNumberDec = 10;

    const [decNumber, setDecNumber] = useState(startingNumberDec);
    const [binNumber, setBinNumber] = useState(startingNumberDec);
    const [hexNumber, setHexNumber] = useState(startingNumberDec);
    const [octNumber, setOctNumber] = useState(startingNumberDec);

    const changeDec = (decNumber) => {
        if (!base.decimal.isValid(decNumber)) {
            throwError('Not a decimal number');
            return;
        }

        setDecNumber(decNumber);
        setBinNumber(base.decimal.toBin(decNumber));
        setHexNumber(base.decimal.toHex(decNumber));
        setOctNumber(base.decimal.toOct(decNumber));
    }

    const changeBin = (binNumber) => {
        if (!base.binary.isValid(binNumber)) {
            throwError('Not a binary number');
            return;
        }
        
        setBinNumber(binNumber);
        setDecNumber(base.binary.toDec(binNumber));
        setHexNumber(base.binary.toHex(binNumber));
        setOctNumber(base.binary.toOct(binNumber));
    }

    const changeHex = (hexNumber) => {
        if (!base.hex.isValid(hexNumber)) {
            throwError('Not an hex number');
            return;
        }
        
        setHexNumber(hexNumber);
        setBinNumber(base.hex.toBin(hexNumber));
        setDecNumber(base.hex.toDec(hexNumber));
        setOctNumber(base.hex.toOct(hexNumber));
    }

    const changeOct = (octNumber) => {
        if (!base.octal.isValid(octNumber)) {
            throwError('Not an oct number');
            return;
        }
        
        setOctNumber(octNumber);
        setHexNumber(base.octal.toHex(octNumber));
        setBinNumber(base.octal.toBin(octNumber));
        setDecNumber(base.octal.toDec(octNumber));
 
    }

    const throwError = (error) => {
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    return (
        <div className='container'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            <div className="row">
                <h1>
                    Number converters
                </h1>
                <h6>
                    Enter a number in either decimal, binary, hexadecimal, or octal and find its representation
                    in the other 3 systems.
                </h6>
            </div>
            <div className="row mt-3">
                <div className="col-lg-6">
                    <div className="input-group">
                        <span class="input-group-text">DEC</span>
                        <input
                        type="text"
                        value={decNumber}
                        onChange={(e) => changeDec(e.target.value)}
                        className="form-control"
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="input-group">
                        <span class="input-group-text">BIN</span>
                        <input
                        type="text"
                        value={binNumber}
                        onChange={(e) => changeBin(e.target.value)}
                        className="form-control"
                        />
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div className="col-lg-6">
                    <div className="input-group">
                        <span class="input-group-text">HEX</span>
                        <input
                        type="text"
                        value={hexNumber}
                        onChange={(e) => changeHex(e.target.value)}
                        className="form-control"
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="input-group">
                        <span class="input-group-text">OCT</span>
                        <input
                        type="text"
                        value={octNumber}
                        onChange={(e) => changeOct(e.target.value)}
                        className="form-control"
                        />
                    </div>
                </div>
            </div>
        </div>)
}

export default NumberConverterComponent;