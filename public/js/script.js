var chatRoomApp = angular.module('chatRoomApp', []);

chatRoomApp.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

chatRoomApp.controller('mainCtrl', ['$scope','socket', function($scope, socket){
  $scope.list = [];

  socket.on('connect', function () {
    console.log('Connected to server');
  
    socket.emit('newMsgFromBrowser', {
        from: 'Browser',
        text: 'Hi, I come from the server.'
    });
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });
  

  var item = {};

  socket.on('newMsgFromServer', function (msg) {
    item = {'sender':msg.from,message:msg.message,'created_at':msg.createdAt};
    $scope.list.push(item);
  }, function (data) {
    console.log('It comes from the server', data);
  });
}]);

