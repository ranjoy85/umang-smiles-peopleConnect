
angular
	.module
	(
		'starter.constants', ['ionic']
	)
 
	.constant
	(
		'API_URL', 
		{
        // HOST_URL								  : 'http://localhost/PeopleConnect/api/v1/',
        // IMAGE_URL : 'http://localhost/PeopleConnect/api/fileStorage/eventPhotos/',
        HOST_URL								  : 'https://rollingarray.co.in/peopleConnect/api/v1/',
        IMAGE_URL : 'https://rollingarray.co.in/peopleConnect/api/fileStorage/eventPhotos/',
        TEST									    : 'user/test/',
  			SIGN_UP_USER							: 'user/sign/up/',
        THIRD_PARTY_USER_SIGN_UP  : 'user/thirdParty/sign/up/',
  			SIGN_IN_USER							: 'user/sign/in/',
  			ACTIVATE_USER							: 'user/activate/',
  			RESEND_USER_ACTIVATION_CODE				: 'user/activate/code/resend/',
  			RESET_PASSWORD_CODE						: 'user/password/reset/code/',
  			UPDATE_PASSWORD							: 'user/update/password/',
  			USER_DETAILS							: 'user/details/',
        USER_LOGOUT              : 'user/logout/',
        USER_PROFILE_UPDATE      : 'user/profile/update',

        //trips
        USER_EVENTS               : 'user/events/',
        CRUD_EVENT               : 'user/event/crud/',
        EVENT_DETAILS             : 'event/details',
        USER_EVENT_ATTENDENCE     : 'user/event/attendence/crud/',
        SYSTEM_EVENTS               : 'system/event/all/',
        USER_EVENT_NOMINATION     : 'user/event/nomination/crud/',
        VOLUNTEER_SPEAK     : 'user/feedback/crud/',
        CRUD_USER_ACHIEVEMENT     : 'user/achievement/crud/',
        USER_ACHIEVEMENTS     : 'user/achievements/',
        CRUD_CORPORATE_DETAILS     : 'corporate/details/crud/',
        EVENT_IMAGES    : 'event/images/'
		}
	)
	.constant
	(
		'LOCAL_STORE_KEY', 
		{
  			LOGGED_IN_SESSION_ID					: 'PC_LOGGED_IN_SESSION_ID',
  			LOGGED_IN_USER_EMAIL					: 'PC_LOGGED_IN_USER_EMAIL',
  			LOGGED_IN_USER_ID						: 'PC_LOGGED_IN_USER_ID',
        LOGGED_IN_USER_FIRST_NAME           : 'PC_LOGGED_IN_USER_FIRST_NAME',
        LOGGED_IN_USER_LAST_NAME           : 'PC_LOGGED_IN_USER_LAST_NAME',
        LOGGED_IN_USER_LAST_NAME            : 'PC_LOGGED_IN_USER_LAST_NAME',
        LOGGED_IN_USER_PUSH_STATUS           : 'PC_LOGGED_IN_USER_PUSH_STATUS',
        LOGGED_IN_USER_TYPE           : 'PC_LOGGED_IN_USER_TYPE',
        LOGGED_IN_USER_THIRD_PARTY_USER_ID           : 'PC_LOGGED_IN_USER_THIRD_PARTY_USER_ID',
		}
	)
	.constant
	(
		'PATTERN', 
		{
        PASSWORD_PATTERN						      : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/,
        DESCRIPTION_PATTERN               : /^[a-zA-Z0-9 \[\]()-.,;:!&@#%$^\/_\-\n'"]{5,400}$/,
        NAME_PATTERN							        : /([a-zA-Z]{3,30}\s*)+/,
        VERIFICATION_CODE_PATTERN				  : /([a-zA-Z0-9]{8,30}\s*)+/,
        RESET_PASSWORD_CODE_PATTERN				: /^[A-Za-z\d]{4}$/,
        PHONE_NO_PATTERN				          : /\+?\d[\d -]{8,12}\d/
		}
	)
	.constant
	(
		'LOADING_TEXT', 
		{
  			LOADING_TEXT_SIGNING_UP					: 'SIGNING UP ... PLEASE WAIT ...',
  			LOADING_TEXT_SIGNING_IN					: 'SIGNING IN ... PLEASE WAIT ...',
  			LOADING_TEXT_ACTIVATIONG_YOUR_ACCOUNT	: 'ACTIVATING YOUR ACCOUNT ... PLEASE WAIT ...',
  			LOADING_TEXT_SENDING_ACTIVATION_CODE	: 'SENDING ACTIVATION CODE ... PLEASE WAIT ...',
  			LOADING_TEXT_SENDING_RESET_PASSWORD_CODE: 'SENDING RESET PASSWORD CODE ... PLEASE WAIT ...',
  			LOADING_TEXT_UPDATE_PASSWORD			: 'UPDATING YOUR PASSWORD ... PLEASE WAIT ...',
        LOADING_TEXT_FETCHING_USER         : 'FETCHING DETAILS ... PLEASE WAIT ...',
        LOADING_TEXT_LOG_OUT_USER         : 'LOGGING YOU OUT ... PLEASE WAIT ...',
        LOADING_TEXT_UPDATE_PROFILE         : 'UPDATING YOUR PROFILE ... PLEASE WAIT ...',
        
        LOADING_TEXT_UPDATE_DETAILS         : 'UPDATING DETAILS ... PLEASE WAIT ...',
		}
	)
	.constant
	(
		'ALERT_TITLE', 
		{
  			ALERT_TITLE_CONFIRM_ACTION				: '<div class="alert-title">CONFIRM YOUR ACTION !</div>',
  			ALERT_TITLE_OOPS						: '<div class="alert-title">OOPS !</div>',
  			ALERT_TITLE_SIGN_IN_FAILED				: '<div class="alert-title">SIGN IN FAILED !</div>',
  			ALERT_TITLE_SIGN_UP_FAILED				: '<div class="alert-title">SIGN UP FAILED !</div>',
  			ALERT_TITLE_SIGNED_UP					: '<div class="alert-title">SIGNED UP !</div>',
  			ALERT_TITLE_SIGNED_IN					: '<div class="alert-title">SIGNED IN !</div>',
  			ALERT_TITLE_ACCOUNT_ACTIVATION			: '<div class="alert-title">ACCOUNT ACTIVATION !</div>',
  			ALERT_TITLE_RESEND_ACCOUNT_ACTIVATION	: '<div class="alert-title">RESEND ACTIVATION CODE FAILED !</div>',
  			ALERT_TITLE_NO_INTERNET					: '<div class="alert-title">NO INTERNET !</div>',
  			ALERT_TITLE_RESET_PASSWORD_FAILED		: '<div class="alert-title">RESET PASSWORD FAILED !</div>',
  			ALERT_TITLE_RESET_PASSWORD				: '<div class="alert-title">RESET PASSWORD !</div>',
  			ALERT_TITLE_UPDATE_PASSWORD_FAILED		: '<div class="alert-title">UPDATE PASSWORD FAILED !</div>',
  			ALERT_TITLE_UPDATE_PASSWORD				: '<div class="alert-title">PASSWORD UPDATED !</div>',
        ALERT_TITLE_SIGN_OUT_FAILED       : '<div class="alert-title">SIGN OUT FAILED !</div>',
        ALERT_TITLE_PROFILE_UPDATED         : '<div class="alert-title">PROFILE UPDATED !</div>',
        ALERT_TITLE_TRIPS        : '<div class="alert-title">PEOPLE CONNECT !</div>',
        ALERT_TITLE               : 'People Connect !'
		}
	)
	.constant
	(
		'ALERT_TEXT', 
		{
        ALERT_TEXT_LEAVE_OPERATION      : '<div class="alert-text">Do you want to leave ? Your data will be lost if not saved</div>',
  			ALERT_TEXT_EXIT_SIGN_IN					: '<div class="alert-text">Do you want to exit from in</div>',
  			ALERT_TEXT_WENT_WRONG					: '<div class="alert-text">Something went wrong. Please try again later.</div>',
        ALERT_TEXT_SESSION_WRONG         : '<div class="alert-text">Something went wrong with your session. Please provide your password, we will log you in</div>',
  			ALERT_TEXT_WRONG_CREDS					: '<div class="alert-text">Invalid email or password</div>',
  			ALERT_TEXT_EMAIL_REQUIRED				: '<div class="alert-text">Email required for resending activation code</div>',
  			ALERT_TEXT_EXIT_SIGN_UP					: '<div class="alert-text">Do you want to exit</div>',
  			ALERT_TEXT_EXIT_USER_ACTIVATION			: '<div class="alert-text">Do you want to exit from user activation</div>',
  			ALERT_TEXT_PASS_USER_ACTIVATION			: '<div class="alert-text">Your account has been activated, please in</div>',
  			ALERT_TEXT_NO_INTERNET					: '<div class="alert-text">Sorry, no Internet connectivity detected. Please reconnect and try again</div>',
  			ALERT_TEXT_PASSWORD_RESET				: '<div class="alert-text">Do you want to exit from resetting your password</div>',
  			ALERT_TEXT_PASSWORD_UPDATE				: '<div class="alert-text">Do you want to exit from updating your password</div>',
  			ALERT_TEXT_RESTRICTED_ACCESS			: '<div class="alert-text">You are not in, please in</div>',
  			ALERT_TEXT_LOG_OUT						: '<div class="alert-text">Do you want to log out</div>',
        ALERT_TEXT_EXIT_CREATE_TRIP         : '<div class="alert-text">Do you want to exit from creating trip</div>',
        ALERT_TEXT_EXIT_ADD_TRIP_MEMBER         : '<div class="alert-text">Do you want to exit from adding a trip member</div>',
        ALERT_TEXT_EXIT_BECOME_TRIP_MEMBER         : '<div class="alert-text">Do you want to become a member of this trip</div>',
        ALERT_TEXT_REJECT_TRIP_APPROVAL         : '<div class="alert-text">Are you sure you do not want</div>',
        ALERT_TEXT_JOIN_TRIP_APPROVAL         : '<div class="alert-text">Are you sure you want</div>',
        ALERT_TEXT_APPROVAL         : '<div class="alert-text">to be a part of your trip</div>',
        ALERT_TEXT_REJECT_TRIP_EXPENCE         : '<div class="alert-text">Are you sure you want to reject this expense added by</div>',
        ALERT_TEXT_APPROVE_TRIP_EXPENCE         : '<div class="alert-text">Are you sure you want to approve this expense added by</div>',
        ALERT_TEXT_DELETE_MEMBER         : '<div class="alert-text">Are you sure you want to delete this member from trip, make sure settlement has been done before you delete</div>',
        ALERT_TEXT_SETTLE_EXPENCE         : '<div class="alert-text">Select mode of settlement</div>',
        ALERT_TEXT_ADD_EXPENSE         : '<div class="alert-text">Select mode of transaction</div>',
        ALERT_TEXT_FINA_SETTLEMENT         : '<div class="alert-text">Select mode of final settlement</div>',
        ALERT_TEXT_INDIDULAL_EXPENCE         : '<div class="alert-text">Indidual expenses will not be considered</div>',
        ALERT_TEXT_PERFECT_DEVISIBLE_EXPENCE         : '<div class="alert-text">Amount is not perfectly devisable among all the members, you might need to modify the amount</div>',
        ALERT_TEXT_DELETE_EXPENCE         : '<div class="alert-text">Only ADMIN can delete an expense</div>',
        ALERT_TEXT_DELETE_EXPENCE_ADMIN         : '<div class="alert-text">Are you sure you want to delete this expense</div>',
        ALERT_TEXT_SETTLE_EXPENCE_ADMIN         : '<div class="alert-text">Only ADMIN can do a settlement</div>',
        ALERT_TEXT_MODEFY_TRIP_ADMIN         : '<div class="alert-text">Only ADMIN can do modifications</div>',
        ALERT_TEXT_DELETE_TRIP_ADMIN         : '<div class="alert-text">Only ADMIN can delete a trip</div>',
        ALERT_TEXT_DELETE_TRIP_CONFIRM_ADMIN         : '<div class="alert-text">Are you sure you want to delete this trip</div>',
        ALERT_TEXT_ADD_DELETE_MEMBER_ADMIN         : '<div class="alert-text">Only ADMIN can add/delete members in a trip</div>',
        ALERT_TEXT_DELETE_TRIP_ADMIN         : '<div class="alert-text">You are the ADMIN of this trip, you can not delete yourself</div>',
        ALERT_TEXT_CLOSE_TRIP         : '<div class="alert-text">Only ADMIN can close a trip</div>',
        ALERT_TEXT_CLOSE_TRIP_CONFIRM_ADMIN         : '<div class="alert-text">Are you sure you want to close this trip, you will not be able to do any modification once you close</div>',
        ALERT_TEXT_REOPEN_TRIP         : '<div class="alert-text">Only ADMIN can reopen a trip</div>',
        ALERT_TEXT_REOPEN_TRIP_CONFIRM_ADMIN         : '<div class="alert-text">Are you sure you want to reopen this trip</div>',
		    ALERT_TEXT_SOCIAL_SHARE_ERROR         : '<div class="alert-text">Feedback could not be shared. Please try again later.</div>',
        ALERT_TEXT_SOCIAL_SHARE_SUCCESS         : '<div class="alert-text">Thank you for your feedback !</div>',
        ALERT_TEXT_MODEFY_PROFILE_NOT_ALLOWED : '<div class="alert-text">Please update your profile in facebook !</div>',
        ALERT_TEXT_NOT_RIGHT_EVENT : '<div class="alert-text">THis is not the right event ! !</div>',
        ALERT_TEXT_ALREADY_SIGNED_IN : '<div class="alert-text">You are already signed in to the event ! !</div>',
        ALERT_TEXT_ALREADY_SIGNED_OUT : '<div class="alert-text">You are already signed out from the event ! !</div>',
        ALERT_TEXT_DELETE_GENERIC : '<div class="alert-text">Are you sure you want to delete</div>',
        ALERT_TEXT_URL_NOT_FOUND : '<div class="alert-text">Media url for found ! !</div>',
        ALERT_TEXT_SIGN_IN_OUT : '<div class="alert-text">Event Sign In and Out applicable to only mobile apps ! !</div>',
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
  .constant
    (
        'FONT_ICON', 
        {
            MORE                                    : 'ion-android-more-vertical',
            MORE_H                                  : 'ion-more',
            LIST                                    : 'fa fa-list-alt',
            SINGLE_USER                             : 'fa fa-user',
            INFO                                    : 'fa fa-info-circle',
            LEFT_MENU_OPEN                          : 'fa fa-list-ul',
            REFRESH                                 : 'ion-refresh',
            CHECK                                   : 'fa fa-check',
            PLUS                                    : 'fa fa-plus',
            MINUS                                   : 'fa fa-minus',
            RIGHT                                   : 'fa fa-check',
            BACK                                    : 'ion-android-arrow-back',
            CLOSE                                   : 'ion-close',
            SAVE                                    : 'fa fa-floppy-o',
            SETTINGS                                : 'ion-settings',
            SIGN_OUT                                : 'ion-log-out',
            SIGN_IN                                 : 'ion-log-in',
            RIGHT_CIRCLE                            : 'ion-checkmark-circled',
            WRONG_CIRCLE                            : 'ion-android-alert',
            RIGHT_ARROW                             : 'fa fa-angle-right',
            LEFT_ARROW                              : 'fa fa-angle-left',
            CIRCLE                                  : 'fa fa-circle',
            DOWNLOAD                                : 'fa fa-download',
            EDIT                                    : 'ion-edit',
            DELETE                                  : 'ion-minus-circled',
            ACHIEVEMENT                             : 'ion-ribbon-a',
            EVENT                                   : 'ion-calendar',
            VOLUNTEER                               : 'ion-ios-people',
            SPEAK                                   : 'ion-ios-mic',
            BOOKMARK                                : 'ion-bookmark',
            IMAGES                                  : 'ion-images',
            FB                                      : 'ion-social-facebook',
            TW                                      : 'ion-social-twitter',
            YT                                      : 'ion-social-youtube',
            WEB                                     : 'ion-android-globe',
        }
    );
