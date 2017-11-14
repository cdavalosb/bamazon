var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "guadalupe9",
  database: "bamazon"
});

connection.connect(function(err) {
  if(err){
    console.error("error connecting: " + err.stack)
  }

  console.log("Get your self connected!");
  makeTable();
});

function makeTable() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    // for(var i=0; i<res.length; i++){
    // 	console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
    // }
    promptCostumerforItem();
  });
}
////// create an inquirer prompt that asks costumer what they want to purchase ,, then they type in the item's name and the it will loop through our response from the query. If the product is = to the string the client inputed, then its gonna say correct = true. It is goint to set the product variable to whatever choice the costumer made and set the ID to whatever the ID of that item was. Then going to ask how many of those items they would like to buy using another inquirer prompt. ///////

function promptCostumerforItem() {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What do you need? [quit with Q]"
    }]).then(function(answer) {
        var correct = false;
        if (answer.choice.toUpperCase() == "Q") {
            process.exit();
            return;
        }
        else{
          for(var i = 0; i < res.length; i++) {
            if (res[i].product_name == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;

                inquirer.prompt({
                    type: "input",
                    name: "quant",
                    message: "How many do you need?",
                    validate: function(value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer) {
                    if ((res[id].stock_quantity - answer.quant) > 0) {
                        connection.query("UPDATE products SET stock_quantity='" + (res[id].stock_quantity - answer.quant) + "' WHERE product_name='" + product + "'", function(err, res2) {
                            console.log("product bought!");
                            makeTable();
                        });
                    } else {
                        console.log("Not valid choice!");
                        promptCustomer(res);
                    }
                });}
            }
            if (i == res.length && correct == false) {
                console.log("Not a valid key!");
                promptCustomer(res);
            }
        }
    });
  }

    // for (var i = Things.length - 1; i >= 0; i--) {
    //     Things[i]
    // }
