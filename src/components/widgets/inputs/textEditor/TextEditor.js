import React, { useState } from 'react';

// material-ui icon imports
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

import './TextEditor.css';

function TextEditor() {
    const [editorContent, setEditorContent] = useState("");

    // Setzt die Eigenschaft die übergeben wird
    // Beispiel: bold = fetter Text (<b></b>)
    const editorButtonHandler = (property) => {
        document.execCommand(property, false);
    }

    return (
        <div className="text-editor">
            <div className="editor-menuebar">
                <button className="editor-button" onClick={() => editorButtonHandler('bold')}><FormatBoldIcon /></button>
                <button className="editor-button" onClick={() => editorButtonHandler('italic')}><FormatItalicIcon /></button>
                <button className="editor-button" onClick={() => editorButtonHandler('underline')}><FormatUnderlinedIcon /></button>
                <button className="editor-button" onClick={() => editorButtonHandler('insertUnorderedList')}><FormatListBulletedIcon /></button>
                <button className="editor-button" onClick={() => editorButtonHandler('insertOrderedList')}><FormatListNumberedIcon /></button>
                <button className="editor-button" onClick={() => editorButtonHandler('insertImage')}><ImageSearchIcon /></button>
                <div className="editor-content"
                    id="editor-content"
                    contentEditable="true"
                    onKeyUp={() => setEditorContent()}>
                </div>
            </div>
        </div>
    )
}

export default TextEditor;