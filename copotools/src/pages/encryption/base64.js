import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import ReactPrismEditor from "react-prism-editor";
import  'react-toastify/dist/ReactToastify.css'

function Base64EncoderDecoder() 
{
    const [textToTransform, setTextToTransform] = useState('Base64 encoding made easy');
    
    const encode = () => {
        try {
            var encoded = btoa(textToTransform);
            setTextToTransform(encoded);
        } catch {
            toast.error('Can\'t encode. Input might contain invalid characters.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    };

    const decode = () => {
        try {
            var decoded = atob(textToTransform);
            setTextToTransform(decoded);
        } catch {
            toast.error('Can\'t decode. Input might contain invalid characters.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    };
    
    const copy = () => {
        navigator.clipboard.writeText(textToTransform);
        toast.info('Copied to clipboard succesfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    };

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
                    Base64 Encode/Decode
                </h1>
                <h6>
                    Enter the text to be Encoded or Decoded in base 64.
                </h6>
                </div>
            <div className="row">
                <div className="col-md-12">
                    <ReactPrismEditor
                        theme='okaidia'
                        code={textToTransform}
                        lineNumber={true}
                        readOnly={false}
                        clipboard={true}
                        showLanguage={false}
                        changeCode={code => {
                            setTextToTransform(code);
                        }}
                    /> 
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <button className="button button--publish" onClick={encode}>
                        <i class="bi bi-file-earmark-binary-fill"></i>
                            Encode
                    </button>
                    <button className="button button--publish" onClick={decode}>
                        <i class="bi bi-file-earmark-binary"></i>
                            Decode
                    </button>
                    <button className="button button--save" onClick={copy}>
                        <i class="bi bi-clipboard"></i>
                            Copy to clipboard
                    </button>
                </div>
            </div>
        </div>
        );
}

export default Base64EncoderDecoder;