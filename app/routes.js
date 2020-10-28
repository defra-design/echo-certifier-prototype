const express = require('express')
const router = express.Router()
const latest_version = "0-1"

// Add your routes here - above the module.exports line

require('./routes/1-3/routes.js')(router);
require('./routes/1-4/routes.js')(router);
require('./routes/1-5/routes.js')(router);
require('./routes/1-6/routes.js')(router);
require('./routes/1-7/routes.js')(router);
module.exports = router
