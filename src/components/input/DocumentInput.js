"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DocumentInput = function (props) {
    var input = props.input, meta = props.meta;
    react_1.useEffect(function () {
        var dropArea = document.getElementById('dropArea');
        window.addEventListener('drop', function (e) { e.preventDefault(); });
        window.addEventListener('dragOver', function (e) { e.preventDefault(); });
        dropArea.addEventListener('drop', function (e) { console.log('dropped'); e.preventDefault(); });
        dropArea.addEventListener('dragOver', function (e) { console.log('dropped'); e.preventDefault(); });
        dropArea.addEventListener('click', function (e) { console.log('clicked'); e.preventDefault(); });
        return dropArea.removeEventListener('drop', input.onChange);
    });
    return (<div id={'dropArea'} style={{ borderWidth: 2, borderColor: '#4CAF50', borderRadius: 10, backgroundColor: "white", borderStyle: 'dashed' }}>
            <input type={'file'} name={input.name} onChange={input.onChange} onFocus={input.onFocus} onBlur={input.onBlur} multiple/>
        </div>);
};
exports["default"] = DocumentInput;
