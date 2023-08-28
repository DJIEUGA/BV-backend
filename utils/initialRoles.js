const Role = require("../models/Role");

 exports.initial = () => {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "gmanager"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'gmanager' to roles collection");
        });
  
        new Role({
          name: "inspector"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'inspector' to roles collection");
        });


        new Role({
          name: "manager"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'manager' to roles collection");
        });
  
        }
    })
}