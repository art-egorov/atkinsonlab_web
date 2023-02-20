const pdfContainer = document.getElementById('pdf-container');
const pdfViewer = document.getElementById('pdf-viewer');

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
    pdf.getPage(1).then(page => {
        const viewport = page.getViewport({scale: 1});
        const containerWidth = pdfContainer.clientWidth;
        const widthScale = containerWidth / viewport.width;
        pdfViewer.setAttribute('width', '100%');
        pdfViewer.setAttribute('height', viewport.height * widthScale * 1.03 + 'px');
        pdfContainer.style.width = '100%';
        pdfContainer.style.height = viewport.height * widthScale * 1.03 + 'px';
    });
});