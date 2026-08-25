// Apply the class first
$('#foldseek_search thead').addClass('table-light rounded');
$('#foldseek_search thead').css('font-weight', '100');  // 500 is typically for medium weight
// Get the number of rows in the table
var numRows = $('#foldseek_search tbody tr').length;

// Initialize the DataTable with conditional pagination and custom length menu
var table = $('#foldseek_search').DataTable({
    "paging": numRows > 5,            // Enable pagination only if there are more than 5 rows
    "pageLength": 5,                  // Set default number of rows per page to 5
    "lengthMenu": [5, 10, 25, 50],    // Available page length options (include 5)
    "searching": false,               // Disable filtering
    "ordering": false,                // Disable sorting
    "info": true,                     // Show table info
    "scrollX": true,                  // Enable horizontal scrolling
    "sScrollXInner": "100%",          // Set the inner scroll width to 100%
    "language": {
        "lengthMenu": "Show _MENU_ entries",  // Custom text for "Show entries"
        "info": "Showing _START_ to _END_ of _TOTAL_ entries"
    },

});
