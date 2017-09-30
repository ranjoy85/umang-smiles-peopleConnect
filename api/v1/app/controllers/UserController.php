<?php

namespace PeopleConnect;

class UserController extends BaseAPI
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

    public function userBirthDayWish()
    {
        $this->EmailLib->birthdayWish('Ranjoy Sen', 'ranjoy.sen85@gmail.com');
    }

    public function signUp()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        
        $user_email = parent::sanitizeInput($postData->userEmail);
        $user_id = $this->UtilityLib->generateUserId($user_email);
        $third_party_user_id = '0';
        $user_first_name = parent::sanitizeInput($postData->userFirstName);
        $user_last_name = parent::sanitizeInput($postData->userLastName);
        $user_dob = parent::sanitizeInput($postData->userDob);
        $user_password = parent::sanitizeInput($postData->userPassword);
        $user_status = "INACTIVE";
        $user_type = "NATIVE";
        $user_verification_code = $this->UtilityLib->generateVerificationCode();

        $passedData = array(
                "user_id"=>$user_id, 
                "third_party_user_id"=>$third_party_user_id,
                "user_email"=>$user_email,
                "user_first_name"=>$user_first_name, 
                "user_last_name"=>$user_last_name,
                "user_password"=>$user_password,
                "user_dob"=>$user_dob,
                "user_status"=>$user_status,
                "user_type"=>$user_type,
                "user_verification_code" => $user_verification_code
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $userPresent = $this->DBAccessLib->ifExistingUser($user_email);
            if ($userPresent) 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['USER_ALREADY_EXIST']);
            } 
            else 
            {
                //encript password
                $hashPassword = $this->UtilityLib->hasedString($passedData["user_password"]);
                $passedData["user_password"] = $hashPassword;

                //insert new user
                $userInserted = $this->DBAccessLib->insertNewUserInDB($passedData);
                 if($userInserted)
                {
                    //send email
                    $user_full_name = $user_first_name." ".$user_last_name;
                    $this->EmailLib->sendSignUpVerificationCode($user_full_name, $user_verification_code, $user_email);

                    $responseData = $this->MessageLib->successMessageFormat($this->settings['successMessage']['ACTIVATE_ACCOUNT']);
                }
                else
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['USER_NOT_CREATED']);
                }       
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }  

    //thirdPartySignUp
    public function thirdPartySignUp()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        
        $user_email = parent::sanitizeInput($postData->userEmail);
        $user_id = $this->UtilityLib->generateUserId($user_email);
        $third_party_user_id = parent::sanitizeInput($postData->thirdPartyUserId);
        $user_first_name = parent::sanitizeInput($postData->userFirstName);
        $user_last_name = parent::sanitizeInput($postData->userLastName);
        $user_password = parent::sanitizeInput($postData->userPassword);
        $user_status = "ACTIVE";
        $user_dob = "1970-01-01";
        $user_type = parent::sanitizeInput($postData->userType);
        $user_verification_code = "VERIFIED";

        $passedData = array(
                "user_id"=>$user_id, 
                "third_party_user_id" => $third_party_user_id,
                "user_email"=>$user_email,
                "user_first_name"=>$user_first_name, 
                "user_last_name"=>$user_last_name,
                "user_dob" => $user_dob,
                "user_password"=>$user_password,
                "user_status"=>$user_status,
                "user_type"=>$user_type,
                "user_verification_code" => $user_verification_code
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $userPresent = $this->DBAccessLib->ifExistingUser($user_email);
            if ($userPresent) 
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['USER_ALREADY_EXIST']);
            } 
            else 
            {
                //encript password
                $hashPassword = $this->UtilityLib->hasedString($passedData["user_password"]);
                $passedData["user_password"] = $hashPassword;

                //insert new user
                $userInserted = $this->DBAccessLib->insertNewUserInDB($passedData);
                 if($userInserted)
                {
                    $responseData = $this->MessageLib->successMessageFormat($this->settings['successMessage']['ACCOUNT_ACTIVATED']);

                    //send email
                    $getUserDetailsByEmail = $this->UtilityLib->getUserDetailsByEmail($this->DBAccessLib, $passedData); ;
                    
                    $user_full_name = $getUserDetailsByEmail['userFirstName']." ".$getUserDetailsByEmail['userLastName'];
                    $this->EmailLib->signUpSuccess($user_full_name, $user_email);
                }
                else
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['USER_NOT_CREATED']);
                }       
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }   

    //activateUserAccount
    public function activateUserAccount()
    {
        //passed data
        $responseData = null;
    
        //passed data
        $postData = parent::getPostData();
        $user_email = parent::sanitizeInput($postData->userEmail);
        $user_verification_code = parent::sanitizeInput($postData->userVerificationCode);

        $passedData = array(
            "user_email"=>$user_email,
            "user_verification_code"=>$user_verification_code
        );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            //if Verification Code Valid
            $ifVerificationCodeValid = $this->DBAccessLib->getIfVerificationCodeValid($passedData);
            if ($ifVerificationCodeValid) 
            {
                //is User Activated
                $isUserActivated = $this->DBAccessLib->activateUserAccount($passedData);
                    
                if ($isUserActivated) 
                {
                    $responseData = $this->MessageLib->successMessageFormat($this->settings['successMessage']['ACCOUNT_ACTIVATED']);

                    //send email
                    $getUserDetailsByEmail = $this->UtilityLib->getUserDetailsByEmail($this->DBAccessLib, $passedData); ;
                    $user_full_name = $getUserDetailsByEmail['userFirstName']." ".$getUserDetailsByEmail['userLastName'];
                    
                    //user activated email
                    $this->EmailLib->signUpSuccess($user_full_name, $user_email); 
                }
                else
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['ACCOUNT_NOT_ACTIVATED']);
                }
            }   
            else
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['VERIFICATION_CODE_NO_MATCH']);
            }  
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }
    
        echo json_encode($responseData);
    }

    //resendActivationCode
    public function resendActivationCode()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_email = parent::sanitizeInput($postData->userEmail);
        $user_status = "INACTIVE";//
        $user_verification_code = $this->UtilityLib->generateVerificationCode();

        $passedData = array(
                "user_email"=>$user_email,
                "user_status"=>$user_status,
                "user_verification_code"=>$user_verification_code,
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $userPresent = $this->DBAccessLib->ifExistingUser($user_email);
            if ($userPresent) 
            {
                //ifUserInactive
                $ifUserInactive = $this->DBAccessLib->getIfUserInactive($passedData);
                if($ifUserInactive)
                {
                    //ifUserAccountActivationCodeRegenerated
                    $ifUserAccountActivationCodeRegenerated = $this->DBAccessLib->regenerateUserAccountActivationCode($passedData);
                    
                    if ($ifUserAccountActivationCodeRegenerated) 
                    {
                        $responseData = $this->MessageLib->successMessageFormat($this->settings['successMessage']['VERIFICATION_CODE_REGENERATED']);
                        
                        //send email
                        //user activated email
                        $getUserDetailsByEmail = $this->UtilityLib->getUserDetailsByEmail($this->DBAccessLib, $passedData); ;
                        $user_full_name = $getUserDetailsByEmail['userFirstName']." ".$getUserDetailsByEmail['userLastName'];
                        $this->EmailLib->sendSignUpVerificationCode($user_full_name, $user_verification_code, $user_email);                    
                    } 
                    else 
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_VERIFICATION_CODE']);
                    } 
                }
                else
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['ACCOUNT_ALREADY_ACTIVE']);  
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

    //generatePasswordResetCode
    public function generatePasswordResetCode()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_email = parent::sanitizeInput($postData->userEmail);
        $user_password_reset_code = $this->UtilityLib->generatePasswordResetCode();

        $passedData = array(
                "user_email"=>$user_email,
                "user_password_reset_code"=>$user_password_reset_code,
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $userPresent = $this->DBAccessLib->ifExistingUser($user_email);
            if ($userPresent) 
            {
                $userPasswordRestCodeGenerated = $this->DBAccessLib->generateUserPasswordResetCode($passedData);
                if ($userPasswordRestCodeGenerated) 
                {
                    $responseData = $this->MessageLib->successMessageFormat($this->settings['successMessage']['PASSWORD_RESET_CODE_GENERATED']);
                    
                    //send email
                    //send password reset code email
                    $getUserDetailsByEmail = $this->UtilityLib->getUserDetailsByEmail($this->DBAccessLib, $passedData); ;
                    $user_full_name = $getUserDetailsByEmail['userFirstName']." ".$getUserDetailsByEmail['userLastName'];
                    $this->EmailLib->sendPasswordResetCode($user_full_name, $user_password_reset_code, $user_email);               
                } 
                else 
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_PASSWORD_RESET_CODE']);  
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

    //updatePassword
    public function updatePassword()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_email = parent::sanitizeInput($postData->userEmail);
        $user_password_reset_code = parent::sanitizeInput($postData->userPasswordResetCode);
        $user_password = parent::sanitizeInput($postData->userPassword);

        $passedData = array(
                "user_email"=>$user_email,
                "user_password_reset_code"=>$user_password_reset_code,
                "user_password"=>$user_password
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $userPresent = $this->DBAccessLib->ifExistingUser($user_email);
            if ($userPresent) 
            {
                //ifPasswordResetCodeExist
                $ifPasswordResetCodeExist = $this->DBAccessLib->ifPasswordResetCodeExist($passedData);
                if ($ifPasswordResetCodeExist) 
                {
                    //encript password
                    $hashPassword = $this->UtilityLib->hasedString($passedData["user_password"]);
                    $passedData["user_password"] = $hashPassword;

                    //isUserPasswordUpdated
                    $isUserPasswordUpdated = $this->DBAccessLib->updatePassword($passedData); 
                    if($isUserPasswordUpdated)
                    {
                        $responseData = $this->MessageLib->successMessageFormat($this->settings['successMessage']['PASSWORD_UPDATED']);                    
                    } 
                    else 
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_PASSWORD_UPDATE']);  
                    }               
                } 
                else 
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['PASSWORD_RESET_CODE_NOT_FOUND']);  
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

    //signIn
    public function signIn()
    {
        $responseData = array();
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_email = parent::sanitizeInput($postData->userEmail);
        $user_password = parent::sanitizeInput($postData->userPassword);
        $user_login_type = parent::sanitizeInput($postData->userLoginType);

        $passedData = array(
                "user_email"=>$user_email,
                "user_password"=>$user_password,
                "user_login_type"=>$user_login_type
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $userPresent = $this->DBAccessLib->ifExistingUser($user_email);
            if ($userPresent) 
            {
                $hashPassword = $this->UtilityLib->hasedString($passedData["user_password"]);
                $passedData["user_password"] = $hashPassword;

                $signInUser = $this->DBAccessLib->getSignInUser($passedData);
                if ($signInUser) 
                {
                    //sessionServer, insert new session 
                    $returnSessionId = $this->SessionLib->insertSession($this->DBAccessLib, $this->UtilityLib, $signInUser['user_id']);                
                    if($returnSessionId == "NO_SESSION")
                    {
                        $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['INVALID_SESSION']);
                    }
                    else
                    {
                        $responseData['success'] = true;
                        if($user_login_type == 'IN_APP_LOGIN')
                        {
                            $responseData['message'] = $this->settings['successMessage']['SUCCESS_IN_APP_LOGIN']; 
                        }
                        else if($user_login_type == 'FRESH_LOGIN')
                        {
                            $responseData['message'] = $this->settings['successMessage']['SUCCESS_LOGIN']; 
                        }
                        $responseData['userId'] = $signInUser['user_id'];
                        $responseData['loggedInSessionId']  = $returnSessionId;   
                    }
                } 
                else 
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_FOUND']);
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

    //getSignedInUserDetails
    public function getSignedInUserDetails()
    {
        $responseData = array();
        
        //get post gata
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //
        $passedData = array(
                "user_id"=>$user_id,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                

            //activeUser
            if($activeUser)
            {
                //get user details
                $userDetailsByUserId = $this->UtilityLib->getUserDetailsByUserId($this->DBAccessLib, $passedData); 
                $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userDetailsByUserId);
            }
            else
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['INVALID_SESSION']);
            }
        }
        else
        {
            $responseData = $this->MessageLib->errorMessageFormat($validator['error']);
        }

        echo json_encode($responseData);
    }

    //updateUserProfile
    public function updateUserProfile()
    {
        $responseData = null;
        //echo parent::getPostData();
        $postData = parent::getPostData();
        $user_email = parent::sanitizeInput($postData->userEmail);
        $user_id = parent::sanitizeInput($postData->userId);
        $user_first_name = parent::sanitizeInput($postData->userFirstName);
        $user_last_name = parent::sanitizeInput($postData->userLastName);
        $user_dob = parent::sanitizeInput($postData->userDob);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        $passedData = array(
                "user_id"=>$user_id, 
                "user_email"=>$user_email,
                "user_first_name"=>$user_first_name, 
                "user_last_name"=>$user_last_name,
                "user_dob"=>$user_dob,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            // is user present
            $userPresent = $this->DBAccessLib->ifExistingUser($user_email);
            if ($userPresent) 
            {
                //encript password
                $hashPassword = $this->UtilityLib->hasedString($passedData["user_password"]);
                $passedData["user_password"] = $hashPassword;

                //insert new user
                $userInserted = $this->DBAccessLib->updatedUserProfileInDB($passedData);
                if ($userInserted)
                {
                    $message = $this->settings['successMessage']['SUCCESS_USER_UPDATE'];
                    $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'message', $message);
                }
                else
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USER_UPDATE']);
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

    //registeredUsers
    public function registeredUsers()
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
                $userEvents = $this->UtilityLib->getAllRegisteredUsers($this->DBAccessLib, $passedData); 
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

    //usersUploadCRUD
    public function usersUploadCRUD()
    {
        $responseData = null;
        $userData = null;
        //echo parent::getPostData();
        $files = $_FILES;
        $postData = $_POST;
        $user_id = parent::sanitizeInput($postData['userId']);
        $operation_type = parent::sanitizeInput($postData['operationType']);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        $passedData = array(
                "user_id"=>$user_id, 
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
                if(!empty($_FILES['file']))
                {
                    $ext = pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION);
                    $filename = $_FILES["file"]["tmp_name"];
                    if ($_FILES["file"]["size"] > 0)
                    {
                        $row = 1;
                        if (($handle = fopen($filename, "r")) !== FALSE) 
                        {
                            while (($fileData = fgetcsv($handle, 1000, ",")) !== FALSE) 
                            {
                                $row++;

                                $reg_third_party_user_id = '0';
                                $reg_user_first_name = parent::sanitizeInput($fileData[0]);
                                $reg_user_last_name = parent::sanitizeInput($fileData[1]);
                                $reg_user_email = parent::sanitizeInput($fileData[2]);
                                $reg_user_dob = parent::sanitizeInput($fileData[3]);
                                $reg_user_id = $this->UtilityLib->generateUserId($reg_user_email);
                                $reg_user_password = parent::sanitizeInput('login@123');
                                $reg_user_status = "ACTIVE";
                                $reg_user_type = "NATIVE";
                                $reg_user_verification_code = 'VERIFIED';

                                $passedData = array(
                                        "user_id"=>$reg_user_id, 
                                        "third_party_user_id"=>$reg_third_party_user_id,
                                        "user_email"=>$reg_user_email,
                                        "user_first_name"=>$reg_user_first_name, 
                                        "user_last_name"=>$reg_user_last_name,
                                        "user_dob"=>$reg_user_dob,
                                        "user_password"=>$reg_user_password,
                                        "user_status"=>$reg_user_status,
                                        "user_type"=>$reg_user_type,
                                        "user_verification_code" => $reg_user_verification_code
                                    );

                                $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

                                //if input validated
                                if($validator['success'])
                                {
                                    // is user present
                                    $userPresent = $this->DBAccessLib->ifExistingUser($reg_user_email);
                                    if ($userPresent) 
                                    {
                                        $userData[] = $reg_user_email.' '.$this->settings['errorMessage']['ALREADY_REGISTEDED'];
                                    } 
                                    else 
                                    {
                                        //encript password
                                        $hashPassword = $this->UtilityLib->hasedString($passedData["user_password"]);
                                        $passedData["user_password"] = $hashPassword;

                                        //insert new user
                                        $userInserted = $this->DBAccessLib->insertNewUserInDB($passedData);
                                         if($userInserted)
                                        {
                                            $userData[] = $reg_user_email.' '.$this->settings['errorMessage']['REGISTERED'];
                                        }
                                        else
                                        {
                                            $userData[] = $reg_user_email.' '.$this->settings['errorMessage']['NO_REGISTERED'];
                                        }       
                                    }
                                }
                                else
                                {
                                    $userData[] = $reg_user_email.' '.$this->settings['errorMessage']['FAILED_VALIDATION'];
                                }
                                
                            }
                            fclose($handle);
                        }
                    }
                    
                    $responseData = $this->SessionLib->sendBackToClient($this->DBAccessLib, $this->UtilityLib, $user_id, 'data', $userData);

                }
                else
                {
                    $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['NO_USERS_FILE']);
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

    //logout
    public function logout()
    {
        $responseData = array();
        
        //get post gata
        $postData = parent::getPostData();
        $user_id = parent::sanitizeInput($postData->userId);
        $logged_in_session_id = $this->SessionLib->getAuthorizationSessionObject($this->UtilityLib);

        //
        $passedData = array(
                "user_id"=>$user_id,
                "logged_in_session_id"=>$logged_in_session_id
            );

        $validator = $this->UtilityLib->dataValidator($this->ValidationLib, $this->MessageLib, $passedData);

        //if input validated
        if($validator['success'])
        {
            $activeUser = $this->SessionLib->checkSessionUser($this->DBAccessLib, $user_id, $logged_in_session_id);                

            //activeUser
            if($activeUser)
            {
                //get user details
                $responseData = $this->SessionLib->destroySessionUser ($this->DBAccessLib, $user_id); 
            }
            else
            {
                $responseData = $this->MessageLib->errorMessageFormat($this->settings['errorMessage']['INVALID_SESSION']);
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