module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.
  // require('./extra-stories.js')(router)


  // CHANGE VERSION TO THE VERSION
  const version = '1-3'
  const base_url = version + "/"


  // Base page router
  router.post('/' + base_url + "*/commodity-details", function(req, res) {
    res.redirect(301, '/' + base_url + req.params[0] + '/review-your-answers')
  })
  router.post('/' + base_url + "*/supporting-documents-uploaded", function(req, res) {
    req.session.data.has_uploaded_files = "yes";
    res.redirect(301, '/' + base_url + req.params[0] + '/review-your-answers')
  })
  router.post('/' + base_url + "*/review-your-answers", function(req, res) {
    res.redirect(301, '/' + base_url + 'certifier-record-decision')
  })
  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*', function(req, res) {
    console.log("default get routing page for: "+base_url + req.params[0])
    // clear session info
    if(req.query.destroy=="yes"){
      req.session.destroy();
    }
    res.render(base_url + req.params[0], {
      "query":req.query,
    });
  })










}
