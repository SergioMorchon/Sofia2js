# Insert example

``` javascript
var kp = new Sofia2.default.KP({
	name: "KPName",
	ontology: "OntologyName",// ie: temperature
	instance: "SomeInstance",// ie: instance0
	endpoint: {
		url: "ws://sofia2.com/sib/api_websocket"//the public sib gateway for WebSockets
	},
	onMessage: function (msg) {
		console.log(msg);
	}
});

kp.join("mytoken"/* the kp token */).then(function () {
	kp.insert({
		Prop1: "Value",
		Prop2: 829.9,
		Prop3: {
			SomeProp: false
		}
	});// insert the new ontology instance value, as it is.
	
	// do any Insert as you want, ie. a loop or event-fired.
	
	kp.leave();// and leave
});
```
