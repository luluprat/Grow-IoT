class thingDisplay {
  beforeRegister() {
    this.is = "thing-display";
    this.properties = {
      uuid: String,
      thing: {
        type: Object
      },
      loader:Number
    };
  }
  get behaviors() {
    return [
      mwcMixin,
    ];
  }
  get trackers (){
    return [
      "subThing(uuid)",
      "setThing(uuid)"
    ];
  }
  attached(){
    const span = this.$.loading;
    this.loader = setInterval(function() {
      if ((span.innerHTML += '.').length == 4) 
        span.innerHTML = '';
    }, 500);

    //clearInterval( this.loader ); // at some point, clear the setInterval
  }
  subThing(uuid) {
    if(uuid){
      this.subscribe('Things.one', uuid);
    }
  }
  setThing(uuid){
    if(uuid){
      let thing = Things.findOne({uuid: uuid});
      this.set('thing', thing);
    }
  }
  deleteThing () {
    Meteor.call('Thing.delete',
      this.thing.uuid,
      (error, document) => {
        if (error) {
          console.error("Delete thing error", error);
          return alert(`Error: ${error.reason || error}`);
        }
      }
    );
  }
}

Polymer(thingDisplay);

