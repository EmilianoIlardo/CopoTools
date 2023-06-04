import { useEffect, useState } from "react";
import ReactPrismEditor from "react-prism-editor";

function CodeEditor({editorId, language, code, lineNumber, readOnly, clipboard, changeCode}) {


    const saveInStorage = (code) =>
    {
        if (isTextStorageEnabled())
            localStorage.setItem(`${editorLocalStorageKeyPrefix}-${editorId}`, code);
    }

    const isTextStorageEnabled = () =>
    {
        let settingsStr = localStorage.getItem("settings");
        let settings = JSON.parse(settingsStr);

        return settings?.textStorageEnabled
    }

    const getThemeFromStorage = () =>
    {
        let settingsStr = localStorage.getItem("settings");
        let settings = JSON.parse(settingsStr);

        return settings?.editorTheme || 'okaidia';
    }

    const editorLocalStorageKeyPrefix = "editorData";
    const [theme, setTheme] = useState(getThemeFromStorage());

    useEffect(() =>{

        if (!isTextStorageEnabled())
            return;
            
        var previouslySavedContent = localStorage.getItem(`${editorLocalStorageKeyPrefix}-${editorId}`);
        if (!!previouslySavedContent && previouslySavedContent.length > 0)
        {
            changeCode(previouslySavedContent);
        }
    }, []);

return (                
<ReactPrismEditor
    language={language}
    theme={theme}
    code={code}
    lineNumber={lineNumber}
    readOnly={readOnly}
    clipboard={clipboard}
    showLanguage={false}
    changeCode={code => {
        saveInStorage(code);
        changeCode(code);
    }}></ReactPrismEditor>)


}

export default CodeEditor;