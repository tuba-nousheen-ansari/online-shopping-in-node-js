const Customer=require("../../model/Customer");

exports.loginpage=(request,response)=>{
    response.render("./customer/Login.ejs");
}

exports.addCartPage=(request,response)=>{

    Customer.saveCart(request.params.pro_id,request.session.user_identity)
    .then((result)=>{
        response.redirect("/");
    })
    .catch((error)=>{

    });
    
}

exports.loginpost=(request,response)=>{
    console.log("Email : "+request.body.email+" Password : "+request.body.password);
    var customer = new Customer();
    customer.email=request.body.email;
    customer.password=request.body.password;
    customer.checkCustomerLogin()
    .then((result)=>{
        request.session.user_identity=result[0].id;
       response.redirect("/");
    })
    .catch((error)=>{
        console.log(error);
    });
}

exports.allCartPage=(request,response)=>{
    Customer.allCart(request.session.user_identity)
    .then((result)=>{
        for(ans of result)
            console.log(ans);
        response.render("./customer/AddCart.ejs",{result})
    })
    .catch((error)=>{

    });
}