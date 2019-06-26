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
        item_id: answers.choice_Id
      }, function (err, result) {
        if(err) throw err;
        var inStock = result[0].stock_quantity;
        var chosenItemNum = answers.num_wanted;

        if (inStock >= chosenItemNum) {
          var leftover = inStock - chosenItemNum;
          var totalSpent = result[0].price * chosenItemNum;

          var chosenItem = result[0].product;

          console.log("Your order of $" + totalSpent + " has been processed.");

          connection.query(
            "UPDATE products SET ? WHERE ?", [
              {
                stock_quantity: leftover
              },
              {
                item_id: answers.choice_Id
              }
            ],

            // function (err) {
            //   if (err) throw err;
            // }
          );
          showItems();
        } else {
          console.log("Insufficient quantity!");
          chooseItem();
        }


      })

    })
}



         

