import { LoremIpsum, loremIpsum } from "lorem-ipsum";
import React, { useEffect, useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import CodeEditor from "../../components/devtools/code-editor";
import  'react-toastify/dist/ReactToastify.css';

function LoremIpsumGenerator() {
    const [generatedLoremImpsum, setGeneratedLoremIpsum] = useState(" ");
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4
        },
        wordsPerSentence: {
          max: 16,
          min: 4
        }
      });
    
    const addOneParagraph = () => {
        let newLoremIpsum = generatedLoremImpsum.trim().length < 1 
            ? lorem.generateParagraphs(1)
            : `${generatedLoremImpsum}\n${lorem.generateParagraphs(1)}`;

        setGeneratedLoremIpsum(newLoremIpsum);
    };

    const clear = () => {
        setGeneratedLoremIpsum(" ");
    };

    const copyResult = () => {
        navigator.clipboard.writeText(generatedLoremImpsum);
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
        <div class="row">
            <div className="row">
                <h1>
                    Lorem Ipsum generator
                </h1>
            </div>
            <div className="row">
                <div className="col-md-12">
                <CodeEditor             
                    editorId={"loremipsum"}     
                    language={"text"}
                    code={generatedLoremImpsum}
                    lineNumber={true}
                    readOnly={true}
                    clipboard={true}
                    showLanguage={false}></CodeEditor>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <button className="button button--publish" onClick={addOneParagraph}>
                        <i class="bi bi-filetype-json"></i>
                            Add one paragraph
                    </button>
                    <button className="button button--publish" onClick={clear}>
                        <i class="bi bi-filetype-json"></i>
                            Clear
                    </button>
                    <button className="button button--save" onClick={copyResult}>
                        <i class="bi bi-clipboard"></i>
                            Copy to clipboard
                    </button>
                </div>
            </div>
        </div>
            
        )
}

export default LoremIpsumGenerator;