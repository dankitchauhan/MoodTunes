// Constantly Update Table
setInterval(function () {
  $.getJSON("/t", function (data) {
    CreateHtmlTable(data);
  });
  return false;
}, 100);

function CreateHtmlTable(data) {
  //Clear result div
  $("#ResultArea").html("");
  //Crate table html tag
  var table = $(
    "<table class = 'table table-striped table-light table-bordered table-hover table-sm table-responsive' id=DynamicTable></table>"
  ).appendTo("#ResultArea");
  //Create table header row
  var rowHeader = $("<tr></tr>").appendTo(table);
  $("<td></td>").text("Name").appendTo(rowHeader);
  $("<td></td").text("Album").appendTo(rowHeader);
  $("<td></td>").text("Artist").appendTo(rowHeader);
  $("<td></td>").text("URL").appendTo(rowHeader);
  //Get JSON data by calling action method in controller
  $.each(data, function (i, value) {
    //Create new row for each record
    var row = $("<tr></tr>").appendTo(table);
    $("<td></td>").text(value.Name).appendTo(row);
    $("<td></td>").text(value.Album).appendTo(row);
    $("<td></td>").text(value.Artist).appendTo(row);
    var url = `<a href="${value.URL}">${value.Name}</a>`;
    $("<td></td>").text(url).appendTo(row);
  });
}
