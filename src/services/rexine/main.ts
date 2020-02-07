import { fileDOMReader, fileReader } from "./file";
import { csvToArray, arrayToJson, jsonToArray } from "./format";

class Rexine {
	constructor() {}
}

Object.assign(Rexine.prototype, {
	csvToArray,
	arrayToJson,
	jsonToArray,
	fileDOMReader,
	fileReader
});

export default Rexine;
export {
	Rexine,
	csvToArray,
	arrayToJson,
	jsonToArray,
	fileDOMReader,
	fileReader
};
