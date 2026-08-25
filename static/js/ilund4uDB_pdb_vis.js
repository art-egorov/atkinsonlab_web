$(document).ready(function() {
    // Check if pdbPath is available
    if (pdbPath !== "NA") {
        var pdbLink = pdbPath;

        // Create a new div for the PDB viewer
        var pdbviewer = $('<div/>');
        pdbviewer.attr('id', 'pdbviewer');
        pdbviewer.css('width', '100%');
        pdbviewer.css('height', '330px');
        pdbviewer.css('position', 'relative');
        $('#pdbviewer-container').append(pdbviewer);

        // Load the PDB file using 3Dmol.js
        var element = pdbviewer.get(0);
        var config = { backgroundColor: 'white' };
        var viewer = $3Dmol.createViewer(element, config);

        // Fetch the PDB file and load it into the viewer
        $.get(pdbLink, function (data) {
            var model = viewer.addModel(data, 'pdb');

            var atoms = model.selectedAtoms({});

        var colorByBFactor = function(atom) {
    var bfactor = parseFloat(atom.b);
    if (bfactor <= 50) return '#ee821e';
    if (bfactor <= 70) return '#f7ed10';
    if (bfactor <= 90) return '#14cff1';
    return '#0f6dff';
};

            viewer.setStyle(
                {}, // apply to all atoms
                {
                    cartoon: {
                        colorfunc: colorByBFactor,
                        style: 'rectangle'
                    }
                }
            );

            viewer.rotate(180, 'y', 10000);
            viewer.rotate(180, 'y', 10000);

            viewer.zoom(0.8);
            viewer.render();
            viewer.render();
            // Add a download button
            var downloadButton = $('<a/>');
            downloadButton.addClass('btn btn-sm btn-outline-primary');
            downloadButton.attr('href', pdbLink);
            var filename = pdbLink.substring(pdbLink.lastIndexOf('/') + 1);
            downloadButton.attr('download', filename);
            downloadButton.html('Download PDB');
            downloadButton.css('position', 'absolute');
            downloadButton.css('bottom', '10px');
            downloadButton.css('left', '10px');
            pdbviewer.append(downloadButton);
        }).fail(function() {
            console.error("Failed to load the PDB file.");
        });
    }
});
