<?php

    namespace PeopleConnect\Database;

    class BaseDatabaseAPI {
        private $conection;
        private $host;
        private $user;
        private $password;
        private $databaseName;
        private $port;
        private $Debug;
    
        function __construct($settings) {
            //echo 'The class "', __CLASS__, '" was initiated!<br />';
            
            $this->conection = false;
            $this->host = $settings['db']['host']; //hostname
            $this->user = $settings['db']['username'];
            $this->password = $settings['db']['password'];; //password
            $this->databaseName = $settings['db']['database']; //name of your database
            $this->port = $settings['db']['port'];
            $this->debug = true;
            
            $this->connect();
        }
    
        function __destruct() {
            //echo 'The class "', __CLASS__, '" was destroyed.<br />';
            $this->disconnect();
        }
        
        private function connect() {
            if (!$this->conection) {
                
                try {
                    $this->conection = new \PDO('mysql:host='.$this->host.';dbname='.$this->databaseName.'', $this->user, $this->password, array(\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));  
                }
                catch (Exception $e) {
                    die('Erreur : ' . $e->getMessage());
                }
    
                if (!$this->conection) {
                    $this->status_fatal = true;
                    echo 'Connection BDD failed';
                    die();
                } 
                else {
                    $this->status_fatal = false;
                }
            }
            else{
                
            }
            
    
            return $this->conection;
        }
    
        private function disconnect() {
            if ($this->conection) {
                $this->conection = null;
            }
        }
        
        public function getOneRecord($query) {
            $queryResponse = $this->conection->prepare($query);
            $rowsEffected = $queryResponse->execute();
            if (!$rowsEffected) 
            {
                echo 'PDO::errorInfo():';
                echo '<br />';
                echo 'error SQL: '.$query;
                die();
            }
            $queryResponse->setFetchMode(\PDO::FETCH_ASSOC);
            $reponseData = $queryResponse->fetch();
            
            return $reponseData;
        }
        
        public function getAllRecords($query) {
            $queryResponse = $this->conection->prepare($query);
            $rowsEffected = $queryResponse->execute();
            if (!$rowsEffected) {
            echo 'PDO::errorInfo():';
            echo '<br />';
            echo 'error SQL: '.$query;
            die();
            }
            $queryResponse->setFetchMode(\PDO::FETCH_ASSOC);
            $reponseData = $queryResponse->fetchAll();
            
            return $reponseData;
        }
        
        public function executeStatement($query) {
            if (!$response = $this->conection->exec($query)) {
                echo 'PDO::errorInfo():';
            echo '<br />';
            echo 'error SQL: '.$query;
            die();
            }
            return $response;
        }

        public function ifRecordExist($query) 
        {
            $dataAvailable = false;
            $queryResponse = $this->conection->prepare($query);
            $rowsEffected = $queryResponse->execute();
            if (!$rowsEffected) 
            {
                echo 'PDO::errorInfo():';
                echo '<br />';
                echo 'error SQL: '.$query;
                die();
            }
            $queryResponse->setFetchMode(\PDO::FETCH_ASSOC);
            $reponseData = $queryResponse->fetchAll();
            
            if (count($reponseData) > 0) 
            {
                $dataAvailable = true;
            } 
            else 
            {
                $dataAvailable = false;
            }
            
            return $dataAvailable;
        }
    }
?>