import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import Editor from "../../components/devtools/Editor";
import  'react-toastify/dist/ReactToastify.css'
import * as CryptoJs from 'crypto-js'

let currentCode = 'SHA-512 encoding made easy';
function Sha512EncoderComponent() 
{
    const [initialCode, setInitialCode] = useState({code: currentCode, version: 0});
    
    const encode = () => {
        try {
            var hash = CryptoJs.SHA512(currentCode);
            currentCode = hash.toString(CryptoJs.enc.Hex);
            setInitialCode({code: currentCode, version: initialCode.version+1});
        } catch(error) {
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
        <div className='row'>
            <div className="row">
                <h1>
                    SHA-512 encoder
                </h1>
                <h6>
                    Enter the text to be Encoded in SHA-512.
                </h6>
                </div>
            <div className="row">
                <div className="col-md-12">
                <Editor
                    editorId={'sha512Encoder'}          
                    code={initialCode}
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
                    <button className="button button--save" onClick={copy}>
                        <i class="bi bi-clipboard"></i>
                            Copy to clipboard
                    </button>
                </div>
            </div>
        </div>
        );
}

export default Sha512EncoderComponent;