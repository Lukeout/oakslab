# Professor Oak's Lab

A microservice e-commerce website for PokemonGO listings. Four main web services, front-end, experience layer API (primary controller), model layer API, and a data store. The modular design of the application supports a more scalable design, as more featured can be added by connecting it to the experience layer as opposed to directly the front-end and model layers. An example of this would be implementing search using elastic search. The web services communicate each other via docker-compose for a quick, easily shippable, and rapid development environment. This is the start of my project in implementing an actual scalable web application.

## Web Front-end

Very basic, uses EJS templating and only has a nav bar and pages for displaying data. Front-end needs to be rehauled and designed. Application makes calls to the experience layer API for getting data. Authentication is also done on the front-end, when a user logs in, the models layer returns a JSON web token which gets stored on the client side via a cookie. 

## Experience layer

Buffer API between our web front end and our data. Front-end makes a request to the experience layer where it is decided where the request will go. For a simple GET or POST the request could go to the models layer, but for other featured such as search the experience layer will then make a call to a seperate container that has elastic search index for our listings. This architecture allows us to add more seperate web services that can communicate with our web-front end without convulting the client side layer. In addition because the experience layer is just an API, different front-ends such as a mobile application can make the same calls for data as our web front-end. 

## Models layer

Mongoose models that interact directly with the MongoDB (listings and users). Basic REST API functionality, GET, POST, PUT and DELETE. The Models layers also handels authentication as it cross checks with the user DB. 

## TO-DO
* Kafka-node breaks, might need to rewrite EXP layer in Django 
* Hash passwords on the client-side and store them hashed in DB
* Front-end rehaul
* Load balancing on front-end
* Testing
* Caching 
* Look into a SQL DB instead of MongoDB, postgres supports JSON fields too