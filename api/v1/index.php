<?php

require_once __DIR__.'/vendor/autoload.php';

//settings
require_once __DIR__.'/settings.php';




//lib
require_once __DIR__.'/app/lib/BaseAPI.class.php';
require_once __DIR__.'/app/lib/BaseDatabaseAPI.class.php';
require_once __DIR__.'/app/lib/DBAccessLib.class.php';
require_once __DIR__.'/app/lib/UtilityLib.class.php';
require_once __DIR__.'/app/lib/ValidationLib.class.php';
require_once __DIR__.'/app/lib/MessageLib.class.php';
require_once __DIR__.'/app/lib/SessionLib.class.php';
require_once __DIR__.'/app/lib/EmailLib.class.php';

    
//controllers
require_once __DIR__.'/app/controllers/UserController.php';
require_once __DIR__.'/app/controllers/EventController.php';

$userController = new PeopleConnect\UserController($settings);
$eventController = new PeopleConnect\EventController($settings);

switch($_GET['route']) 
{
    case 'signUp':
    {
        $userController->signUp();
    }
    break;

    case 'thirdPartySignUp':
    {
        $userController->thirdPartySignUp();
    }
    break;
    
    case 'activateUserAccount':
    {
        $userController->activateUserAccount();
    }
    break;
    case 'resendActivationCode':
    {
        $userController->resendActivationCode();
    }
    break;
    case 'generatePasswordResetCode':
    {
        $userController->generatePasswordResetCode();
    }
    break;

    case 'signIn':
    {
        $userController->signIn();
    }
    break;

    case 'updateUserProfile':
    {
        $userController->updateUserProfile();
    }
    break;

    case 'pullSearchableUserDetailsByEmail':
    {
        $userController->pullSearchableUserDetailsByEmail();
    }
    break;

    case 'verifyIdentity':
    {
        $userController->verifyIdentity();
    }
    break;
    
    case 'updatePassword':
    {
        $userController->updatePassword();
    }
    break;

    case 'getSignedInUserDetails':
    {
        $userController->getSignedInUserDetails();
    }
    break;

    case 'logout':
    {
        $userController->logout();
    }
    break;

    case 'userBirthDayWish':
    {
        $userController->userBirthDayWish();
    }
    break;

    

    case 'registeredUsers':
    {
        $userController->registeredUsers();
    }
    break;

    case 'usersUploadCRUD':
    {
        $userController->usersUploadCRUD();
    }
    break;

    

    case 'eventCrud':
    {
        $eventController->eventCrud();
    }
    break;

    case 'useEvents':
    {
        $eventController->useEvents();
    }
    break; 

    case 'allEvents':
    {
        $eventController->allEvents();
    }
    break; 

    case 'eventDetails':
    {
        $eventController->eventDetails();
    }
    break;
    
    case 'userEventAttendenceCRUD':
    {
        $eventController->userEventAttendenceCRUD();
    }
    break;    

    case 'userEventNominationCRUD':
    {
        $eventController->userEventNominationCRUD();
    }
    break;    

    case 'userFeedbackCRUD':
    {
        $eventController->userFeedbackCRUD();
    }
    break;   

    case 'userAchievementCRUD':
    {
        $eventController->userAchievementCRUD();
    }
    break; 

    case 'userAchievements':
    {
        $eventController->userAchievements();
    }
    break; 

    case 'corporateDetailsCRUD':
    {
        $eventController->corporateDetailsCRUD();
    }
    break; 

    case 'eventImagesCrud':
    {
        $eventController->eventImagesCrud();
    }
    break; 

    case 'eventImages':
    {
        $eventController->eventImages();
    }
    break;  

    case 'trackHour':
    {
        $eventController->trackHour();
    }
    break;  

    case 'userFeedbacks':
    {
        $eventController->userFeedbacks();
    }
    break;   

    case 'corporateDetails':
    {
        $eventController->corporateDetails();
    }
    break;       

    

    default:
        //
} 

?>