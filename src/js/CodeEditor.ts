import * as monaco from 'monaco-editor';

// @ts-ignore
self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return '/dist/json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return '/dist/css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return '/dist/html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return '/dist/ts.worker.bundle.js';
		}
		return '/dist/bundle/node_modules_monaco-editor_esm_vs_basic-languages_python_python_js.bundle.js';
	}
};

const runFunction = () => {
	alert("Command + S is pressed");
}


const addEditor = (elementQuery: string,  language: string, fileContent:string) => {
	document.addEventListener('DOMContentLoaded', (event) => {
		const editorElement: HTMLElement | null = document.body.querySelector('#editor');
		const editor = monaco.editor.create(editorElement, {
			value: fileContent,
			language: 'python',
			roundedSelection: false,
			scrollBeyondLastLine: true,
			readOnly: false,
			codeLens: true,
			wordWrap: "wordWrapColumn",
			wordWrapColumn: 40,
			wrappingIndent: "indent",
		});
		monaco.editor.colorizeElement(document.getElementById("code"), {});

		const myBinding = editor.addCommand(monaco.KeyCode.F9, function () {
			alert("F9 is pressed");
		});

		const saveBinding = editor.addCommand(monaco.KeyMod.CtrlCmd & monaco.KeyMod.Shift & monaco.KeyCode.KeyR, runFunction);

		if (editorElement) {

		} else {
			console.error('Cannot find element with id "editor"');
		}
	});
}



export default addEditor;