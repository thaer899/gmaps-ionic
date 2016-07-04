angular.module('maps').service('MapsService', function($q) {
    var self = this;
    self.markerArray = [];
    self.range = {value: 8};

    this.getMarkerData = function(mapControl, mapCenter, radius, type) {
        
        var service = new google.maps.places.PlacesService(mapControl);
        var request = {
            location: mapCenter,
            radius: '' + radius,
            types: [type]
        };
        var defer = $q.defer()
        service.nearbySearch(request, customCallback(defer));
        return defer.promise;
    }

    function customCallback(promise) {

        return function callback(results, status) {
            console.log("type of markerArray " + JSON.stringify(results))
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                self.markerArray.length = 0;
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    var markerObject = {};
                    
                    markerObject.coords = {
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    }
                    markerObject.id = i;
                    markerObject.show = 'true';
                    markerObject.templateUrl = "app/components/Maps/markerWindow.html"
                    markerObject.templateParameter = "{}"
                    markerObject.isIconVisibleOnClick = "true"
                    markerObject.closeClick = function(){
                        
                    }
                    self.markerArray.push(markerObject);
                }
                promise.resolve(self.markerArray);
            }
        }
    }
    
    
    function callback(results, status) {
            console.log("type of markerArray " + JSON.stringify(results))
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                self.markerArray.length = 0;
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    var markerObject = {};
                    
                    markerObject.coords = {
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    }
                    markerObject.id = i;
                    self.markerArray.push(markerObject);
                }
//                promise.resolve(self.markerArray);
            }
        }

});
