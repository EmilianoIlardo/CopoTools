import React, { useEffect, useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import CodeEditor from "../../components/devtools/code-editor";
import  'react-toastify/dist/ReactToastify.css';
import cronstrue from 'cronstrue';

function CronParser() 
{
    const parse = () => {
        try {
            setResult(cronstrue.toString(textToParse));
        } catch (error){
            toast.error('Can\'t parse cron expression.', {
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
    
    const copyExpression = () => {
        navigator.clipboard.writeText(textToParse);
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

    const copyResult = () => {
        navigator.clipboard.writeText(result);
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

    const [textToParse, setTextToParse] = useState('0 10 ? * MON-FRI');
    const [result, setResult] = useState('At 10:00 AM, Monday through Friday');

    return (
        <div className='container'>
            <div className="row">
                <h1>
                    Cron Expressions Parser
                </h1>
                <h6>
                    Enter the cron expression to be parsed
                </h6>
                </div>
            <div className="row">
                <div className="col-md-12">
                <CodeEditor             
                    editorId={"cronparser"}     
                    code={textToParse}
                    lineNumber={true}
                    readOnly={false}
                    clipboard={true}
                    showLanguage={false}
                    changeCode={code => {
                        setTextToParse(code);
                    }}></CodeEditor>
                </div>
            </div>
            <div className="row mt-3">
                <h6 className="col-md-12">
                    {result}
                </h6>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <button className="button button--publish" onClick={parse}>
                        <i class="bi bi-file-earmark-binary-fill"></i>
                            Parse
                    </button>
                    <button className="button button--save" onClick={copyExpression}>
                        <i class="bi bi-clipboard"></i>
                            Copy expression to clipboard
                    </button>
                    <button className="button button--save" onClick={copyResult}>
                        <i class="bi bi-clipboard"></i>
                            Copy result to clipboard
                    </button>
                    
                </div>
            </div>

        </div>
        );
}

export default CronParser;