// Ensure table has 100% width for proper column alignment
$('#pf_locations').css('width', '100%');
$('#pf_locations thead').addClass('table-light');

// Count number of rows
var rowCount = $('#pf_locations tbody tr').length;

// Apply same ellipsis styling to header cells
$('#pf_locations thead th').each(function () {
  var text = $(this).text();
  $(this).css({
    'max-width': '200px',
    'white-space': 'nowrap',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis'
  });
  $(this).attr('title', text);
});

// Smaller font size for table
$('#pf_locations').css('font-size', '0.95rem');

// Initialize DataTable
var table = $('#pf_locations').DataTable({
  scrollX: true,
  scrollCollapse: true,
  autoWidth: false,
  paging: rowCount > 5,
  pageLength: 10,
  lengthMenu: [10, 25, 50],
  searching: true,
  ordering: true,
    order: [[2, 'asc']],
  info: true,
  language: {
    lengthMenu: "Show _MENU_ entries",
    info: "Showing _START_ to _END_ of _TOTAL_ entries"
  },
  columnDefs: [
    {
      targets: "_all",
      createdCell: function (td, cellData) {
        // Apply truncation + tooltip
        $(td).css({
          'max-width': '200px',
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
        });
        $(td).attr('title', cellData);
      }
    }
  ],
  createdRow: function (row, data, dataIndex) {
    const classValue = data[6]?.toLowerCase();
    let bgColor = "";

    if (classValue === "conserved") {
      bgColor = "rgba(189, 197, 201, 0.15)";
    } else if (classValue === "intermediate") {
      bgColor = "rgba(241, 185, 83, 0.15)";
    } else if (classValue === "variable") {
      bgColor = "rgba(242, 114, 137, 0.15)";
    }

    if (bgColor) {
      $('td', row).eq(6).css('background-color', bgColor); // Apply to "Class" cell only
    }
  }
});
