import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import ReactPrismEditor from "react-prism-editor";
import  'react-toastify/dist/ReactToastify.css';
import { format } from 'sql-formatter';

function SqlPrettyPrinter() 
{
    const [textToFormat, setTextToFormat] = useState('SELECT * FROM Table1 t JOIN Table2 t2 on t.Id = t2.Table1Id WHERE T.Id > 512 ORDER BY t.CreatedTimestamp DESC');
    
    const formatCss = () => {
        try {

            setTextToFormat(format(textToFormat, { language: 'mysql' }));
        }
        catch (error) {
            console.log(error);
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
        navigator.clipboard.writeText(textToFormat);
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
                <ReactPrismEditor
                    language={"sql"}
                    theme='okaidia'
                    code={textToFormat}
                    lineNumber={true}
                    readOnly={false}
                    clipboard={true}
                    showLanguage={false}
                    changeCode={code => {
                        setTextToFormat(code);
                    }}
                /> 
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