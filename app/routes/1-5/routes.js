module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  require('./cancel-replace.js')(router)

  // CHANGE VERSION TO THE VERSION
  const version = '1-4'
  const base_url = version + "/"
  const file_url = version + "/certifier"


  // Base page router
 function updateStatus($data,$id,$status){
  for (var i = 0; i < $data.length; i++) {
    // for each field create an obj with the Key being the field name
    // and the value being the posted data from that field
    if($data[i].index == $id){
      $data[i].status=$status
      return true;
    }
  }
  return false;
 }
 router.use(function (req, res, next) {
   //hacky way to update statuses.
   // if(req.query.update_status && req.query.id){
   //   updateStatus(req.session.data.cases, req.query.id, req.query.update_status)
   // }
  next()
})
  router.post('/' + base_url + "*/supporting-documents-uploaded", function(req, res) {
    req.session.data.has_uploaded_files = "yes";
    res.redirect(301, '/' + base_url + req.params[0] + '/review-your-answers');
  })
  // router.post('/' + base_url + "*/certifier-record-decision", function(req, res) {
  //   res.redirect(301, '/' + base_url + req.params[0] + '/confirmation');
  // })

  //
  // router.post('/' + base_url + "*/certificates/*/review-your-answers", function(req, res) {
  //   console.log("review your answers post "+req.params[0])
  //   console.log("review your answers post "+req.params[1])
  //   res.redirect(301, '/' + base_url +req.params[0] + '/certifier-record-decision')
  // })
  // Set default route for all pages certificates

  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*', function(req, res) {

    var dir = req.params[0].split(/\/+/g);
    // Remove the main folder

    dir.shift()
    var baseDir = ""
    dir.forEach(function(element) {
      var path = "/" + element
      baseDir += path
    })

    console.log("trying to render " +base_url + req.params[0])
    // clear session info
    if(req.query.destroy=="yes"){
      req.session.destroy();
    }
    res.render(base_url + req.params[0], {"query":req.query},function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
        console.log("Can find "+base_url + req.params[0]+ " in target directory, rendering page from Certifier jounrey")
        return res.render(file_url + baseDir,{"query":req.query});
      }
        throw err;
      }
      res.send(html);
    });
  })










}
