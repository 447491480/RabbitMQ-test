/**
 * Created by jhzhang on 2017/5/22.
 */


var amqp =require("amqplib/callback_api");

amqp.connect('amqp://admin:admin@115.28.165.188:5672',function (err, conn) {
    if(err) {
        console.log(err);
        return;
    }

    conn.createChannel(function (err, ch) {
        if(err) {
            console.log(err);
            return;
        }

        var q="task_queue";

        ch.assertQueue(q, {durable:true});

        var args={'id':"12313123123123","action":"create_sub_account","name":"常维军","identity_id":"342425199006115715"};

        ch.sendToQueue(q, new Buffer(JSON.stringify(args)));
        console.log("[x] Send Hello ~")
    });

    setTimeout(function() {
        conn.close(); process.exit(0)
    }, 500);
});

