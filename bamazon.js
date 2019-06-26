var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log("connected as id " + connection.threadId + "\n");
  showItems();
  // start();
});

function showItems() {
  var query = connection.query("SELECT * FROM products",
    function (err, result) {
      if (err) throw err;
      console.table(result);
      chooseItem();
    })
}


function chooseItem() {
  inquirer
    .prompt([
      {
        name: "choice_Id",
        type: "input",
        message: "Please type the ID of the item you want.",
      },
      {
        name: "num_wanted",
        type: "input",
        message: "How many units of this item do you want to buy?"
      }
    ])
    .then(function (answers) {
      // console.log(answers.num_wanted)
      var query = "SELECT * FROM products WHERE ?";
      connection.query(query, {
        id: answers.choice_Id
      }, function (err, res) {

        var inStock = res[0].stock_quantity;
        var chosenItemNum = answers.num_wanted;

        if (inStock >= chosenItem) {
          var leftover = inStock - chosenItemNum;
          var totalSpent = res[0].price * chosenItemNum;

          var chosenItem = res[0].product;

          console.log(totalSpent + " = total price of items bought");

          connection.query(
            "UPDATE products SET ? WHERE ?", [
              {
                stock_quantity: leftover
              },
              {
                id: answers.choice_Id
              }
            ],

            function (error) {
              if (error) throw err;
            }
          );
        } else {
          console.log("Insufficient quantity!");
          chooseItem();
        }


      })

    })
}



          // if(err) throw err;
          // for(var i = 0; i < result.length; i++){
          //   if(parseInt(answers.choice_Id) === result[i].item_id){
          //     if(parseInt(answers.num_wanted) > result[i].stock_quantity){
          //       console.log("Insufficient quantity!")
          //       showItems();
          //     } else{
          //       console.log("We've placed your order.")
          //     }
          //   }
          // }


        // for(var i; i < res.length; i++){
        //   if(res[i].item_id === parseInt(answers.choice_Id)){
        //     if(res[i].stock_quantity < parseInt(answers.num_wanted)){
        //       console.log("Insufficient quantity! Please choose a different quantity and try again.")
        //      showItems();
        //     }
        //   }
        // }






// function wantWhat() {
//   inquirer
//     .prompt([
//       {
//         name: "idItem",
//         type: "input",
//         message: "Input the id of the item you want to order."
//       },
//       {
//         name: "numDesired",
//         type: "number",
//         message: "How many do you want"
//       }
//     ]).then(function (response) {
//       var query = connection.query("SELECT * FROM products",
//         (err, res) => {
//           if (err) throw err;
//           for (var i = 0; i < res.length; i++) {
//             if (res[i].item_id === parseInt(response.numDesired){
//               if (res[i].stock_quantity < parseInt(response.numDesired)) {
//                 console.log("Insufficient quantity! We can't complete your purchase.");
//                 showItems();
//               } else {
//                 console.log("Your order was placed.");
//                 var itemPrice = res[i].price;
//                 var query = connection.query(
//                   "UPDATE products SET ? WHERE ?",
//                   [
//                     { stock_quantity: (res[i].stock_quantity - response.numDesired) },
//                     { item_id: response.idItem }
//                   ],
//                   (err, Res) => {
//                     if (err) throw err;
//                     console.log(Res.affectedRows + " products updated");
//                     var totalPrice = itemPrice * parseInt(response.numDesired);
//                     console.log("Cost of Purchase: " + itemPrice);
//                     connection.end();
//                   }
//                 )
//               }
//             }
//           }
//         });
//     });
// }


