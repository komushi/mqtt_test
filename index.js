var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
  client.subscribe('sent_by_xd');
  client.publish('sent_by_mqtt_test', 'Hello mqtt');
});

client.on('message', function (topic, message) {
  // message is Buffer
  var messageJSON = JSON.parse(message);
  console.log(messageJSON);
  console.log(messageJSON.countryCode);

  if (messageJSON.countryCode)
  {
  	if (messageJSON.countryCode == "CN")
  	{
  		console.log("is cn");
  		var jsonObj = {'warning': "don't answer! don't answer! don't answer!"};
  		client.publish('sent_by_mqtt_test', JSON.stringify(jsonObj));
  	}
  	else
  	{
  		console.log("not cn");
  		var jsonObj = {'message': "welcome! what is your space coordinate?"};
      client.publish('sent_by_mqtt_test', JSON.stringify(jsonObj));
  	}
  }
  else
  {
  	console.log("no countryCode");
    client.publish('sent_by_mqtt_test', message);
  }

  // client.end();
});