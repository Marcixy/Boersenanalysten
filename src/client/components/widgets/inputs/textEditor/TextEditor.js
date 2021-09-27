import React, { useEffect } from 'react';

// material-ui icon imports
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

import './TextEditor.css';

function TextEditor({ editorText = "", isMenuebarVisible = true, title = "", contentError, contentErrorText, parentCallbackEditorContent }) {

    useEffect(() => {
        document.getElementById('editor-content-id').innerHTML = editorText;
        const editorButtons = document.getElementById("editor-buttons");
        if (isMenuebarVisible === true) {
            editorButtons.style.display = "block";
        } else {
            editorButtons.style.display = "none";
        }
    }, [editorText, isMenuebarVisible])

    const setEditorContent = () => {
        console.log(document.getElementById('editor-content-id').innerHTML);
        parentCallbackEditorContent(document.getElementById('editor-content-id').innerHTML);
    }

    // Setzt die Eigenschaft die übergeben wird
    // Beispiel: bold = fetter Text (<b></b>)
    const editorButtonHandler = (property) => {
        document.execCommand(property, false);
    }

    return (
        <div className="text-editor">
            <div className="editor-menuebar" >
                <h3>{title}</h3>
                <div id="editor-buttons">
                    <button id="editor-button" className="editor-button" onClick={() => editorButtonHandler('bold')}><FormatBoldIcon /></button>
                    <button id="editor-button" className="editor-button" onClick={() => editorButtonHandler('italic')}><FormatItalicIcon /></button>
                    <button id="editor-button" className="editor-button" onClick={() => editorButtonHandler('underline')}><FormatUnderlinedIcon /></button>
                    <button id="editor-button" className="editor-button" onClick={() => editorButtonHandler('insertUnorderedList')}><FormatListBulletedIcon /></button>
                    <button id="editor-button" className="editor-button" onClick={() => editorButtonHandler('insertOrderedList')}><FormatListNumberedIcon /></button>
                    <button id="editor-button" className="editor-button" onClick={() => editorButtonHandler('insertImage')}><ImageSearchIcon /></button>
                </div>
                <div className="editor-content"
                    id="editor-content-id"
                    contentEditable="true"
                    spellCheck="false"
                    onKeyUp={() => setEditorContent()}
                    style={{ border: contentError === true ? '1px solid #f44336' : '1px solid black' }}>
                </div>
                <p>{ contentErrorText }</p>
            </div>
        </div>
    )
}

export default TextEditor;