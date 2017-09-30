<?php

namespace PeopleConnect;

class EventController extends BaseAPI
{
    protected $User;
    protected $DBAccessLib;
    protected $UtilityLib;
    protected $ValidationLib;
    protected $MessageLib;
    protected $SessionLib;
    protected $EmailLib;

    public function __construct($settings) {
        parent::__construct($settings);
        $this->DBAccessLib = new Database\DBAccessLib($settings); // create a new object, class db()
        $this->UtilityLib = new Utility\UtilityLib($settings);
        $this->ValidationLib = new Validation\ValidationLib();
        $this->MessageLib = new Message\MessageLib();
        $this->SessionLib = new Session\SessionLib($settings);
        $this->EmailLib = new Email\EmailLib($settings);
    }

    //eventCrud
    public function eventCrud()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $event_id = null;
        if(array_key_exists('eventId', $postData))
        {
            $event_id = parent::sanitizeInput($postData->eventId);
        }
        else
        {
            $event_id = $this->UtilityLib->generateId('EVENT_');
        }
        $event_name = parent::sanitizeInput($postData->eventName);
        $event_description = parent::sanitizeInput($postData->eventDescription);
        $event_date = parent::sanitizeInput($postData->eventDate);
        $event_youtube_link = parent::sanitizeInput($postData->eventYoutubeLink);
        $event_web_link = parent::sanitizeInput($postData->eventWebLink);
        $event_twitter_link = parent::sanitizeInput($postData->eventTwitterLink);
        $event_facebook_link = parent::sanitizeInput($postData->eventFacebookLink);
        $operation_type = parent::sanitizeInput($postData->operationType);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        $passedData = array(
                "user_id"=>$user_id, 
                "event_id"=>$event_id,
                "event_name"=>$event_name, 
                "event_description"=>$event_description,
                "event_date"=>$event_date,
                "event_youtube_link"=> $event_youtube_link,
                "event_web_link"=> $event_web_link,
                "event_twitter_link"=> $event_twitter_link,
                "event_facebook_link"=> $event_facebook_link,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $tudil_logged_in_session_id);                
            
            if ($activeUser) 
            {
                if($operation_type == 'create')
                {
                    //ifEventAlreadyExist
                    $ifEventAlreadyExist = $this->DBAccessLib->ifEventAlreadyExist($passedData); 
                    
                    if($ifEventAlreadyExist)
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['EVENT_EXIST']);
                    }
                    else
                    {
                        //insert new user
                        $eventCreated = $this->DBAccessLib->insertNewEventInDB($passedData);
                        if ($eventCreated)
                        {

                            //insertNewMemberWithEvent
                            $passedData = array(
                                "user_id"=>$user_id, 
                                "event_id"=>$event_id,
                                "user_type"=>'ADMIN', 
                                "user_acceptence_status"=>'ACCEPTED'
                            );

                            $insertNewMemberWithEvent =  $this->DBAccessLib->insertNewMemberWithEventInDB($passedData);

                            if($insertNewMemberWithEvent)
                            {
                                $message = $this->settings['successMessage']['SUCCESS_EVENT_CREATE'];
                                $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                            }
                            else
                            {
                                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_CREATE']);
                            }
                        }
                        else
                        {
                            $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_CREATE']);
                        }   
                    }
                }
                else if($operation_type == 'edit')
                {
                    //insert new user
                    $updateEvent = $this->DBAccessLib->updateEvent($passedData);
                    if($updateEvent)
                    {
                        $message = $this->settings['successMessage']['SUCCESS_EVENT_UPDATED'];
                        $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_UPDATE']);
                    }
                }
                
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }  

    //useEvents
    public function useEvents()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //echo json_encode($passedData);
        $passedData = array(
                "user_id"=>$user_id, 
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                
            
            if ($activeUser) 
            {
                $userEvents = $this->UtilityLib->getUserEvents ($this->DBAccessLib, $passedData); 
                $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userEvents);
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }  

    //allEvents
    public function allEvents()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //echo json_encode($passedData);
        $passedData = array(
                "user_id"=>$user_id, 
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                
            
            if ($activeUser) 
            {
                $userEvents = $this->UtilityLib->getAllEvents($this->DBAccessLib, $passedData); 
                $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userEvents);
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }  

    //eventDetails
    public function eventDetails()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $event_id = parent::sanitizeInput($postData->eventId);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //echo json_encode($passedData);
        $passedData = array(
                "user_id"=>$user_id, 
                "event_id"=>$event_id,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                
            
            if ($activeUser) 
            {
                $userEvents = $this->UtilityLib->getEventDetails($this->DBAccessLib, $passedData); 
                $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userEvents);
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    } 

    //userEventAttendenceCRUD
    public function userEventAttendenceCRUD()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        
        $user_id = parent::sanitizeInput($postData->userId);
        $event_id = parent::sanitizeInput($postData->eventId);
        $user_event_attendence_type = parent::sanitizeInput($postData->userEventAttendenceType);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        $passedData = array(
                "user_id"=>$user_id, 
                "event_id"=>$event_id,
                "user_event_attendence_type"=>$user_event_attendence_type,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $tudil_logged_in_session_id);                
            
            if ($activeUser) 
            {
                if($user_event_attendence_type == 'IN')
                {
                    //insert new user
                    $userSignInEvent = $this->DBAccessLib->userSignInEvent($passedData);
                    if ($userSignInEvent)
                    {

                        $message = $this->settings['successMessage']['SUCCESS_EVENT_SIGN_IN'];
                        $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['GENERIC_ERROR']);
                    }  
                }
                else if($user_event_attendence_type == 'OUT')
                {
                    //insert new user
                    $userSignInEvent = $this->DBAccessLib->userSignOutEvent($passedData);
                    if ($userSignInEvent)
                    {

                        $message = $this->settings['successMessage']['SUCCESS_EVENT_SIGN_OUT'];
                            $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['GENERIC_ERROR']);
                    }  
                }
                
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }  

    //userEventNominationCRUD
    public function userEventNominationCRUD()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        
        $user_id = parent::sanitizeInput($postData->userId);
        $event_id = parent::sanitizeInput($postData->eventId);
        $user_event_attendence_type = parent::sanitizeInput($postData->userEventAttendenceType);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        $passedData = array(
                "user_id"=>$user_id, 
                "event_id"=>$event_id,
                "user_type"=>'VOL', 
                "user_acceptence_status"=>'ACCEPTED'
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $tudil_logged_in_session_id);                
            
            if ($activeUser) 
            {
                $ifUserAlreadyNominated = $this->DBAccessLib->ifUserAlreadyNominated($passedData); 
                    
                if($ifUserAlreadyNominated)
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['USER_NOMINATION_EVENT_EXIST']);
                }
                else
                {
                    $insertNewMemberWithEvent =  $this->DBAccessLib->insertNewMemberWithEventInDB($passedData);

                    if($insertNewMemberWithEvent)
                    {
                        $message = $this->settings['successMessage']['SUCCESS_EVENT_USER_NOMINATION'];
                        $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_CREATE']);
                    }
                }
                
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }  

    //userFeedbackCRUD
    public function userFeedbackCRUD()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        
        $user_id = parent::sanitizeInput($postData->userId);
        $user_feedback = parent::sanitizeInput($postData->userFeedback);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        $passedData = array(
                "user_id"=>$user_id, 
                "user_feedback"=>$user_feedback
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $tudil_logged_in_session_id);                
            
            if ($activeUser) 
            {
                $insertUserFeeback =  $this->DBAccessLib->insertUserFeeback($passedData);

                if($insertUserFeeback)
                {
                    $message = $this->settings['successMessage']['SUCCESS_USER_FEEDBACK'];
                    $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                }
                else
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_CREATE']);
                }
                
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }  

    //userAchievementCRUD
    public function userAchievementCRUD()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $event_id = parent::sanitizeInput($postData->eventId);
        $achievement_id = parent::sanitizeInput($postData->achievementId);
        $achievement_name = parent::sanitizeInput($postData->achievementName);
        $achievement_description = parent::sanitizeInput($postData->achievementDescription);
        $achievement_receaved_on = parent::sanitizeInput($postData->achievementReceavedOn);
        $operation_type = parent::sanitizeInput($postData->operationType);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        $passedData = array(
                "user_id"=>$user_id, 
                "event_id"=>$event_id,
                "achievement_id" => $achievement_id,
                "achievement_name"=>$achievement_name, 
                "achievement_description"=>$achievement_description,
                "achievement_receaved_on"=>$achievement_receaved_on,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $tudil_logged_in_session_id);                
            
            if ($activeUser) 
            {
                if($operation_type == 'create')
                {
                    //ifEventAlreadyExist
                    $ifAchievementAlreadyExist = $this->DBAccessLib->ifAchievementAlreadyExist($passedData); 
                    
                    if($ifAchievementAlreadyExist)
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['ACHIEVEMENT_EXIST']);
                    }
                    else
                    {
                        $insertNewAchievementForUser = $this->DBAccessLib->insertNewAchievementForUser($passedData);
                        if ($insertNewAchievementForUser)
                        {

                            $message = $this->settings['successMessage']['SUCCESS_ACHIEVEMENT_CREATE'];
                            $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                        }
                        else
                        {
                            $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_CREATE']);
                        }   
                    }
                }
                else if($operation_type == 'edit')
                {
                    $updateAchievementForUser = $this->DBAccessLib->updateAchievementForUser($passedData);
                    if ($updateAchievementForUser)
                    {

                        $message = $this->settings['successMessage']['SUCCESS_ACHIEVEMENT_UPDATED'];
                        $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_CREATE']);
                    }   
                }
                else if($operation_type == 'delete')
                {
                    $deleteAchievementForUser = $this->DBAccessLib->deleteAchievementForUser($passedData);
                    if ($deleteAchievementForUser)
                    {

                        $message = $this->settings['successMessage']['SUCCESS_ACHIEVEMENT_DELETED'];
                        $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_CREATE']);
                    }   
                }
                
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    } 

    //userAchievements
    public function userAchievements()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //echo json_encode($passedData);
        $passedData = array(
                "user_id"=>$user_id, 
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                
            
            if ($activeUser) 
            {
                $userEvents = $this->UtilityLib->getUserAchievements($this->DBAccessLib, $passedData); 
                $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userEvents);
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }   

    //corporateDetailsCRUD
    public function corporateDetailsCRUD()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $corporate_id = parent::sanitizeInput($postData->corporateId);
        $corporate_name = parent::sanitizeInput($postData->corporateName);
        $corporate_phone_no = parent::sanitizeInput($postData->corporatePhoneNo);
        $corporate_email = parent::sanitizeInput($postData->corporateEmail);
        $corporate_address = parent::sanitizeInput($postData->corporateAddress);
        $operation_type = parent::sanitizeInput($postData->operationType);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        $passedData = array(
                "user_id"=>$user_id, 
                "corporate_id" => $corporate_id,
                "corporate_name"=>$corporate_name,
                "corporate_phone_no" => $corporate_phone_no,
                "corporate_email"=>$corporate_email, 
                "corporate_address"=>$corporate_address,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $tudil_logged_in_session_id);                
            
            if ($activeUser) 
            {
                if($operation_type == 'create')
                {
                    $insertNewCorporateDetails = $this->DBAccessLib->insertNewCorporateDetails($passedData);
                    if ($insertNewCorporateDetails)
                    {

                        $message = $this->settings['successMessage']['SUCCESS_CORPORATE_DETAILS'];
                        $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_CORPORATE_DETAILS']);
                    }   
                }
                else if($operation_type == 'edit')
                {
                    $updateAchievementForUser = $this->DBAccessLib->updateAchievementForUser($passedData);
                    if ($updateAchievementForUser)
                    {

                        $message = $this->settings['successMessage']['SUCCESS_ACHIEVEMENT_UPDATED'];
                        $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_CREATE']);
                    }   
                }
                else if($operation_type == 'delete')
                {
                    $deleteAchievementForUser = $this->DBAccessLib->deleteAchievementForUser($passedData);
                    if ($deleteAchievementForUser)
                    {

                        $message = $this->settings['successMessage']['SUCCESS_ACHIEVEMENT_DELETED'];
                        $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_CREATE']);
                    }   
                }
                
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    } 

    //eventImagesCrud
    public function eventImagesCrud()
    {
        $responseData = null;
        //echo parent::getPostData();
        $files = $_FILES;
        $postData = $_POST;
        $user_id = parent::sanitizeInput($postData['userId']);
        $event_id = parent::sanitizeInput($postData['eventId']);
        $operation_type = parent::sanitizeInput($postData['operationType']);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        $passedData = array(
                "user_id"=>$user_id, 
                "event_id"=>$event_id,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $tudil_logged_in_session_id);                
            
            if ($activeUser) 
            {
                if($operation_type == 'create')
                {
                    if(!empty($_FILES['file']))
                    {
                        $ext = pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION);
                        $image = $event_id.'-'.time().'.'.$ext;
                        move_uploaded_file($_FILES["file"]["tmp_name"], $this->settings['imageStote']['event_photos'].$image);
                        $passedData['file_name'] = $image;

                        $insertNewEventPhoto = $this->DBAccessLib->insertNewEventPhoto($passedData);
                        if ($insertNewEventPhoto)
                        {
                            $message = $this->settings['successMessage']['SUCCESS_EVENT_IMAGE'];
                            $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                        }
                        else
                        {
                            $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_IMAGE']);
                        }
                    }
                    else
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_EVENT_IMAGE']);
                    }
                }
                else if($operation_type == 'delete')
                {
                    
                }
                
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    } 

    //eventImages
    public function eventImages()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $event_id = parent::sanitizeInput($postData->eventId);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //echo json_encode($passedData);
        $passedData = array(
                "user_id"=>$user_id, 
                "event_id" => $event_id,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                
            
            if ($activeUser) 
            {
                $userEvents = $this->UtilityLib->getEventPhotos($this->DBAccessLib, $passedData); 
                $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userEvents);
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }   

    //trackHour
    public function trackHour()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $from_date = parent::sanitizeInput($postData->fromDate);
        $to_date = parent::sanitizeInput($postData->toDate);
        $segment = parent::sanitizeInput($postData->segment);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //echo json_encode($passedData);
        $passedData = array(
                "user_id"=>$user_id, 
                "from_date" => $from_date,
                "to_date" => $to_date,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                
            
            if ($activeUser) 
            {
                if($segment == 'EVENT')
                {
                    $eventHours = $this->UtilityLib->getHoursSpentInEventsForDate($this->DBAccessLib, $passedData); 
                    $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $eventHours);
                }
                else if($segment == 'USER')
                {
                    $userHours = $this->UtilityLib->getHoursSpentBtUserForDate($this->DBAccessLib, $passedData); 
                    $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userHours);
                }
                else
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_SEGMENT']);
                }
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }   

    //userFeedbacks
    public function userFeedbacks()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //echo json_encode($passedData);
        $passedData = array(
                "user_id"=>$user_id, 
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                
            
            if ($activeUser) 
            {
                $userEvents = $this->UtilityLib->getAllUserFeedbacks($this->DBAccessLib, $passedData); 
                $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userEvents);
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    } 

    //corporateDetails
    public function corporateDetails()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //echo json_encode($passedData);
        $passedData = array(
                "user_id"=>$user_id, 
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                
            
            if ($activeUser) 
            {
                $userEvents = $this->UtilityLib->getAllCorporateDetails($this->DBAccessLib, $passedData); 
                $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userEvents);
            } 
            else 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    } 

    function __destruct() {
        //echo 'The class "', __CLASS__, '" was destroyed.<br />';
        parent::__destruct();
        unset($this->DBAccessLib);
        unset($this->UtilityLib);
        unset($this->ValidationLib);
        unset($this->MessageLib);
        unset($this->SessionLib);
        unset($this->EmailLib);
    }   
}
?>