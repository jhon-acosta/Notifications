const { Router }  = require('express');
const router = Router();

const webPush = require('../webPush');

let pushSubscription;

//Suscribir al usuario
router.post('/subscription', async (req, res) => {
    pushSubscription = req.body;
    res.status(200).json();
});

router.post('/new-message', async (req, res) => {

    const { message } = req.body

    const payload = JSON.stringify({
        title: 'GitHub Notification',
        message: message
    });
    
    try {
        await webPush.sendNotification(pushSubscription, payload)   
    } catch (error) {
        console.log(error)
    }
})



module.exports= router;
