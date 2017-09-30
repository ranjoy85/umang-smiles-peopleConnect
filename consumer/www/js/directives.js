

angular
    .module
    (
        'starter.directives', 
        [
            'ionic'
        ]
    )
    .directive
    (
        'appLoader', 
        function() 
        {
            var _directive = {};
            _directive.restrict = 'E';
            _directive.templateUrl = 'templates/loader.html';
            _directive.scope = {
                _loading: '=loading'
            };
            return _directive;
        }
    )
    .directive('qrcode', function($interpolate) {  
        return {
            restrict: 'E',
            link: function($scope, $element, $attrs) {

            var options = {
                text: '',
                width: 250,
                height: 250,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: 'H'
            };

            Object.keys(options).forEach(function(key) {
                options[key] = $interpolate($attrs[key] || '')($scope) || options[key];
            });

            options.correctLevel = QRCode.CorrectLevel[options.correctLevel];

            new QRCode($element[0], options);

            }
        };
        });
