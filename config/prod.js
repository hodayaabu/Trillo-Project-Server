export default {
  dbURL:
    process.env.MONGO_URL ||
    "mongodb+srv://trelloCrawMongoDb:Gnyv0nFjFOiTM4If@trelloca-cluster.r6rwhb1.mongodb.net",

  dbName: process.env.DB_NAME || "TrelloDB",
};
