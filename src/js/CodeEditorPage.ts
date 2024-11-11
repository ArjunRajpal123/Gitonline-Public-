// export const unPackPage = async () => {
//     window.addEventListener('beforeunload', async (e) => {
//         e.preventDefault();
//         await fetch("http://" + window.location.host + window.location.pathname + "/delete");
//         e.returnValue = '';
//     });
// };



//Code for file tree

function createFileElement(file: { name: string, type: string, contents: any[] }, fullFilePath: string) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', `http://${window.location.host}${window.location.pathname}/filePath/${fullFilePath + file.name}`);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('stroke-width', '1.5');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('class', 'w-4 h-4');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('d', 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z');
    svg.appendChild(path);
    a.appendChild(svg);
    a.appendChild(document.createTextNode(file.name));
    li.appendChild(a);
    return li;
}

function createDirectoryElement(directory: { name: string, type: string, contents: any[] }, fullFilePath: string) {
    const details = document.createElement('details');
    details.setAttribute('open', '');
    const summary = document.createElement('summary');
    summary.textContent = directory.name;
    details.appendChild(summary);
    const ul = document.createElement('ul');
    directory.contents.forEach(item => {
        if (item.type === 'file') {
            ul.appendChild(createFileElement(item, fullFilePath + '/' + directory.name + '/'));
        } else if (item.type === 'directory') {
            ul.appendChild(createDirectoryElement(item, fullFilePath + '/' + directory.name));
        }
    });
    details.appendChild(ul);
    return details;
}

function createProjectDirectoryElement(name: string) {
    const details = document.createElement('details');
    details.setAttribute('open', '');
    const summary = document.createElement('summary');
    summary.textContent = name;
    details.appendChild(summary);
    const ul = document.createElement('ul');
    details.appendChild(ul);
    return details;
}

export const initFileTree = async () => {
    const root = document.querySelector('#fileTree-ul');
    root.innerHTML = '';
    const data = await fetch("http://" + window.location.host + window.location.pathname + "/listFiles");
    const dataJson = await data.json();
    const projectDirectory = createProjectDirectoryElement(dataJson[0].name);

    await dataJson[0].contents[0].contents.forEach((item: { name: string, type: string, contents: any[] }) => {
        if (item.type === 'file') {
            projectDirectory.appendChild(createFileElement(item, ''));
        } else if (item.type === 'directory') {
            projectDirectory.appendChild(createDirectoryElement(item, ''));
        }
    });
    root.appendChild(projectDirectory);
}

const syncFilesButton = document.querySelector('#sync-file-system');
syncFilesButton.addEventListener('click', async () => {
    await initFileTree();
});