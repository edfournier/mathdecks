// Create initial databases and collections
const mongo = db.getMongo();
mongo.getDB("auth-db").createCollection("users");
mongo.getDB("deck-db").createCollection("decks");
mongo.getDB("milestone-db").createCollection("records");