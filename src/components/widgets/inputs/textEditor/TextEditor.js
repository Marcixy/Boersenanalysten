import React, { useState } from 'react';

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
                <button className="editor-button" onClick={() => editorButtonHandler('bold')}>Fett</button>
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