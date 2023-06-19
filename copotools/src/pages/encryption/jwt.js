import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import Editor from "../../components/devtools/Editor";
import jwt_decode from "jwt-decode";
import  'react-toastify/dist/ReactToastify.css'

function JwtDecoder() 
{
    const [jwtToParse, setJwtToParse] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUaGVzZSB0b29scyBhcmUgdGhlIGJlc3QiLCJuYW1lIjoiRW1pbGlhbm8gSWxhcmRvIiwiaWF0IjoxNTE2MjM5MDIyfQ.RCCgR-H7GNWM0sLGNjobv8wIriITSabedPJSiI46PM0');
    const [decodedJwt, setDecodedJwt] = useState(" ");
    const [decodedHeader, setDecodedHeader] = useState(" ");

    const decode = () => {
        try {
            setDecodedJwt(JSON.stringify(jwt_decode(jwtToParse), null, '\t'));
            setDecodedHeader(JSON.stringify(jwt_decode(jwtToParse, { header: true }), null, '\t'));
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
    
    const copy = (content) => {
        navigator.clipboard.writeText(content);
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
                    JWT decoder
                </h1>
                <h6>
                    Enter the JWT to be decoded
                </h6>
                </div>
            <div className="row">
                <div className="col-md-12">
                <Editor
                    editorId={'jwtdecoder'}          
                    code={jwtToParse}
                    lineNumber={true}
                    readOnly={false}
                    clipboard={true}
                    showLanguage={false}
                    changeCode={code => {
                        setJwtToParse(code);
                    }}></Editor>

                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <button className="button button--publish" onClick={decode}>
                        <i class="bi bi-file-earmark-binary"></i>
                            Decode JWT
                    </button>
                    <button className="button button--save" onClick={() => copy(jwtToParse)}>
                        <i class="bi bi-clipboard"></i>
                            Copy JWT to clipboard
                    </button>
                    <button className="button button--save" onClick={() => copy(decodedHeader)}>
                        <i class="bi bi-clipboard"></i>
                            Copy Header to clipboard
                    </button>
                    <button className="button button--save" onClick={() => copy(decodedJwt)}>
                        <i class="bi bi-clipboard"></i>
                            Copy Payload to clipboard
                    </button>
                </div>
            </div>
            <hr></hr>
            <div className="row mt-3">
                <div className="col-md-12">
                    <h2>Header</h2>
                    <Editor
                        editorId={'jwtdecoderheader'}          
                        language={"json"}
                        theme='okaidia'
                        code={decodedHeader}
                        lineNumber={true}
                        readOnly={true}
                        clipboard={true}
                        showLanguage={false}></Editor>                 
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <h2>Payload</h2>
                    <Editor
                        editorId={'jwtdecoderpayload'}          
                        language={"json"}
                        theme='okaidia'
                        code={decodedJwt}
                        lineNumber={true}
                        readOnly={true}
                        clipboard={true}
                        showLanguage={false}></Editor>
                </div>
            </div>
        </div>
        );
}

export default JwtDecoder;