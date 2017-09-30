

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
    );