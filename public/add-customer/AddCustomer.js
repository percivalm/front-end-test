(function () {
    angular.module('qudini.QueueApp')
        .directive('addCustomer', AddCustomer);


    function AddCustomer($http){
        return {
            restrict: 'E',
            scope:{
                onAdded: '&'
            },
            templateUrl:'/add-customer/add-customer.html',
            link: function(scope){

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];

                scope.add = function(){
                    var postbody = {name: scope.name, product:{name:scope.product.name}};
                    
                    $http({
                        method: 'POST',
                        url: '/api/customer/add',
                        data: JSON.stringify(postbody)
                    }).then(function(res){
                        console.log(res);
                        scope.onAdded()();
                    });
                }
            }
        }
    }

})()

