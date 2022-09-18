import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import  'react-toastify/dist/ReactToastify.css'

function JsonPrettyPrinter() 
{
    const [textToFormat, setTextToFormat] = useState('{"help": "format your ugly json"}')

    const formatJson = () => {
        try {
            var objResult = JSON.parse(textToFormat);
        }
        catch {
            toast.error('Invalid JSON!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }

        setTextToFormat(JSON.stringify(objResult, null, '\t'));
    }

    const copyJson = () => {
        navigator.clipboard.writeText(textToFormat);
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
                    Pretty print JSON
                </h1>
                <h6>
                    Enter the JSON text to pretty print and then click the green button
                    in order to pretty print. Also, you can copy the result to your clipboard.
                    Note that the JSON must be VALID in order to be able to pretty print it.
                </h6>
                </div>
            <div className="row">
                <div className="col-md-12">
                    <textarea 
                        type="textarea" 
                        className="form-control"
                        rows="5"
                        onChange={(e) => setTextToFormat(e.target.value)}
                        value={textToFormat}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <button className="button button--publish" onClick={formatJson}>
                        <i class="bi bi-filetype-json"></i>
                            Pretty print
                    </button>
                    <button className="button button--save" onClick={copyJson}>
                        <i class="bi bi-clipboard"></i>
                            Copy to clipboard
                    </button>
                </div>
            </div>
        </div>
        )
}

export default JsonPrettyPrinter;