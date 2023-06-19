import { useState } from "react";
import Editor from "../../components/devtools/Editor";

function Settings()
{
    
    const editorThemes = ['default', 'dark', 'okaidia', 'twilight', 'coy'];
    
    
    const settingsStr = localStorage.getItem("settings");
    let settings;
    if (!settingsStr || settingsStr.length < 1 )
    {
        settings = { // set defaults
            textStorageEnabled: true,
            editorTheme: 'okaidia'
        };
        localStorage.setItem("settings", JSON.stringify(settings));
    }
    else
        settings = JSON.parse(settingsStr);

    const [textStorageEnabled, setTextStorageEnabled] = useState(settings.textStorageEnabled);
    const [editorTheme, setEditorTheme] = useState(settings.editorTheme);

    const clearAllTextStorageSavedData = () => {
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i).startsWith("editorData"))
                localStorage.removeItem(localStorage.key(i));
          }
    };

    const onTextStorageEnabledChange = () => {
        let newValue = !textStorageEnabled;
        settings.textStorageEnabled = newValue;
        localStorage.setItem("settings", JSON.stringify(settings));
        
        if (!newValue)
            clearAllTextStorageSavedData();

        setTextStorageEnabled(newValue);
    };

    const onSetTheme = (theme) => {
        settings.editorTheme = theme;
        localStorage.setItem("settings", JSON.stringify(settings));
        setEditorTheme(theme);
    };
    
    return (
        <div class="container">
            <h1>Settings</h1>
            <p>
                Configuration related to the ui/ux. This configuration is persisted in your browser so that
                next time you visit us you don't need to set-up everything from scratch.
            </p>
            <hr></hr>
            <div class="form-group mt-3">
                <h6>Local storage settings</h6>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" checked={textStorageEnabled} onChange={onTextStorageEnabledChange}></input>
                    <label class="form-check-label" for="flexSwitchCheckDefault">Enable storage of editors' text</label>
                </div>
            </div>
            <hr></hr>
            <div class="row mt-3">
                <h6>Editor theme</h6>
                <div class="col-md-6">
                    <select class="form-select" value={editorTheme} onChange={e => onSetTheme(e.target.value)}>
                        {
                            editorThemes.map((theme, index) => {
                                return (
                                <option key={theme}>
                                    {theme}
                                </option>);
                            })
                        }
                    </select>
                </div>
                <div class="col-md-12 mt-3">
                    <Editor
                        key={editorTheme}          
                        editorId={"settingspreview"}     
                        language={"javascript"}
                        code={'console.log("hello world from Coder Toolkit!");'}
                        lineNumber={true}
                        readOnly={true}
                        clipboard={false}
                        showLanguage={false}></Editor>
                </div>
            </div>

        </div>
    );
}

export default Settings;