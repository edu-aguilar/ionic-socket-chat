(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('SettingsController', SettingsController);

    /* @ngInject */
    function SettingsController($scope, $localStorage, $ionicActionSheet, $cordovaCamera) {
        var vm = this;
        vm.selectedColour = $localStorage.backgroundColor;

        //scope methods
        vm.showActionSheet = showActionSheet;

        $scope.$watch('vm.selectedColour', function() {
            $localStorage.backgroundColor = vm.selectedColour;
            $localStorage.backgroundImage = null;
        });

        function showActionSheet() {
            var obj = {
                buttons: [
                   { text: 'Cámara' },
                   { text: 'Galería' }
                ],
                titleText: 'Seleccione imagen',
                cancelText: 'Cerrar',
                cancel: function() {
                    console.log('actionSheet closed');
                },
                buttonClicked: function(index) {
                    if (index === 0) {
                        takePicture(0);
                    } else {
                        takePicture(1);
                    }
                    return true;
                }
            };

            var backgroundImageActionSheet = $ionicActionSheet.show(obj);
        }

        //private
        function takePicture(sourceType) {
            var options = {
                quality: 60,
                destinationType: 0, //base64
                sourceType: sourceType, //0 galeria, 1 camara
                allowEdit: false,
                targetWidth: 100,
                targetHeight: 100,
                saveToPhotoAlbum: false,
                correctOrientation: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                console.log(imageData);
                //image.src = "data:image/jpeg;base64," + imageData;
                $localStorage.backgroundImage = "data:image/jpeg;base64," + imageData;
                $localStorage.backgroundColor = null;
            }, function(err) {
                // error
            });

        }
    }
})();
