import { useState } from "react";
import CodeEditor from "../../components/devtools/code-editor";
import  { ToastContainer, toast } from "react-toastify";

function ImageToBase64Component() {

    const [result, setResult] = useState(" ");
    const handleChange = (e) => {

        setResult("loading...");
        // get the files
        let files = e.target.files;
    
        // Process each file
        var allFiles = [];
        for (var i = 0; i < files.length; i++) {
    
          let file = files[i];
    
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {

            setResult(`<img src="${reader.result}"></img>`);
    
          } // reader.onload
    
        } // for
    
      }

      const copyToClipboard = () => {
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
      }

    return (
            <div class="row">
                <h1>
                    Image to Base64 converter
                </h1>
                <h6>
                    Select a local file and convert it into its base64 representation.
                </h6>
                <div class="mt-3">
                    <label htmlFor={"formFile"} class="form-label">Upload your file</label>
                    <input class="form-control" type="file" id="formFile"                     
                    onChange={ handleChange.bind(this) }
                    multiple={ false } 
                    accept="image/*"/>
                </div>
                <hr></hr>
                <div class="mt-3">
                    <h6>
                        Use the following HTML to embed your image using Base64 as a source
                    </h6>
                    <CodeEditor         
                        editorId={"base64image"}     
                        language={"html"}
                        code={result}
                        lineNumber={true}
                        readOnly={true}
                        clipboard={true}
                        showLanguage={false}></CodeEditor>
                </div> 
                <div className="row mt-3">
                    <div className="col-md-12">
                        <button className="button button--publish" onClick={copyToClipboard}>
                            <i class="bi bi-filetype-json"></i>
                                Copy result to clipboard
                        </button>
                    </div>
                </div>

            </div>
    )
};

export default ImageToBase64Component;