var amqp = require('amqp');

var connection = amqp.createConnection({url: "amqp://admin:admin@115.28.165.188:5672"});

connection.on('ready', function () {
    var callbackCalled = false;
    exchange = connection.exchange('exchange_name', {type: 'direct',autoDelete:false});
    connection.queue("hello",{autoDelete:false}, function(queue){
        queue.bind('exchange_name','queue_name', function() {
            exchange.publish('queue_name', 'this is message is testing ......');
            callbackCalled = true;

            setTimeout(function() {
                console.log("Single queue bind callback succeeded");
                //exchange.destroy();
                //queue.destroy();
                connection.end();
                connection.destroy();
            }, 50000);

        });

        queue.subscribe(function (message) {
            console.log('At 5 second recieved message is:'+ message.data);
        });

    });
}); 