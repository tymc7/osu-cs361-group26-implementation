const db  = require('../database.js');

// Publish Message
// publisher  - name of publisher
// message    - message that will be sent to subscribers
exports.publishMessage = (publisher, message) => {
  return db.getPubSubList(publisher)
  .then( (data) => {
    for(var i = 0; i < data.length; i++){
      console.log(`${data[i].subscriber}: ${message}`);
    }
    return data.length;
  })
  .catch( (e) => {
    console.log(e, e.stack);
    return false;
  })

}

// Create Publisher
// returns ID of publisher created
exports.createPublisher = (name) => {
  return db.createRow( 'a_publishers', { 'name':name } )
  .then(data => data[0])
  .catch( (e) => console.log(e, e.stack) );
}

// Delete Publisher
exports.deletePublisher = (pubId) => {
  return db.deleteRow('a_publishers', pubId)
  .catch( (e) => console.log(e, e.stack) );
}

// Create Subscriber
// returns ID of subscriber created
exports.createSubscriber = (publisherID, sub) => {
  return db.createRow('a_subscribers', {'pub_id': publisherID, 'subscriber': sub})
  .then(data => data[0])
  .catch( (e) => console.log(e, e.stack) );
}

// Delete Subscriber
exports.deleteSubscriber = (subID) => {
  // remove row in a_subscribers
  return db.deleteRow('a_subscribers', subID)
  .catch( (e) => console.log(e, e.stack) );
}
