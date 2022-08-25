const { request, response } = require("express");

const Query = require("../../model/Query");


exports.querypage = (request, response) => {
  response.render("./Query/Query.js");
};
exports.addQueryPage = (request, response) => {
  Query.save(request.params.query_id, request.session.user_identity)
    .then((result) => {
      response.redirect("/");
    })
    .catch((error) => {});
};
exports.querypost = (request, response) => {
  console.log(
    "Email : " + request.body.email + " Password : " + request.body.password
  );
  var query = new Query();
  query.email = request.body.email;
  query.password = request.body.password;
  query
    .checkQuery()
    .then((result) => {
      request.session.user_identity = result[0].id;
      response.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.allQueryPage = (request, response) => {
  Query.allQuery(request.session.user_identity)
    .then((result) => {
      for (ans of result) console.log(ans);
      response.render("./query/SendQueryEmail.ejs", { result });
    })
    .catch((error) => {});
};
