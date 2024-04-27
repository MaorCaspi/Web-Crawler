const getUrls = async (req, res) => {
    try {
        res.status(200).send('hello!');
    }
    catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        });
    }
};

module.exports = {
    getUrls
};