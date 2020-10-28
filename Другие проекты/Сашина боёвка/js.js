window.onload = function() {
 // Check for the various File API support.
 if (window.File && window.FileReader && window.FileList && window.Blob) {
        let red = [];      
  
        function handleFileSelect(evt) {
          evt.stopPropagation();
          evt.preventDefault();
      
          var files = evt.dataTransfer.files; // FileList object.
      
          // files is a FileList of File objects. List some properties.
        var output = [];
          for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('text.*')) {
              continue;
            }
          var reader = new FileReader();
          reader.onload = (function(theFile) {
          return function(e) {
            if (e.explicitOriginalTarget.readyState = 2){
            console.log(e.explicitOriginalTarget.result)
            red.push(JSON.parse(e.explicitOriginalTarget.result));
            console.log(red[red.length-1])
            }
          };
        })(f);
          reader.readAsText(f);
          }
          document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        }
      
        function handleDragOver(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        }
      
        // Setup the dnd listeners.
        var dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);
      } else {
    alert('The File APIs are not fully supported in this browser.');
      }}