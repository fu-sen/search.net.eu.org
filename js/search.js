$( function() {
  $("#domain-search").click( function() {

    var domain = $("#domain-name").val() + $("#domain-ext").val();
    var dummy = $("#domain-d").val();
    var name = $("#domain-name").val();
    var regex = /[^0-9a-zA-Z\-]/

    var unicode = punycode.toUnicode(domain);
    var ascii = punycode.toASCII(domain);
    var asciiname = punycode.toASCII(name);

    if (dummy != ""){
        $('#domain').text("");
        $('#result').text("😷 Error");
        return false;
    } 

    if (asciiname.length < 4 || asciiname.length > 63){
        $('#domain').text("");
        $('#result').text("😷 Error");
        return false;
    } 

    if (regex.test(asciiname) == true){
        $('#domain').text("");
        $('#result').text("😷 Error");
        return false;
    }

    $('#result').text("🔍 Searching...");

    if (unicode == ascii){
       $('#domain').text(ascii + ": ");
    } else {
       $('#domain').text(unicode + " (" + ascii + "): ");
    }

    $.get("/api/search.php",
      {
        d: ascii,
        xhrFields: {
          withCredentials: true
        }
      }
    )
    .done(function(result) {
      if (result) {
        $('#result').text(result);
      } else {
        $('#result').text("😷 Error");
      }
    })
    .fail(function() {
      $('#result').text("😷 Error");
    });
  });
});
