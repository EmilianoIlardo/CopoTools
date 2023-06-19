import React, { useRef, useState  } from "react";
import  { ToastContainer, toast } from "react-toastify";
import  'react-toastify/dist/ReactToastify.css';
import Editor from "../../components/devtools/Editor";

var currentCode = '{"help": "format your ugly json"}';
function JsonPrettyPrinter() 
{
    const [initialCode, setInitialCode] = useState(currentCode);

    const formatJson = () => {
        try {
            console.log(initialCode);
            var objResult = JSON.parse(currentCode);
            currentCode = JSON.stringify(objResult, null, '\t');
            setInitialCode(currentCode);
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
    }

    const copyJson = () => {
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
    }
    return (
        <div className='container'>
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
                <Editor             
                    editorId={"jsonprettyprinter"}     
                    language={"json"}
                    code={initialCode}
                    lineNumber={true}
                    readOnly={false}
                    changeCode={code => {
                        currentCode = code;
                    }}></Editor>
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