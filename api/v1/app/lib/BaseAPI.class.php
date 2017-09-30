<?php
    namespace PeopleConnect;
    
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;
    use Monolog\Processor\UidProcessor;

    
    abstract class BaseAPI
    {
        /**
        * Property: method
        * The HTTP method this request was made in, either GET, POST, PUT or DELETE
        */
        protected $method = '';
        /**
        * Property: endpoint
        * The Model requested in the URI. eg: /files
        */
        protected $endpoint = '';
        /**
        * Property: verb
        * An optional additional descriptor about the endpoint, used for things that can
        * not be handled by the basic methods. eg: /files/process
        */
        protected $verb = '';
        /**
        * Property: args
        * Any additional URI components after the endpoint and verb have been removed, in our
        * case, an integer ID for the resource. eg: /<endpoint>/<verb>/<arg0>/<arg1>
        * or /<endpoint>/<arg0>
        */
        protected $args = Array();
        /**
        * Property: file
        * Stores the input of the PUT request
        */
        protected $file = Null;

        protected $logger = Null;

        protected $settings = Null;

        /**
        * Constructor: __construct
        * Allow for CORS, assemble and pre-process the data
        */
        public function __construct($settings) {
            // A couple of test log messages
            //echo 'The class "', __CLASS__, '" was initiated!<br />';
            
            $this->settings = $settings;
            $this->errorReporting();
            $this->CORS();
            $this->logger();
        }

        private function errorReporting()
        {
            if($this->settings['displayErrorDetails'])
            {
                error_reporting(1);
                ini_set('display_errors', 1);
            }
            else{
                error_reporting(0);
                ini_set('display_errors', 0);
            }
        }

        private function CORS()
        {
            if (isset($_SERVER['HTTP_ORIGIN'])) {
                header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
                header('Access-Control-Allow-Credentials: true');
                header('Access-Control-Max-Age: 86400');    // cache for 1 day
            }
        
            // Access-Control headers are received during OPTIONS requests
            if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");        
        
                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                    header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        
                exit(0);
            }
        }
        private function logger()
        {
            $this->logger = new Logger($this->settings['logger']['name']);
            $this->logger->pushProcessor(new UidProcessor());
            // Add log file handler
            $this->logger->pushHandler(new StreamHandler(__DIR__ . '/../../'.$this->settings['logger']['path'], Logger::INFO));
        }

        public function logEvents()
        {
            return $this->logger;
        }

        public function getPostData()
        {
            return json_decode(file_get_contents("php://input"));
        }

        public function sanitizeInput($input)
        {
            return mysql_real_escape_string($input);
        }

        function __destruct() {
            //echo 'The class "', __CLASS__, '" was destroyed.<br />';
        }
    }
?>