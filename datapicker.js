const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

$("#datepicker").datepicker( {
    format: "mm-yyyy",
    startView: "months", 
    minViewMode: "months"
}).on('changeDate', function(dateInfo) {
    convertDate(dateInfo.format());
});

$("#datepickerDashboard").datepicker( {
    format: "mm-yyyy",
    startView: "months", 
    minViewMode: "months"
}).on('changeDate', function(dateInfo) {
    convertDateDashboard(dateInfo.format());
});

function convertDate(dateInfo) {
    var monthYear = dateInfo.split("-");
    let month=monthYear[0];
    let year=monthYear[1];
    if(month.charAt(0) === '0')
        month = month.substring(1);
    updateTable(monthNames[month-1],year);
  }

  function convertDateDashboard(dateInfo) {
    var monthYear = dateInfo.split("-");
    let month=monthYear[0];
    let year=monthYear[1];
    if(month.charAt(0) === '0')
        month = month.substring(1);
    updateTableDashboard(monthNames[month-1],year);
  }


