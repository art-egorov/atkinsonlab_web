// Ensure table has 100% width for proper column alignment
$('#proteome_data').css('width', '100%');
$('#proteome_data thead').addClass('table-light');

// Count number of rows
var rowCount = $('#proteome_data tbody tr').length;

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
$('#proteome_data').css('font-size', '0.95rem');

// Initialize DataTable
var table = $('#proteome_data').DataTable({
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
  ]
});
