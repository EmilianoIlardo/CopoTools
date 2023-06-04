import React, { useState } from "react";
import  { ToastContainer, toast } from "react-toastify";
import ReactPrismEditor from "react-prism-editor";
import  'react-toastify/dist/ReactToastify.css'

function XmlPrettyPrinter() 
{
    const [textToFormat, setTextToFormat] = useState('<node><helpNode>pretty print your ugly xml</helpNode></node>')

    const formatXml = () => {
        try {
            var xmlDoc = new DOMParser().parseFromString(textToFormat, 'application/xml');
            var xsltDoc = new DOMParser().parseFromString([
                // describes how we want to modify the XML - indent everything
                '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                '  <xsl:strip-space elements="*"/>',
                '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
                '    <xsl:value-of select="normalize-space(.)"/>',
                '  </xsl:template>',
                '  <xsl:template match="node()|@*">',
                '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
                '  </xsl:template>',
                '  <xsl:output indent="yes"/>',
                '</xsl:stylesheet>',
            ].join('\n'), 'application/xml');
        
            var xsltProcessor = new XSLTProcessor();    
            xsltProcessor.importStylesheet(xsltDoc);
            var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
            if (isParseError(resultDoc))
                throw new Error();

            var resultXml = new XMLSerializer().serializeToString(resultDoc);
            setTextToFormat(resultXml);
        }
        catch {
            toast.error('Invalid XML!', {
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

    function isParseError(parsedDocument) {
        // parser and parsererrorNS could be cached on startup for efficiency
        var parser = new DOMParser(),
            errorneousParse = parser.parseFromString('<', 'application/xml'),
            parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;
    
        if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
            // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
            return parsedDocument.getElementsByTagName("parsererror").length > 0;
        }
    
        return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
    };

    const copyXml = () => {
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
                    Pretty print XML
                </h1>
                <h6>
                    Enter the XML text to pretty print and then click the green button
                    in order to pretty print. Also, you can copy the result to your clipboard.
                    Note that the XML must be VALID in order to be able to pretty print it.
                </h6>
                </div>
            <div className="row">
                <div className="col-md-12">
                    <ReactPrismEditor
                        language={"xml"}
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
                    <button className="button button--publish" onClick={formatXml}>
                        <i class="bi bi-filetype-xml"></i>
                            Pretty print
                    </button>
                    <button className="button button--save" onClick={copyXml}>
                        <i class="bi bi-clipboard"></i>
                            Copy to clipboard
                    </button>
                </div>
            </div>
        </div>
        )
}

export default XmlPrettyPrinter;