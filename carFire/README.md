# carFire
Practice using Firebase and AngularFire with a little Routing.

## Step 1: Set up app
Create an angular app with the following script dependencies:
- Angular
- Firebase
- AngularFire
- ui-router

Make sure your index.html file includes all of the scripts as well as the basic components for getting your app to work with routing (`ng-app`, `ui-view`).

## Step 2: Set up routes, create views
Create the following routes in your app's `config` method:
- "cars": `/cars`
- "car": `/cars/:carId`

Create templates for both of the views. 

### `/cars` view
This view will show a list of cars. Use an `ng-repeat` and bind to properties on a car such as:
- Make
- Model
- Year
- Mileage
- Price

### `/cars/:carId` view
This view will show a single car and its associated comments. Use some HTML to summarize the properties of the car (Make, Model, etc.). Also use an ng-repeat to iterate over all of the car's comments and display each comment's text.

## Step 3: Create your controllers and the `carsService`
Create the two controllers your routes will depend on:
- `carsCtrl`
- `carCtrl`

Also, create a `carsService` (make sure it's linked in the HTML) and add the following methods:
- `getCars()`: will return a Firebase ref pointing to your app's collection of cars
- `getCar(carId)`: will return a Firebase ref pointing to a single car in the cars collection
- `getComments(carId)`: will return a Firebase ref pointing to a collection of comments made for a single car

## Step 4: Finish the routes
Create resolves on your routes so they will invoke the service methods we just created. 

On the "cars" state, resolve for a variable `carsRef`, which will receive the result of the `carsService.getCars()` method.

```javascript
  .state('cars', {
  	url: '/cars',
  	templateUrl: '/templates/cars.html',
  	controller: 'carsCtrl',
  	resolve: {
  		carsRef: function(carsService) {
  			return carsService.getCars();
  		}
  	}
  })
```

On the "car" state, resolve for a variable `carRef`, which will receive the result of the `carsService.getCar(carId)` method. It will need to get the `carId` from the `$stateParams` service provided by the router. Also, resolve for the variable `commentsRef`, which will receive the result of the `carsService.getComments(carId)` method. It will also need the `$stateParams.carId` value.

```javascript
  .state('car', {
  	url: '/cars/:carId',
  	templateUrl: '/templates/car.html',
  	controller: 'carCtrl',
  	resolve: {
  		carRef: function(carsService, $stateParams) {
  			return carsService.getCar($stateParams.carId);
  		},
  		commentsRef: function(carsService, $stateParams) {
  			return carsService.getComments($stateParams.carId);
  		}
  	}
  });
```

## Step 5: Complete the controllers and views

In `carsCtrl`, grab the `carsRef` variable provided to you by the router and convert it to a `$firebaseArray` so it can be placed on the scope (and used in your ng-repeat).

Also, use anchor tags on the individual cars so that when they're clicked, the `ui-sref` points to the correct route so that the secondary view can be seen:

```html
<a ui-sref="car({carId:car.$id})">{{car.year}} {{car.make}} {{car.model}}</a>
```

In the `carCtrl`, grab the `carRef` variable provided to your by the router and convert it to a `$firebaseObject` so it can be placed on the scope (and bound from your view). Also convert the `commentsRef` variable to a `$firebaseArray` so the comments will show up in your `ng-repeat` for that car.

## Step 6: Add creation ability
Add the necessary HTML to create a new car (on the `/cars` route) and to create a new comment (on the `car` route). You'll also need to utilize the `$add` method to create these new objects on your Firebase collections.
