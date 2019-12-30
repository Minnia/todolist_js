var serviceAccount = require("./permissions.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todolist-js-6c1cc..firebaseio.com"
});
const db = admin.firestore();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

//GET
app.get("/todos", (req, res) => {
  return res.status(200).send();
});

//POST
app.post("/api/todos", (req, res) => {
  (async () => {
    try {
      const todo = {
        newTodo: req.body.newTodo
      };
      await db
        .collection("todos")
        .doc()
        .create(todo);
      return res.status(200).send(todo);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  })();
});

exports.app = functions.https.onRequest(app);
