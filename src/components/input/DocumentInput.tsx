import React, { useEffect } from "react";

const DocumentInput = (props: any) => {
    const { input, meta } = props;
    useEffect(() => {
        const dropArea = document.getElementById('dropArea')!;
        window.addEventListener('drop', (e) => {e.preventDefault()});
        window.addEventListener('dragOver', (e) => {e.preventDefault()});
        dropArea.addEventListener('drop', (e) => {console.log('dropped'); e.preventDefault()});
        dropArea.addEventListener('dragOver', (e) => {console.log('dropped'); e.preventDefault()});
        dropArea.addEventListener('click', (e) => {console.log('clicked'); e.preventDefault()});
        return dropArea.removeEventListener('drop', input.onChange);
    })
    return(
        <div id={'dropArea'} style={{borderWidth: 2,borderColor: '#4CAF50' ,borderRadius: 10, backgroundColor: "white", borderStyle: 'dashed'}}>
            <input
                type={'file'}
                name={input.name}
                onChange={input.onChange}
                onFocus={input.onFocus}
                onBlur={input.onBlur}
                multiple
            />
        </div>
    )
};

export default DocumentInput;