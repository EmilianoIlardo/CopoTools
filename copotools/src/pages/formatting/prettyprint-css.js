import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import Editor from "../../components/devtools/Editor";
import  'react-toastify/dist/ReactToastify.css';
import { format } from 'sql-formatter';

let currentCode = 'SELECT * FROM Table1 t JOIN Table2 t2 on t.Id = t2.Table1Id WHERE T.Id > 512 ORDER BY t.CreatedTimestamp DESC';
function SqlPrettyPrinter() 
{
    const [initialCode, setInitialCode] = useState({code: currentCode, version: 0});
    
    const formatCss = () => {
        try {
            currentCode = format(currentCode, { language: 'sql' });
            setInitialCode({code: currentCode, version: initialCode.version+1});
        }
        catch (error) {
            toast.error('Invalid SQL!', {
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

    const copyCss = () => {
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
                    Pretty print SQL
                </h1>
                <h6>
                    Enter the SQL text to pretty print and then click the green button
                    in order to pretty print. Also, you can copy the result to your clipboard.
                    Note that the SQL must be VALID in order to be able to pretty print it.
                </h6>
                </div>
            <div className="row">
                <div className="col-md-12">
                <Editor
                    editorId={'sqlprettyprinter'}          
                    language={"sql"}
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
                    <button className="button button--publish" onClick={formatCss}>
                        <i class="bi bi-filetype-json"></i>
                            Pretty print
                    </button>
                    <button className="button button--save" onClick={copyCss}>
                        <i class="bi bi-clipboard"></i>
                            Copy to clipboard
                    </button>
                </div>
            </div>
        </div>
        )
}

export default SqlPrettyPrinter;