// Apply the class first
$('#hmmscan_results thead').addClass('table-light rounded');
$('#hmmscan_results thead').css('font-weight', '100');  // 500 is typically used for medium weight

// Now initialize the DataTable
var table = $('#hmmscan_results').DataTable({
    "paging": false,          // Disable pagination
    "searching": false,       // Disable filtering
    "ordering": false,        // Disable sorting
    "info": false,            // Disable table info
    "scrollX": true,          // Enable horizontal scrolling
    "sScrollXInner": "100%"   // Set the inner scroll width to 100%
});


// Apply the class first
// Ensure table has 100% width for proper column alignment
$('#pfam_results').css('width', '100%');
$('#pfam_results thead').addClass('table-light');

// Count number of rows
var rowCount = $('#pfam_results tbody tr').length;

// Apply same ellipsis styling to header cells
$('#pfam_results thead th').each(function () {
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
$('#pfam_results').css('font-size', '0.95rem');

// Initialize DataTable
var table = $('#pfam_results').DataTable({
  scrollX: true,
  scrollCollapse: true,
  autoWidth: false,
  paging: rowCount > 5,
  pageLength: 10,
  lengthMenu: [10, 25, 50, rowCount],
  searching: false,
  ordering: true,
    order: [[2, 'desc']],
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
