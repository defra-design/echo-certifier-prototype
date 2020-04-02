module.exports = function(router) {
  // Load helper functions
  var tools = require('../tools.js')


  // ADD extra routing here if needed.


  // CHANGE VERSION TO THE VERSION
  const version = '1-6'
  const base_url = version + "/qr-code"
  const file_url = version + "/certifier"

  var QRCode = require('qrcode')



  router.get('/' + base_url + '/test', function(req, res) {
    console.log("working")
    var qr1
    // QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
    //   console.log(url)
    //   req.session.data.qr1= url
    // })

    res.render(base_url + '/test', {"query":req.query},function(err, html) {
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

  router.post('/' + base_url + '/test', function(req, res) {

    QRCode.toFile('./app/assets/images/qrcode_l.png', req.body.url, {
      errorCorrectionLevel: 'L',
      color: {
        dark: '#000',  // Blue dots
        light: '#0000' // Transparent background
      }
    }, function (err) {
      if (err) throw err
      console.log('done')

    })
    QRCode.toFile('./app/assets/images/qrcode_m.png', req.body.url, {
      errorCorrectionLevel: 'M',
      color: {
        dark: '#000',  // Blue dots
        light: '#0000' // Transparent background
      }
    }, function (err) {
      if (err) throw err
      console.log('done')

    })
    QRCode.toFile('./app/assets/images/qrcode_q.png', req.body.url, {
      errorCorrectionLevel: 'Q',
      color: {
        dark: '#000',  // Blue dots
        light: '#0000' // Transparent background
      }
    }, function (err) {
      if (err) throw err
      console.log('done')
    })
    QRCode.toFile('./app/assets/images/qrcode_h.png', req.body.url, {
      errorCorrectionLevel: 'H',
      color: {
        dark: '#000',  // Blue dots
        light: '#0000' // Transparent background
      }
    }, function (err) {
      if (err) throw err
      console.log('done')

    })
  res.redirect(301, '/' + base_url + '/test?show_results=yes');
  })



}
