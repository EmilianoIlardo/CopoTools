import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import Editor from "../../components/devtools/Editor";
import  'react-toastify/dist/ReactToastify.css'

let currentCode = 'Base64 encoding made easy';
function Base64EncoderDecoder() 
{
    const [textToTransform, setTextToTransform] = useState({ code: currentCode, version: 0});
    
    const encode = () => {
        try {
            var encoded = btoa(currentCode);
            currentCode = encoded;
            setTextToTransform({code: encoded, version: textToTransform.version+1});
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
            var decoded = atob(currentCode);
            currentCode = decoded;
            setTextToTransform({code: decoded, version: textToTransform.version+1});
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
        navigator.clipboard.writeText(currentCode);
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
                <Editor
                    editorId={'base64decoder'}          
                    code={textToTransform}
                    lineNumber={true}
                    readOnly={false}
                    clipboard={true}
                    showLanguage={false}
                    changeCode={code => {
                        currentCode = code;
                    }}></Editor>
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