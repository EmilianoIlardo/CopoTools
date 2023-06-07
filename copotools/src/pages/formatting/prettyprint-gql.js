import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import  'react-toastify/dist/ReactToastify.css';
import CodeEditor from "../../components/devtools/code-editor";
import  prettier  from 'prettier/standalone'
import  parser  from 'prettier/parser-graphql';

function GqlPrettyPrinter() 
{
    const [gqlToFormat, setGqlToFormat] = useState(`
    # supports formatting schema
    type CodersToolkit{
        id:ID!
                        name: String
        }
        # and queries
        { CodersToolkit {name}}
        `);

    const formatGqlSchema = () => {
        try {
            setGqlToFormat(
            prettier.format(gqlToFormat, { plugins: [parser],parser: "graphql"})
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
        navigator.clipboard.writeText(gqlToFormat);
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
                    Pretty print Gql
                </h1>
                <h6>
                    Enter the Gql to pretty print and then click the green button
                    in order to pretty print. Also, you can copy the result to your clipboard.
                    Note that the Gql must be VALID in order to be able to pretty print it.
                </h6>
            </div>
            <div className="row">
                <div className="col-md-12">
                <CodeEditor             
                    editorId={"Gqlprettyprinter"}     
                    language={"Gql"}
                    code={gqlToFormat}
                    lineNumber={true}
                    readOnly={false}
                    clipboard={true}
                    showLanguage={false}
                    changeCode={code => {
                        setGqlToFormat(code);
                    }}></CodeEditor>
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