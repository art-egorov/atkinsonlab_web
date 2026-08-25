// Ensure table has 100% width for proper column alignment
$('#pf_search_table').css('width', '100%');
$('#pf_search_table thead').addClass('table-light');

// Count number of rows
var rowCount = $('#pf_search_table tbody tr').length;

// Apply same ellipsis styling to header cells
$('#pf_search_table thead th').each(function () {
  var text = $(this).text();
  $(this).css({
    'max-width': '200px',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis'
  });
  $(this).attr('title', text);
});

// Smaller font size for table
$('#pf_search_table').css('font-size', '0.92rem');

// Initialize DataTable
var table = $('#pf_search_table').DataTable({
  scrollX: true,
  scrollCollapse: true,
  autoWidth: false,
  paging: false,
  pageLength: 10,
  lengthMenu: [10, 25, 50],
  searching: false,
  ordering: false,
   order: [],
  info: false,
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
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
        });
        $(td).attr('title', cellData);
      }
    }
  ]
});

$('#pf_search_table tbody tr:first').css('background-color', 'rgba(255, 209, 105, 0.2)');
