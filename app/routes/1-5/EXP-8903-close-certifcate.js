module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.


  // CHANGE VERSION TO THE VERSION
  const version = '1-5'
  const base_url = version + "/EXP-8903-close-certifcate"
  const file_url = version + "/certifier"

  function updateStatus($data,$id,$status){
    console.log("** Updating status **")
   for (var i = 0; i < $data.length; i++) {
     console.log("looking at id "+$data[i].index+" case for "+$id)

     // for each field create an obj with the Key being the field name
     // and the value being the posted data from that field
     if($data[i].index == $id){
       console.log("found, updating status status")
       $data[i].status=$status
       return true;
     }
   }
   return false;
  }

  router.post('/' + base_url + "*/certifier-record-decision", function(req, res) {
      var error = true
      var id = req.body.decision_identification_number.toUpperCase()
      if(id.includes("SP") || id.includes("NV")){
        error =false
      }
      if(error){
        res.redirect(301, '/' + base_url + req.params[0] + '/certifier-record-decision?has_error=yes');
      }

      if(req.body.decision=="approved" && req.session.data.skip_step == "yes" ){
        res.redirect(301, '/' + base_url + req.params[0] + '/close-certificate?status_6969=completed');
      }else if(req.body.decision=="approved" ){
        res.redirect(301, '/' + base_url + req.params[0] + '/certifier-have-signed');
      }else{
        res.redirect(301, '/' + base_url + req.params[0] + '/summary/case-'+req.body.decision);
      }

  })

  router.post('/' + base_url + "*/certifier-have-signed", function(req, res) {
    req.session.data.return = req.session.data.return || "dispatched"
    if(req.body.is_signed == "yes"){

      res.redirect(301, '/' + base_url + req.params[0] + '/close-certificate?status_6969=completed');
    }else{

      updateStatus(req.session.data.cases,12,"approved")
      console.log(req.session.data.cases)
      res.redirect(301, '/' + base_url + req.params[0] + '/summary/case-dispatched?status_6969=approved');
    }
  })



}
