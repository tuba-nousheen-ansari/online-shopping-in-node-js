const Admin=require("../../model/Admin");

exports.loginpage=(request,response)=>{
    response.render("./admin/Login.ejs");
}

exports.dashboardPage=(request,response)=>{
    response.render("./admin/Dashboard.ejs");
}

exports.loginpost=(request,response)=>{
    console.log("Email : "+request.body.email+" Password : "+request.body.password);
    var admin = new Admin(request.body.email, request.body.password);
    admin.checkLogin()
    .then((result)=>{
        request.session.user_identity=request.body.email;
        response.redirect("/admin/dashboard");
    })
    .catch((error)=>{
    });
}

exports.allCustomerListPage=(request,response)=>{
    Admin.allCustomer()
    .then((result)=>{
        console.log(result);
        response.render("./admin/AllCustomerList.ejs",{result});
    })
    .catch((err)=>{
        console.log(err);
    });
}

exports.customerSupport=(request,response)=>{
    Admin.customerQuery()
    .then((result)=>{
        response.render("./admin/AllQuery.ejs",{result});
    })
    .catch((err)=>{
        console.log(err);
    });
}