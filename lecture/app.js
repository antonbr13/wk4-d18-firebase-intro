angular.module('russianRoulette', ['firebase'])

.controller('mainCtrl', function($scope, $firebaseObject, firebaseService) {

   var ref = firebaseService.getRootRef();

   $scope.game = $firebaseObject(ref.child('game'));


   $scope.createNewGame = function() {

         $scope.game.chambers = [];
         $scope.game.currentChambers = 0;
         $scope.game.deadPerson = false;


      var bullet = Math.floor(Math.random() * 6);
      for (var i = 0; i < 6; i++) {
         if(i===bullet) {
            $scope.game.chambers.push(true);
         }
         else {
            $scope.game.chambers.push(false);
         }
      }

      $scope.game.$save();

   };

})

.service('firebaseService', function() {
   this.getRootRef = function() {
      return new Firebase('https://blistering-torch-3437.firebaseio.com/');
   };


});
