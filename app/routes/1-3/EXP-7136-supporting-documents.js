module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)


  // CHANGE VERSION TO THE VERSION
  const version = '1-3'
  const base_url = version + "/EXP-7136-supporting-documents"

  function isDupucate(arr,name){
    for (var i = 0; i < arr.length; i++) {

      if (arr[i].name == name) {
        return true;
      }
    }
    return false;
  }

  router.get('/' + base_url + '/certificates/*/supporting-documents', function(req, res) {

    if(req.query.delete){
      console.log("Deleting")
      tools.removeFromList(req.session.data.uploaded_files,req.query.delete)
    }
    res.render(base_url + '/certificates/'+ req.params[0] + '/supporting-documents', {
      "query": req.query
    }, function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
          return res.render(file_url + '/certificates/'+ req.params[0] + '/supporting-documents');
        }
        throw err;
      }
      res.send(html);
    })
  })
  router.post('/' + base_url + "/certificates/*/supporting-documents", function(req, res) {
    req.session.data.file_id_count += 1

    var query = "?"
    // if content add to addtoArray
    var file = req.body.file || "test_supporting_document.docx";
    var description = req.body.file_description || ""
    var id = req.session.data.file_id_count
    if(isDupucate(req.session.data.uploaded_files,file)){
      query+="hasError=true&errorType=duplicate"
    }else{
      // add uploaded file.
      req.session.data.uploaded_files.push({"name":file,"description":description,"ID":id})
    }

    // checkifFileExists()
    res.redirect(301, '/' + base_url + '/certificates/'+ req.params[0] + '/supporting-documents'+query);

  })
  // Base page router

}
