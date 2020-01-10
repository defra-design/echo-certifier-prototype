module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.


  // CHANGE VERSION TO THE VERSION
  const version = '1-5'
  const base_url = version + "/EXP-8903-close-certifcate"
  const file_url = version + "/certifier"


  router.post('/' + base_url + "*/certifier-record-decision", function(req, res) {
      var error = true
      var id = req.body.decision_identification_number.toUpperCase()
      if(id.includes("SP") || id.includes("NV")){
        error =false
      }
      if(error){
        res.redirect(301, '/' + base_url + req.params[0] + '/certifier-record-decision?has_error=yes');
      }

      if(req.body.decision=="approved"){
        res.redirect(301, '/' + base_url + req.params[0] + '/certifier-have-signed');
      }else{
        res.redirect(301, '/' + base_url + req.params[0] + '/summary/case-'+req.body.decision);
      }

  })



}
