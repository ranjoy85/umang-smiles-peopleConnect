
angular
	.module
	(
		'starter.constants', ['ionic']
	)
  
  .constant
  (
    'STRING', 
    {
        ID : 'Id',
        FIRST_NAME : 'First name',
        LAST_NAME : 'Last name',
        CANCEL : 'Cancel',
        SEARCH : 'Search',
        UPDATE_PASSWORD : 'Update password',
        UPDATE_PASSWORD_INFO : 'Provide your new password',
        GET_IT : 'Get It',
        FORGOT_YOUR_PASSWORD : 'Forgot your password ?',
        PROFILE : 'My profile',
        PROFILE_DETAILS : 'Profile details',
        EDIT_PROFILE : 'Edit profile',
        EDIT_PROFILE : 'Edit profile',
        VOLUNTEERS : 'Volunteer(s)',
        SYSTEM_EVETS_VOLUNTEERS : 'Event(s) & Volunteer(s)',
        SAVE : 'Save',
        SIGN_UP : 'Sign up',
        SIGN_IN : 'Sign in',
        SIGN_IN_INFO : 'Sign in with your registered email and password',
        EMAIL : 'Email',
        PASSWORD : 'Password',
        NAME : 'Name',
        DESCRIPTION : 'Description',
        OK : 'Ok',
        USER_DETAILS : 'User details',
        CRETE_EDIT_EVENT_INFO : 'Give a suitable name and description to event',
        DATE : 'Date',
        CREATE_EVENT : 'Create Event',
        EDIT_EVENT : 'Edit Event',
        EVENTS : 'Event(s)',
        YOUTUBE_LINK : 'Youtube Link',
        TWITTER_LINK : 'Twitter Link',
        FACEBOOK_LINK : 'facebook Link',
        WEB_LINK : 'Web Link',
        TRACKING_HOUR : 'Tracking Hours Between Dates',
        REGISTERED_USERS : 'Registered Users',
        REPORT_COMPONENT_INFO : '',
        FROM_DATE : 'From Date',
        TO_DATE : 'To Date',
        TRACKING_EVENT_HOUR : 'Tracking Hours By Event',
        TRACKING_USER_HOUR : 'Tracking Hours By User',
        VOLUNTEERS_FEEDBACK : 'Volunteers Feedback',
        CORPORATE_DETAILS : 'Corporate Details',
    }
  )

	.constant
	(
		'API_URL', 
		{
            HOST_URL								  : 'https://rollingarray.co.in/peopleConnect/api/v1/',
            IMAGE_URL : 'https://rollingarray.co.in/peopleConnect/api/fileStorage/eventPhotos/',
            
                // HOST_URL								  : 'http://localhost/PeopleConnect/api/v1/',
                // IMAGE_URL : 'http://localhost/PeopleConnect/api/fileStorage/eventPhotos/',
            //HOST_URL : 'http://10.150.22.22/iTookOff/server/',
            TEST : 'user/test/',
  			    SIGN_IN_USER : 'user/sign/in/',
            UPDATE_PASSWORD : 'user/update/password/',
            USER_DETAILS : 'user/details/',
            USER_PROFILE_UPDATE : 'user/profile/update',
            USER_SEARCH : 'user/search/',
            USER_LOGOUT : 'user/logout/',
            VERIFY_IDENTITY : 'user/verify/identity',
            USER_EVENTS_ALL : 'system/event/all/',
            CRUD_EVENT               : 'event/crud/',
            CRUD_EVENT_IMAGE    : 'event/images/crud/',
            EVENT_IMAGES    : 'event/images/',
            TRACKING_HOUR    : 'track/hour/',
            REGISTEDED_USERS    : 'registered/users/',
            CRUD_UPLOAD_USER         : 'users/upload/crud/',
            USER_FEEDBACKS : 'user/feedbacks/',
            CORPORATE_DETAILS : 'corporate/details/'
		}
	)
	.constant
	(
		'LOCAL_STORE_KEY', 
		{
            LOGGED_IN_SESSION_ID                       : 'PC_AMDIN_LOGGED_IN_SESSION_ID',
            LOGGED_IN_USER_EMAIL                       : 'PC_AMDIN_LOGGED_IN_USER_EMAIL',
            LOGGED_IN_USER_PASSWORD                    : 'PC_AMDIN_LOGGED_IN_USER_PASSWORD',
            LOGGED_IN_USER_ID                          : 'PC_AMDIN_LOGGED_IN_USER_ID',
            LOGGED_IN_USER_FIRST_NAME                  : 'PC_AMDIN_LOGGED_IN_USER_FIRST_NAME',
            LOGGED_IN_USER_LAST_NAME                   : 'PC_AMDIN_LOGGED_IN_USER_LAST_NAME',
            LOGGED_IN_USER_DAYS_IN_WEEK_STATUS         : 'PC_AMDIN_LOGGED_IN_USER_DAYS_IN_WEEK_STATUS'
		}
	)
	.constant
	(
		'PATTERN', 
		{
  			PASSWORD_PATTERN : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/,
  			NAME_PATTERN : /^[a-zA-Z0-9 \[\]()-.,;:\/_\-\n'"]{1,200}$/,
            NUMBER_PATTERN : /^[0-9]*$/,
            FLOAT_NUMBER_PATTERN : /^[0-9.]*$/,
            ALPHANUMERIC_NAME_PATTERN : /^[a-zA-Z0-9 \[\]()-.,;:\/_\-\n'"]{3,100}$/,
            DESCRIPTION_PATTERN : /^[a-zA-Z0-9 \[\]()-.,;:\/_\-\n'"]{10,400}$/,
            COMMENT_PATTERN : /^[a-zA-Z0-9 \[\]()-.,;:\/_\-\n'"]{10,500}$/,
            BOARD_NAME_PATTERN : /^[a-zA-Z ]{3,20}$/,
            VERSION_PATTERN : /^[0-9.]{1,20}$/,
            HEX_COLOR_PATTERN : /^[a-zA-Z0-9]{3,6}$/,
            PROJECT_ID_PATTERN : /^[A-Z]{3,3}-[0-9]{6,6}/,
            DATE_PATTERN : /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
            ENTITLEMENT_PATTERN : /^[0-9]{1,3}\.[0-9]{2,2}$/,
            URL_PATTERN : /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/,
		}
	)
	.constant
	(
		'LOADING_TEXT', 
		{
  			LOADING_TEXT_SIGNING_UP                             : 'SIGNING UP ... PLEASE WAIT ...',
  			LOADING_TEXT_SIGNING_IN					                    : 'SIGNING IN ... PLEASE WAIT ...',
        LOADING_TEXT_RE_SIGNING_IN                          : 'TOKEN MISMATCH ... RE SIGNING IN ... PLEASE WAIT ...',
        LOADING_TEXT_UPDATE_PASSWORD                        : 'UPDATING YOUR PASSWORD ... PLEASE WAIT ...',
        LOADING_TEXT_FETCHING_USER                          : 'FETCHING YOUR DETAILS ... PLEASE WAIT ...',
        LOADING_TEXT_ALL_SYSTEM_PROJECTS                    : 'GETTING SYSTEM PROJECTS ... PLEASE WAIT ...',
        LOADING_TEXT_CREATE_EVENT                           : 'CREATING EVENT ... PLEASE WAIT ...',
        LOADING_TEXT_EDIT_EVENT                             : 'UPDATING EVENT ... PLEASE WAIT ...',
        LOADING_TEXT_DELETE_EVENT                           : 'DELETING EVENT ... PLEASE WAIT ...',    
		}
	)
	.constant
	(
		'ALERT_TITLE', 
		{
  			ALERT_TITLE_CONFIRM_ACTION				    : '<div class="alert-title">CONFIRM YOUR ACTION !</div>',
  			ALERT_TITLE_OOPS						          : '<div class="alert-title">OOPS !</div>',
  			ALERT_TITLE_SIGN_IN_FAILED				    : '<div class="alert-title">SIGN IN FAILED !</div>',
  			ALERT_TITLE_SIGN_UP_FAILED				    : '<div class="alert-title">SIGN UP FAILED !</div>',
  			ALERT_TITLE_SIGNED_UP					        : '<div class="alert-title">SIGNED UP !</div>',
  			ALERT_TITLE_SIGNED_IN					        : '<div class="alert-title">SIGNED IN !</div>',
  			ALERT_TITLE_ACCOUNT_ACTIVATION			  : '<div class="alert-title">ACCOUNT ACTIVATION !</div>',
  			ALERT_TITLE_RESEND_ACCOUNT_ACTIVATION	: '<div class="alert-title">RESEND ACTIVATION CODE FAILED !</div>',
  			ALERT_TITLE_NO_INTERNET				  	    : '<div class="alert-title">NO INTERNET !</div>',
  			ALERT_TITLE_RESET_PASSWORD_FAILED		  : '<div class="alert-title">RESET PASSWORD FAILED !</div>',
  			ALERT_TITLE_RESET_PASSWORD				    : '<div class="alert-title">RESET PASSWORD !</div>',
  			ALERT_TITLE_UPDATE_PASSWORD_FAILED		: '<div class="alert-title">UPDATE PASSWORD FAILED !</div>',
  			ALERT_TITLE_UPDATE_PASSWORD				    : '<div class="alert-title">PASSWORD UPDATED !</div>',
            ALERT_TITLE_SIGN_OUT_FAILED           : '<div class="alert-title">SIGN OUT FAILED !</div>',
            ALERT_TITLE_PROFILE_UPDATED           : '<div class="alert-title">PROFILE UPDATED !</div>',
            ALERT_TITLE                           : '<div class="alert-title">People Connect Admin !</div>',
            ALERT_TEXT_SESSION_WRONG              : '<div class="alert-text">Something went wrong with your session. Please provide your password, we will log you in</div>',
		}
	)
	.constant
	(
		'ALERT_TEXT', 
		{
  			ALERT_TEXT_EXIT_SIGN_IN       : '<div class="alert-text">Do you want to exit from in</div>',
        ALERT_TEXT_WENT_WRONG         : '<div class="alert-text">Something went wrong. Please try again later.</div>',
        ALERT_TEXT_SESSION_WRONG      : '<div class="alert-text">Something went wrong with your session. Please out and re in</div>',
        ALERT_TEXT_WRONG_CREDS        : '<div class="alert-text">Invalid email or password</div>',
        ALERT_TEXT_SECURITY_CHECK_IN  : '<div class="alert-text">Do you want to exit from secutity check-in</div>',
        ALERT_TEXT_PASSWORD_UPDATE    : '<div class="alert-text">Do you want to exit fron updating your password</div>',
        ALERT_TEXT_EXIT_SIGN_UP       : '<div class="alert-text">Do you want to exit from signing up</div>',
        ALERT_TEXT_LOG_OUT            : '<div class="alert-text">Do you want to log out</div>',
        ALERT_TEXT_NO_INTERNET        : '<div class="alert-text">Sorry, no Internet connectivity detected. Please reconnect and try again</div>',
        ALERT_TEXT_RESTRICTED_ACCESS  : '<div class="alert-text">You are not loged in, please in log in</div>',
        ALERT_TEXT_DELETE_GENERIC     : '<div class="alert-text">Do you want to continue ?</div>',    
        ALERT_TEXT_EXIT_GENERIC       : '<div class="alert-text">Do you want to exit ?</div>',
        ALERT_TEXT_DATE_LESS       : '<div class="alert-text">To date must be less than from date !</div>',
    }
	)
    .constant
    (
        'FONT_ICON', 
        {
            MORE                                    : 'ion-android-more-vertical',
            MORE_H                                  : 'ion-more',
            LIST                                    : 'fa fa-list-alt',
            SINGLE_USER                             : 'fa fa-user',
            MULTIPLE_USERS                          : 'ion-ios-people',
            INFO                                    : 'fa fa-info-circle',
            LEFT_MENU_OPEN                          : 'fa fa-list-ul',
            REFRESH                                 : 'ion-refresh',
            CHECK                                   : 'fa fa-check',
            PLUS                                    : 'fa fa-plus',
            MINUS                                   : 'fa fa-minus',
            BACK                                    : 'ion-android-arrow-back',
            CLOSE                                   : 'ion-close',
            SAVE                                    : 'fa fa-floppy-o',
            CALENDER                                : 'fa fa-calendar-o',
            INFORMATION                             : 'ion-information-circled',
            SETTINGS                                : 'ion-settings',
            SIGN_OUT                                : 'fa fa-sign-out',
            EVENT                                   : 'ion-calendar',
            CLOCK                                   : 'ion-clock',
            SPEAK                                   : 'ion-ios-mic',
            BOOKMARK                                : 'ion-bookmark',
        }
    )
	.constant
	(
		'ALERT_BUTTON', 
		{
  			ALERT_BUTTON_YES						: 'YES',
  			ALERT_BUTTON_NO							: 'NO',
  			ALERT_BUTTON_OK							: 'OK',
		}
	)
;
