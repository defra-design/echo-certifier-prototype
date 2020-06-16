module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.


  // CHANGE VERSION TO THE VERSION
  const version = '1-6'
  const base_url = version + "/EXP-10372-organisation-switcher"
  const file_url = version + "/certifier"

  var QRCode = require('qrcode')

  function getCurrentList(list, page, max = 25){
    console.log("--------------")
    console.log("Getting current list")
    var total_items = list.length
    var shown_items_min = (1+max*page)-max
    var shown_items_max = ((max*page) < total_items) ? max*page : total_items;
    var new_list = []
    for (var i = shown_items_min; i< shown_items_max; i++ ){
      console.log("pushing: "+list[i].company)
      new_list.push(list[i])
    }
    return new_list
  }
  function getSearchResults(list,query){
    console.log("--------------")
    console.log("getSearchResults")
    var new_list = []
    for (var i =  0; i< list.length; i++ ){
      // console.log(company.includes(query.toLowerCase()))
      var company = list[i].company.toLowerCase()
      if (company.includes(query.toLowerCase())){
        new_list.push(list[i])
      }

    }
    return new_list
  }

  // this adds query to all pages and will be called if no other get routing exists.
  router.get('/' + base_url + '*/switch-organisation', function(req, res) {
   var orgs=require('../../data/orgs.json')
   orgs.sort(function(a,b) {

				var returnValue = a.company.toUpperCase() > b.company.toUpperCase() ? 1 : b.company.toUpperCase() > a.company.toUpperCase() ? -1 : 0;

				return returnValue;
			})
    var page = req.session.data.page || 1;
    var max = req.session.data.max_per_page || 25;
    if(req.query.search){
        var new_list = getSearchResults(orgs,req.query.search)
    }else{
      var new_list = getCurrentList(orgs,page,max)
    }



    res.render(base_url + req.params[0] + '/switch-organisation',{
      "query": req.query,
      "orgs": new_list,
      "total_items" : orgs.length,
      "shown_items_min" : (1+max*page)-max,
      "shown_items_max" : ((max*page) < orgs.length) ? max*page : orgs.length,
      "next_page" : page+1,
      "prev_page" : page-1,

    },function(err, html) {
      if (err) {
        if (err.message.indexOf('template not found') !== -1) {
        console.log("Can find "+base_url + req.params[0]+ " in target directory, rendering page from Certifier jounrey")
        return res.render(file_url + '/switch-organisation', {
            "query": req.query,
            "orgs": new_list,
            "total_items" : orgs.length,
            "shown_items_min" : (1+max*page)-max,
            "shown_items_max" : ((max*page) < orgs.length) ? max*page : orgs.length
          });
      }
        throw err;
      }
      res.send(html);
    });
  })



}
