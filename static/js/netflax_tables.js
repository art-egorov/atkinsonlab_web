// Initialize the DataTable
var table = $('#myTable').DataTable({
    scrollX: true,
    order: [3, "desc"],
    sScrollXInner: "100%"
});


// Handle clicks on the "Details" links
$('#myTable').on('click', 'a.details-control', function (e) {
    e.preventDefault();
    var tr = $(this).closest('tr');
    var row = table.row(tr);

    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        $(this).text('Show Structure');
        tr.removeClass('shown');
    } else {
        // Open this row
        var rowData = row.data();
        var dict_key = rowData[2] + "-" + rowData[1];
        var pdbfile = json_data_dict[dict_key];
        var pdbLink = "/static/pdbs/" + pdbfile

        var pdbviewer = $('<div/>');
        pdbviewer.attr('id', 'pdbviewer');
        pdbviewer.css('width', '100%');
        pdbviewer.css('height', '400');
        pdbviewer.css('position', 'relative')
        row.child(pdbviewer).show();

        // Load the PDB file with 3Dmol.js
        var element = pdbviewer.get(0);
        var config = {backgroundColor: 'white'};
        var viewer = $3Dmol.createViewer(element, config);
        $.get(pdbLink, function (data) {
            viewer.addModel(data, 'pdb');
            viewer.setStyle({chain: 'A'}, {cartoon: {color: '#1E93B2'}});
            viewer.setStyle({chain: 'B'}, {cartoon: {color: '#C24765'}});
            viewer.rotate(180, 'y', 10000);
            viewer.rotate(180, 'y', 10000);

            viewer.zoom(1.01);
            viewer.render();

            var downloadButton = $('<a/>');
            downloadButton.addClass('btn btn-outline-primary');
            downloadButton.attr('href', pdbLink);
            var filename = pdbLink.substring(pdbLink.lastIndexOf('/') + 1);
            downloadButton.attr('download', filename);
            downloadButton.html('Download PDB');
            downloadButton.css('position', 'absolute');
            downloadButton.css('bottom', '10px');
            downloadButton.css('right', '10px');
            pdbviewer.append(downloadButton);

        });

        tr.addClass('shown');
        $(this).text('Hide Structure');
    }
});


const proteinClustersBtn = document.getElementById("proteinClustersBtn");
const collapseWidthExample = document.getElementById("collapseWidthExample");

collapseWidthExample.addEventListener("show.bs.collapse", () => {
    proteinClustersBtn.textContent = "Hide protein clusters";
});

collapseWidthExample.addEventListener("hide.bs.collapse", () => {
    proteinClustersBtn.textContent = "Show protein clusters";
});