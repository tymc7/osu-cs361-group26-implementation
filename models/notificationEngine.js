const db  = require('../database.js');

// Publish Message
// publisher  - name of publisher
// message    - message that will be sent to subscribers
exports.publishMessage = (publisher, message) => {
  // Tyler
  db.getPubSubList(publisher)
  .then( (data) => {
    console.log(data);
    for(var i = 0; i < data.length; i++){
      console.log(data[i], message);
    }
    return true;
  })
  .catch( (e) => {
    console.log(e, e.stack);
    return false;
  })

}

// Create Publisher
exports.createPublisher = (name) => {
  // Create row in a_publishers table
  return db.createRow( 'a_publishers', { 'name':name } );
}

// Delete Publisher
exports.deletePublisher = (pubId) => {
  return db.deleteRow('a_publishers', pubId);
}

// Create Subscriber
exports.createSubscriber = (publisherID, sub) => {
  // Create row in a_subscribers table
  return db.createRow('a_subscribers', {'pub_id': publisherID, 'subscriber': sub});
}

// Delete Subscriber
exports.deleteSubscriber = (subID) => {
  // remove row in a_subscribers
  return db.deleteRow('a_subscribers', subId);
}
