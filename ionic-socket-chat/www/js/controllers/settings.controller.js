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
                    return true;
                }
            };

            var backgroundImageActionSheet = $ionicActionSheet.show(obj);
        }

        //private
        function takePicture() {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
            correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                console.log(imageData);
                image.src = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // error
            });

        }
    }
})();
