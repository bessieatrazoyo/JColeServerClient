# JColeServerClient
This is based on the tutorial here:  http://start.jcolemorrison.com/building-an-angular-and-express-app-part-1/
To get this working on a virtual machine, please see this google doc:  https://docs.google.com/document/d/1VsCTIMbBNYrmw9E-m36XwUVMy5sh8clvG51zTyt3Rv8/edit#heading=h.dfbe46xmf0jb

If you have gotten all the node_modules that you need and you are ready to execute the code, here's what you need to do:

In root:  mongod --dbpath data/db/ --logpath data/logs/mongodb.log --logappend
In client: grunt serve
In server: npm test
To get to database:  From data/db:  mongo, use test 
