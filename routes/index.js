const router = require('express').Router();
const apiRoutes = require('./api');

//import route
router.use('/api', apiRoutes);


//catch all route
router.use((req, res) => {
    res.status(404).send('error didnt find route, 404, page not available');
});

module.exports = router;