angular.module('maps').controller('MapsCtrl', function($scope, $stateParams, LogService, $timeout, uiGmapGoogleMapApi, uiGmapIsReady, MapsService) {
        $scope.selectType = {
        selected: {displayName: "WALKING", type: "WALKING"},
        options: [{displayName: "WALKING", type: "WALKING"},{displayName: "DRIVING", type: "DRIVING"}, {displayName: "BICYCLING", type: "BICYCLING"},{displayName: "TRANSIT", type: "TRANSIT"}]
    };
    $scope.waySelected=$scope.selectType.selected.type;
//    alert($scope.waySelected);
    $scope.map = {
        center: {
            latitude: 19.0946709,
            longitude: 72.8646064
        },
        zoom: 13,
        events: {
            tilesloaded: function(map) {

            }
        },
        mapControl: {}
    };

   
        $scope.$watch("selectType.selected", function(newValue, oldValue) {
        if (newValue != oldValue)
        {
            console.log("value is " + newValue.type)
            $scope.waySelected=newValue.type;
//            alert($scope.waySelected);
            routeCal()
//            var mapControl = $scope.map.mapControl.getGMap();
//                var mapCenter = new google.maps.LatLng(19.0946709, 72.8646064);
//            var mapCenter = new google.maps.LatLng($scope.map.center.latitude, $scope.map.center.longitude);
//            MapsService.getMarkerData(mapControl, mapCenter, $scope.range.value * 1000, newValue.type).then(function(resolvedObj) {
//            });
        }
    });
   
    function routeCal() {
        var request = {
            origin: "Banyan Park, Suren Road, Andheri East, Mumbai, Maharashtra 400093",
            destination: "Mahakali Caves Rd, Hanuman Nagar, Andheri East, Mumbai, Maharashtra 400093",
            travelMode: google.maps.TravelMode[$scope.waySelected]
        };

        $scope.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                $scope.directionsDisplay.setDirections(response);
                console.log('enter!');
            }
        });

    }
//    $scope.markerArray = MapsService.markerArray;
//    $scope.range = MapsService.range;
//    $scope.selectType = {
//        selected: {displayName: "Bus", type: "bus_station"},
//        options: [{displayName: "Police", type: "police"}, {displayName: "Bus", type: "bus_station"}]
//    };
//    $scope.map = {
//        center: {
//            latitude: 19.0946709,
//            longitude: 72.8646064
//        },
//        zoom: 12,
//        events: {
//            tilesloaded: function(map) {
//
//            }
//        },
//        mapControl: {}
//    };
//    var timer = null;
//    $scope.$watch("range.value", function(newValue, oldValue) {
//        if (newValue != oldValue)
//        {
//            $timeout.cancel(timer);
//            timer = $timeout(function() {
//                console.log("Good enough");
//                timer = null;
//                var mapControl = $scope.map.mapControl.getGMap();
//                var mapCenter = new google.maps.LatLng($scope.map.center.latitude, $scope.map.center.longitude);
////                var mapCenter = new google.maps.LatLng(19.0946709, 72.8646064);
//                console.log("New value " + newValue)
//                MapsService.getMarkerData(mapControl, mapCenter, newValue * 1000, $scope.selectType.selected.type).then(function(resolvedObj) {
//                });
//            }, 500);
//        }
//    });
//
//    $scope.$watch("selectType.selected", function(newValue, oldValue) {
//        if (newValue != oldValue)
//        {
//            console.log("value is " + newValue.type)
//            var mapControl = $scope.map.mapControl.getGMap();
////                var mapCenter = new google.maps.LatLng(19.0946709, 72.8646064);
//            var mapCenter = new google.maps.LatLng($scope.map.center.latitude, $scope.map.center.longitude);
//            MapsService.getMarkerData(mapControl, mapCenter, $scope.range.value * 1000, newValue.type).then(function(resolvedObj) {
//            });
//        }
//    });

    uiGmapIsReady.promise()
            .then(function(maps) {
                var mapControl = $scope.map.mapControl.getGMap();
                var mapCenter = new google.maps.LatLng($scope.map.center.latitude, $scope.map.center.longitude);
                $scope.directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});
                $scope.directionsService = new google.maps.DirectionsService();
//                $scope.map;
//                $scope.map = new google.maps.Map(document.getElementById("abc"), $scope.map);
                $scope.directionsDisplay.setMap(mapControl);
                routeCal();
                MapsService.getMarkerData(mapControl, mapCenter, $scope.range.value * 1000, $scope.selectType.selected.type).then(function(resolvedObj) {
                });

            });
//
    uiGmapGoogleMapApi.then(function(map) {
    });

});
