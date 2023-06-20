import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import  'react-toastify/dist/ReactToastify.css';
import Editor from "../../components/devtools/Editor";
import  prettier  from 'prettier/standalone'
import  parser  from 'prettier/parser-graphql';

let currentCode = `
# supports formatting schema
type CodersToolkit{
    id:ID!
                    name: String
    }
    # and queries
    { CodersToolkit {name}}
    `;
function GqlPrettyPrinter() 
{
    const [initialCode, setInitialCode] = useState({code: currentCode, version: 0});

    const formatGqlSchema = () => {
        try {
            currentCode = prettier.format(currentCode, { plugins: [parser],parser: "graphql"});
            setInitialCode(
                {code: currentCode, version: initialCode.version+1}
            );
        }
        catch {
            toast.error('Invalid Gql Schema!', {
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

    const copyGqlSchema = () => {
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
        <div className='row'>
            <div className="row">
                <h1>
                    Pretty print GraphQl
                </h1>
                <h6>
                    Enter the GraphQl to pretty print and then click the green button
                    in order to pretty print. Also, you can copy the result to your clipboard.
                    Note that the GraphQl must be VALID in order to be able to pretty print it.
                </h6>
            </div>
            <div className="row">
                <div className="col-md-12">
                <Editor             
                    editorId={"Gqlprettyprinter"}     
                    language={"graphql"}
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
                    <button className="button button--publish" onClick={formatGqlSchema}>
                        <i class="bi bi-filetype-Gql"></i>
                            Pretty print
                    </button>
                    <button className="button button--save" onClick={copyGqlSchema}>
                        <i class="bi bi-clipboard"></i>
                            Copy to clipboard
                    </button>
                </div>
            </div>
        </div>
        )
}

export default GqlPrettyPrinter;