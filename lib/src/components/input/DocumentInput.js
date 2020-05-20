"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
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
    return (react_1.default.createElement("div", { id: 'dropArea', style: { borderWidth: 2, borderColor: '#4CAF50', borderRadius: 10, backgroundColor: "white", borderStyle: 'dashed' } },
        react_1.default.createElement("input", { type: 'file', name: input.name, onChange: input.onChange, onFocus: input.onFocus, onBlur: input.onBlur, multiple: true })));
};
exports.default = DocumentInput;
//# sourceMappingURL=DocumentInput.js.map