import Prism from "prismjs";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-xml-doc";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import './Editor.css';

import { useEffect, useState } from 'react';
import React from "react";
import { getCaretPosition, setCaretPosition } from "./EditorHelpers";



var DefaultTheme = React.lazy(() => import('./EditorThemeDefault'));
var OkaidiaTheme = React.lazy(() => import('./EditorThemeOkaidia'));
var DarkTheme = React.lazy(() => import('./EditorThemeDark'));
var TwilightTheme = React.lazy(() => import('./EditorThemeTwilight'));
var CoyTheme = React.lazy(() => import('./EditorThemeCoy'));
const editorLocalStorageKeyPrefix = "editorData";

function HighlightCodeWhenAvailable()
{
    const intervalId = setInterval(() => {
        const element = document.getElementsByClassName("editor-container");
        if (element !== null && element.length && element.length > 0)
        {
            Prism.highlightAll();
            clearInterval(intervalId);
        }

    }, 10)
}

const isTextStorageEnabled = () =>
{
    let settingsStr = localStorage.getItem("settings");
    let settings = JSON.parse(settingsStr);

    return settings?.textStorageEnabled
}

function GetCode(code, version, editorId, changeCodeCallback)
{
    if (!isTextStorageEnabled() || version > 0)
        return code;

    var previouslySavedContent = localStorage.getItem(`${editorLocalStorageKeyPrefix}-${editorId}`);
    if (!!previouslySavedContent && previouslySavedContent.length > 0)
    {
        changeCodeCallback(previouslySavedContent);
        return previouslySavedContent;
    }
    return code;
}


function Editor({editorId, language, code, lineNumber, readOnly, changeCode })
{   

    const saveInStorage = (code) =>
    {
        if (isTextStorageEnabled())
            localStorage.setItem(`${editorLocalStorageKeyPrefix}-${editorId}`, code);
    }

    
    const onEditorChange = (event) =>
    {
        // re-highlight and position cursor
        var position = getCaretPosition(event.target);
        Prism.highlightAll();
        setCaretPosition(event.target, position[0]);
        
        saveInStorage(event.target.innerText);
        // execute prop handler
        changeCode && changeCode(event.target.innerText);
    }

    const getThemeFromStorage = () =>
    {
        let settingsStr = localStorage.getItem("settings");
        let settings = JSON.parse(settingsStr);

        return settings?.editorTheme || 'okaidia';
    }

    const getThemeJsx = () =>
    {
        switch (theme)
        {
            default:
            case('okaidia'):
                return <OkaidiaTheme/>
            case('dark'):
                return <DarkTheme/>;
            case('coy'):
                return <CoyTheme/>;
            case('twilight'):
                return <TwilightTheme/>;
            case('default'):
                return <DefaultTheme/>;
        }
    }

    HighlightCodeWhenAvailable();
    code.code = GetCode(code.code, code.version, editorId, changeCode);
    const [theme, setTheme] = useState(getThemeFromStorage());
    
    return(
        <React.Fragment>
            <React.Suspense fallback={'loading'}>
            {getThemeJsx()}
            <div className="editor-container">
                <pre className={lineNumber ? 'line-numbers' : 'no-line-numbers'}>
                    <code key={code.version}
                        className={`language-${language}`} 
                        contentEditable={!readOnly} 
                        onInput={(e) => { onEditorChange(e);}}>
                        {code.code ?? ' '}
                    </code>
                </pre>
            </div>
        </React.Suspense>

        </React.Fragment>

      );
}



export default Editor;