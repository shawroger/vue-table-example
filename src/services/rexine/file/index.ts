/* eslint-disable */
export function fileReader(
	files: File,
	callback: (...args: any) => any,
	lazyRead: boolean = true
): void | any {
	const fileReader = new FileReader();
	fileReader.readAsText(files, "UTF-8");
	fileReader.onload = e => {
		if (!lazyRead) {
			return () => callback(e);
		}
		if (callback) {
			callback(e);
		}
	};
}

export function fileDOMReader(
	selector: string,
	callback: (p: any) => any,
	lazyRead: boolean = true
): void {
	const fileSelector: any = document.querySelector(selector);

	fileSelector.onchange = () => {
		if (fileSelector.files[0]) {
			fileReader(fileSelector.files[0], callback, lazyRead);
		} else {
			console.warn("missing file content");
		}
	};
}
