let express = require('express');
let app = express();

const router = express.Router()

router.put('/ticks', showTicks)