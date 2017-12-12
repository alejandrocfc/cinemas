# cinemas

Init
-------------
Run **npm install** and **bower install** to install libraries and packages

Config
-------------
Create **user** collection and add a document as following:
```
// User
email: "admin@cinemas.com";
password: "$2a$10$GG6s1eE.Q2Hg.0j2m71ADOTyfho8StxCVepA8QPUbHe9mAZdOrz4K"; //hash password, to read: domus123
```


Routes
-------------
> - **/** User view: Populate theaters and movies
> - **/cms** CMS: Administrator module, use credentials created on Config

### ToDo
- Make beauty user module
- Configure sarch theater/movie
- Allow movies has multiples theaters
