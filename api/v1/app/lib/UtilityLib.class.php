<?php

    namespace PeopleConnect\Utility;
    
    class UtilityLib {

        protected $settings = null;

        //__construct
        function __construct($settings) {
            //echo 'The class "', __CLASS__, '" was initiated!<br />';
            $this->settings = $settings;
        }
    
        //__destruct
        function __destruct() {
            //echo 'The class "', __CLASS__, '" was destroyed.<br />';
            
        }
        
        //dataValidator
        public function dataValidator($validationLib, $messageLib, $passedData)
        {
            $responseData = array();
            
            foreach ($passedData as $key => $value) 
            {
                if($value)
                {
                    $validationKey = $key;
                
                    $isValid = $validationLib->validateInputValueFormat($this->settings['validationRules'][$validationKey], $value);
                    if($isValid)
                    {
                        $responseData['success'] = true;
                    }
                    else
                    {
                        $responseData['success'] = false;
                        $responseData['error'] = $this->settings['validationRules'][$validationKey];
                        return $responseData;
                    }
                }
                else
                {
                    $responseData['success'] = true;
                }
            }

            
            return $responseData;
        }

        //generateUserId
        public function generateUserId($user_email)
        {
            return "USER_".md5($user_email);
        }

        //generateUserId
        public function generateId($prependString)
        {
            return uniqid($prependString);
        }

        //generateVerificationCode
        public function generateVerificationCode()
        {
            return bin2hex(openssl_random_pseudo_bytes(4));
        }

        //generatePasswordResetCode
        public function generatePasswordResetCode()
        {
            return bin2hex(openssl_random_pseudo_bytes(2));
        }
        
        //extractKeyName
        private function extractKeyName($key)
        {
            $removeInitials = $key;
            return lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $removeInitials))));
        }

        //generateKeyValueStructure
        private function generateKeyValueStructure($data)
        {
            foreach ($data as $key => $value) 
            {
                $keyName = $this->extractKeyName($key);
                $tempRows[$keyName] = $value;
            }
            
            return $tempRows;
        }

        //generateServiceReturnDataStructure
        private function generateServiceReturnDataStructure($passedData)
        {
            $responseData = array();

            //echo "$passedData".json_encode($passedData);

            if($passedData)
            {
                $responseData['success'] = true;
                $responseData['data'] = $passedData;
            }
            else
            {
                $responseData['success'] = false;
            }


            return $responseData;
        }   

        //hasedString
        public function hasedString($string)
        {
            $text = $string;
            $salt = $this->settings['hashKey']['SALT'];
            $hashedString =  trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
            
            return $hashedString; 
        }

        //originalString
        function originalString ($hashedString)
        {
            $text = $hashedString;
            $salt = $this->settings['hashKey']['SALT'];
   
            $originalString = trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $salt, base64_decode($text), MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND)));
            
            return $originalString;
        }

        // user
        //getAllRegisteredUsers
        public function getAllRegisteredUsers($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getAllRegisteredUsers($passedData); 
            $tempRows = array();
            $responseData = array();

            foreach ($rows as $eachData) 
            {
                $tempRows[] = $this->generateKeyValueStructure($eachData);
            }

            return $this->generateServiceReturnDataStructure($tempRows);
        }

        //getUserDetailsByUserId
        public function getUserDetailsByUserId ($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getUserDetailsById($passedData); 
            return $this->generateKeyValueStructure($rows);
        }

        //getUserDetailsByEmail
        public function getUserDetailsByEmail ($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getUserDetailsByEmail($passedData); 
            return $this->generateKeyValueStructure($rows);
        }

        //getAllEvents
        public function getAllEvents($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getAllEvents($passedData);

            $responseData = array();

            foreach ($rows as $eachData) 
            {    

                $tempRows = $this->generateKeyValueStructure($eachData);
                $passedData = array(
                        "event_id"=>$tempRows['eventId']
                    );
                $tempRows['users'] = $this->getEventUsers($DBAccessLib, $passedData);
                
                $responseData[] = $tempRows;
                
            }

            return $this->generateServiceReturnDataStructure($responseData);
        }

        //getUserEvents
        public function getUserEvents($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getUserEvents($passedData);

            $responseData = array();

            foreach ($rows as $eachData) 
            {    
                $tempRows = $this->generateKeyValueStructure($eachData);
                
                $passedData = array(
                    "event_id"=>$tempRows['eventId']
                );
                $tempRows['users'] = $this->getEventUsers($DBAccessLib, $passedData);
                $responseData[] = $tempRows;
            }

            return $this->generateServiceReturnDataStructure($responseData);
        }

        //getUserDetailsByEmail
        public function getEventUsers($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getEventUsers($passedData); 
            $tempRows = array();
            $responseData = array();

            foreach ($rows as $eachData) 
            {
                $tempRows[] = $this->generateKeyValueStructure($eachData);
            }

            return $this->generateServiceReturnDataStructure($tempRows);
        }

        //getAllEvents
        public function getEventDetails($DBAccessLib, $passedData)
        {
            $responseData = array();
            $rows = $DBAccessLib->getEventDetails($passedData); 
            $responseData = $this->generateKeyValueStructure($rows);
            $responseData['users'] = $this->getEventUsers($DBAccessLib, $passedData);
            
            return $this->generateServiceReturnDataStructure($responseData);
        }

        //getUserAchievements
        public function getUserAchievements($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getUserAchievements($passedData); 
            $tempRows = array();
            $responseData = array();

            foreach ($rows as $eachData) 
            {
                $tempRows[] = $this->generateKeyValueStructure($eachData);
            }

            return $this->generateServiceReturnDataStructure($tempRows);
        }

        //eventPhotos
        public function eventPhotos($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getEventPhotos($passedData); 
            $tempRows = array();
            $responseData = array();

            foreach ($rows as $eachData) 
            {
                $tempRows[] = $this->generateKeyValueStructure($eachData);
            }

            return $this->generateServiceReturnDataStructure($tempRows);
        }

        public function getEventPhotos($DBAccessLib, $passedData)
        {
            $responseData = array();
            $rows = $DBAccessLib->getEventDetails($passedData); 
            $responseData = $this->generateKeyValueStructure($rows);
            $responseData['photos'] = $this->eventPhotos($DBAccessLib, $passedData);
            
            return $this->generateServiceReturnDataStructure($responseData);
        }

        //getHoursSpentInEventsForDate
        public function getHoursSpentInEventsForDate($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getAllEvents($passedData);

            $responseData = array();

            foreach ($rows as $eachData) 
            {    
                $tempRows = $this->generateKeyValueStructure($eachData);
                
                $passedData = array(
                    "event_id"=>$tempRows['eventId'],
                    "from_date"=>$passedData['from_date'],
                    "to_date"=>$passedData['to_date']
                );
                $tempRows['hoursTrack'] = $this->getEventHoursForDate($DBAccessLib, $passedData);
                $responseData[] = $tempRows;
            }

            return $this->generateServiceReturnDataStructure($responseData);
        }

        //getEventHoursForDate
        public function getEventHoursForDate($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getEventHoursForDate($passedData); 
            $tempRows = array();
            $responseData = array();

            foreach ($rows as $eachData) 
            {
                $tempRows[] = $this->generateKeyValueStructure($eachData);
            }

            return $this->generateServiceReturnDataStructure($tempRows);
        }

        //getHoursSpentInEventsForDate
        public function getHoursSpentBtUserForDate($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getAllRegisteredUsers($passedData);

            $responseData = array();

            foreach ($rows as $eachData) 
            {    
                $tempRows = $this->generateKeyValueStructure($eachData);
                
                $passedData = array(
                    "user_id"=>$tempRows['userId'],
                    "from_date"=>$passedData['from_date'],
                    "to_date"=>$passedData['to_date']
                );
                $tempRows['hoursTrack'] = $this->getUserHoursForDate($DBAccessLib, $passedData);
                $responseData[] = $tempRows;
            }

            return $this->generateServiceReturnDataStructure($responseData);
        }

        //getEventHoursForDate
        public function getUserHoursForDate($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getUserHoursForDate($passedData); 
            $tempRows = array();
            $responseData = array();

            foreach ($rows as $eachData) 
            {
                $tempRows[] = $this->generateKeyValueStructure($eachData);
            }

            return $this->generateServiceReturnDataStructure($tempRows);
        }

        //getAllUserFeedbacks
        public function getAllUserFeedbacks($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getAllUserFeedbacks($passedData); 
            $tempRows = array();
            $responseData = array();

            foreach ($rows as $eachData) 
            {
                $tempRows[] = $this->generateKeyValueStructure($eachData);
            }

            return $this->generateServiceReturnDataStructure($tempRows);
        }

        //getAllCorporateDetails
        public function getAllCorporateDetails($DBAccessLib, $passedData)
        {
            $rows = $DBAccessLib->getAllCorporateDetails($passedData); 
            $tempRows = array();
            $responseData = array();

            foreach ($rows as $eachData) 
            {
                $tempRows[] = $this->generateKeyValueStructure($eachData);
            }

            return $this->generateServiceReturnDataStructure($tempRows);
        }

        

        

    }
?>