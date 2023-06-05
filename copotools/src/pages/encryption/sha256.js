import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import CodeEditor from "../../components/devtools/code-editor";
import  'react-toastify/dist/ReactToastify.css'
import * as CryptoJs from 'crypto-js'

function Sha256EncoderComponent() 
{
    const [textToTransform, setTextToTransform] = useState('SHA-256 encoding made easy');
    
    const encode = () => {
        try {
            var hash = CryptoJs.SHA256(textToTransform);
            setTextToTransform(hash.toString(CryptoJs.enc.Hex))
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
            <div className="row">
                <h1>
                    SHA-256 encoder
                </h1>
                <h6>
                    Enter the text to be Encoded in SHA-256.
                </h6>
                </div>
            <div className="row">
                <div className="col-md-12">
                <CodeEditor
                    editorId={'sha256Encoder'}          
                    code={textToTransform}
                    lineNumber={true}
                    readOnly={false}
                    clipboard={true}
                    showLanguage={false}
                    changeCode={code => {
                        setTextToTransform(code);
                    }}></CodeEditor>
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

export default Sha256EncoderComponent;