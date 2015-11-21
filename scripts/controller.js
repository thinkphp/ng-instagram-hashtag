'use strict'
 
app.factory('Instagram', ['$http',
 
            function( $http ){
 
                      var base = "https://api.instagram.com/v1",
 
                          clientId = '14f61130851148619ad677aa8a8188bd';
 
                          return {
 
                                 get: function(count, hashtag) {
 
                                      var request = '/tags/' + hashtag + '/media/recent';
                                      var url = base + request;
 
                                      var config = {
                                         'params': {
                                              'client_id': clientId,
                                              'count': count,
                                              'callback': 'JSON_CALLBACK'
                                                   }
                                              };
 
                                   return $http.jsonp(url, config);
                                 }
                          }
            }
 
])
 
app.controller('mainCtrl', ['$scope','Instagram', function($scope, Instagram){
 
               $scope.example = { hash: 'bucegi' }
 
               var handleResponse = function(scope, resp) {
 
 
                   if( resp.meta.code === 200 ) {
 
                       if( resp.data.length > 0 ) {
 
                           scope.items = resp.data
                     
                       } else {
 
                         scope.error = "This hashtag has returned no results"
                       }
 
                   } else {
 
                        scope.error = res.meta.error_type + ' | ' + res.meta.error_message;
                                return;
                   }
               }
 
               Instagram.get(32, $scope.example.hash).success(function( response ){
 
                         handleResponse($scope.example, response)
               })
 
 
    $("button").click(function(){
 
               Instagram.get(32, $scope.searchString).success(function( response ){
 
                         handleResponse($scope.example, response)
               })
 
   })

   $('#query').keypress(function (e) {

       var key = e.which;

       if(key == 13) {

            Instagram.get(32, $scope.searchString).success(function( response ){
 
                         handleResponse($scope.example, response)
               })
       }
   });   

}])