$(document).ready(function () {
    $("#seasonTable").dataTable().fnDestroy();
    $('#seasonTable').DataTable({
        "searching": false
    });
    });