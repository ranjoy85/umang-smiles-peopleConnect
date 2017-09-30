<?php
	/**
	 * @author Ranjoy
	 * @copyright 2016
	 */

	//namespace Tudil;

	$settings = [
			// Slim Settings
			'displayErrorDetails' => true,
			
			// database settings
			'db' => [
				'host' => 'localhost',
				'username' => 'peopleconnect',
				'password' => 'peopleconnect',
				'database' => 'rolli3oh_peopleConnect',
				'port' => '3306'
			],
			
			// Monolog settings
			'imageStote' => [
				'event_photos' => '../fileStorage/eventPhotos/',
			],

			// Monolog settings
			'logger' => [
				'name' => 'Tudil',
				'path' => 'logs/logs.log',
			],

			'email' => [
				'smtp_host_ip' => 'mail.rollingarray.co.in',
				'port' => 587,
				'smtp_username' => 'ranjoy@rollingarray.co.in',
				'smtp_password' => 'rjoy.85@s',
				'support_email' => 'support@rollingarray.co.in',
				'preety_email_name' => 'People connect noreply'
			],

			//validation rules
			'validationRules' => [
				'user_id' => '/^USER_[a-zA-Z0-9]{30,50}/',
				'third_party_user_id' => '/^[0-9]{1,50}/',
				'user_email' => '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/',
				'searchable_user_email' => '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/',
				'user_first_name'=>'/^[a-zA-Z]{3,200}$/',
                'user_last_name'=>'/^[a-zA-Z]{3,200}$/',
                'user_dob' => '/^\d{4}[-]\d{2}[-]\d{2}$/',
                'user_password'=>'/^[a-zA-Z0-9 \[\]()-.,;:\/_\-\s\S]{3,200}$/',
                'user_status'=>'/(INACTIVE|ACTIVE)/',
                'user_type' => '/(NATIVE|FB|ADMIN|VOL)/',
                'user_verification_code'=>'/([a-zA-Z0-9]{5,30}\s*)+/',
				'user_password_reset_code'=>'/([a-zA-Z0-9]{4,30}\s*)+/',
                'user_login_type'=>'/(IN_APP_LOGIN|FRESH_LOGIN)/',
				'logged_in_session_id' => '/^SESSION_[a-zA-Z0-9]{10,20}/',
				'user_device_type'=>'/(NONE|ANDROID|IOS)/',
				'event_id' => '/^EVENT_[a-zA-Z0-9]{10,50}/',
				'event_name' => '/([a-zA-Z]{3,30}\s*)+/',
				'event_description' => '/^[a-zA-Z0-9 \[\]()-.,;:!&@#%$^\/_\-\n]{5,400}$/',
				'event_date' => '/^\d{4}[-]\d{2}[-]\d{2}$/',
				'event_youtube_link' => '/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/',
				'event_web_link' => '/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/',
				'event_twitter_link' => '/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/',
				'event_facebook_link' => '/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/',
				'user_event_attendence_type' => '/(IN|OUT)/',
				'user_acceptence_status' => '/(ACCEPTED|HOLD)/',
				'user_feedback' => '/^[a-zA-Z0-9 \[\]()-.,;:!&@#%$^\/_\-\n]{5,400}$/',
				'achievement_id' => '/^[0-9]{1,50}/',
				'achievement_name' => '/([a-zA-Z]{3,30}\s*)+/',
				'achievement_description' => '/^[a-zA-Z0-9 \[\]()-.,;:!&@#%$^\/_\-\n]{5,400}$/',
				'achievement_receaved_on' => '/^\d{4}[-]\d{2}[-]\d{2}$/',
				'corporate_id' => '/^[0-9]{1,50}/',
				'corporate_name' => '/([a-zA-Z]{3,30}\s*)+/',
				'corporate_email' => '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/',
				'corporate_phone_no' => '/\+?\d[\d -]{8,12}\d/',
				'corporate_address' => '/^[a-zA-Z0-9 \[\]()-.,;:!&@#%$^\/_\-\n]{5,400}$/',
				'from_date' => '/^\d{4}[-]\d{2}[-]\d{2}$/',
				'to_date' => '/^\d{4}[-]\d{2}[-]\d{2}$/',
			],
			'errorValidationMessage' => [
				'user_id' => 'Invalid user id',
				'third_party_user_id' => 'Invalid third party user id',
				'user_email' => 'Invalid user email',
				'searchable_user_email' => 'Invalid search user email',
				'user_first_name' => 'Invalid user first name',
				'user_last_name' => 'Invalid user last name',
				'user_dob' => 'Invalid user date of barth',
				'user_password'=>'Invalid user password',
                'user_status'=>'Invalid user status',
                'user_type' =>'Invalid user type',
                'user_verification_code'=>'Invalid user verivication code',
				'user_password_reset_code'=>'Invalid password reset code',
                'user_login_type'=>'Invalid login type',
				'logged_in_session_id' => 'Invalid token',
				'user_device_type' => 'Invalid device type',
				'event_id' => 'Invalid event id',
				'event_name' => 'Invalid event name',
				'event_description' => 'Invalid event description',
				'event_date' => 'Invalid event date',
				'event_youtube_link' => 'Invalid youtube address',
				'event_web_link' => 'Invalid web address',
				'event_twitter_link' => 'Invalid twitter address',
				'event_facebook_link' => 'Invalid facebook address',
				'user_event_attendence_type' => 'Invalid event attendence type',
				'user_acceptence_status' => 'Invalid user attendence status type',
				'user_feedback' => 'Invalid user feedback',
				'achievement_id' => 'Invalid achievement id',
				'achievement_name' => 'Invalid achievement name',
				'achievement_description' => 'Invalid achievement description',
				'achievement_receaved_on' => 'Invalid achievement receaved date',
				'corporate_id' => 'Invalid corporate id',
				'corporate_name' => 'Invalid corporate name',
				'corporate_email' => 'Invalid corporate email',
				'corporate_phone_no' => 'Invalid corporate phone no',
				'corporate_address' => 'Invalid corporate address',
				'from_date' => 'Invalid from date',
				'to_date' => 'Invalid to date',
				
			],
			'errorMessage' => [
				'USER_NOT_CREATED' => 'User could not be created',
				'USER_ALREADY_EXIST' => 'User already present with same email',
				'ACCOUNT_NOT_ACTIVATED' => 'Your account cound not be activted, please try again',
				'ACCOUNT_INACTIVE' => 'Your account is inactive',
				'VERIFICATION_CODE_NO_MATCH' => 'Verificaiton code did not match',
				'NO_USER_FOUND' => 'No user found with this email',
				'NO_VERIFICATION_CODE' => 'We cound not send activation code in your registered email, please try again',
				'ACCOUNT_ALREADY_ACTIVE' => 'Your account is already active, please sign in',
				'NO_PASSWORD_RESET_CODE' => 'We cound not send password reset code in your registered email, please try again',
				'NO_PASSWORD_UPDATE' => 'Password could not be updated, please try again',
				'PASSWORD_RESET_CODE_NOT_FOUND' => 'Password reset code did not match, please re-check',
				'USER_VERIFICATION_FAILED' => 'Unfortunately your answers to the security question did not match, give another try',
				'INVALID_SESSION' => 'Invalid session, please signin again',
				'NO_USER_UPDATE' => 'User details could not be updated',
				'NO_SESSION' => 'No session user fould',
				'NO_EVENT_CREATE' => 'Event could not be created, please try again',
				'NO_EVENT_UPDATE' => 'Event could not be updated, please try again',
				'NO_EVENT_DELETE' => 'Event could not be deleted, please try again',
				'EVENT_EXIST' => 'Event alreadt exist with same name',
				'GENERIC_ERROR' => 'Operation could not be completed, please try again',
				'USER_NOMINATION_EVENT_EXIST' => 'User already nominated for the event',
				'NO_ACHIEVEMENT_CREATE' => 'Actievement could not be addes, please try again',
				'ACHIEVEMENT_EXIST' => 'You have already addedd actievement with same name',
				'NO_CORPORATE_DETAILS' => 'Corporate details could not be captured, please try again',
				'NO_EVENT_IMAGE' => 'Event photograpg could not be uploaded, please try again',
				'NO_SEGMENT' => 'No data found for the segment',
				'NO_USERS_FILE' => 'Registered users file could not be fetched, please try again',
				'ALREADY_REGISTEDED' => 'already registerd',
				'REGISTERED' => 'registred, password is login@123',
				'NO_REGISTEDED' => 'could not register',
				'FAILED_VALIDATION' => 'failed registration due to data validation, please try again with correct data format',
			],
			'successMessage' => [
				'ACTIVATE_ACCOUNT' => 'We have send you the activation code in your registered email, please use the code to activate your account',
				'SUCCESS_SIGNUP_WITH_DOMAIN' => 'Happy to get you registered, you are the domain controller. Please sign in',
				'SUCCESS_SIGNUP_WITHOUT_DOMAIN' => 'Happy to get you registered. Please sign in',
				'ACCOUNT_ACTIVATED' => 'Your account has been activated, please sign in',
				'VERIFICATION_CODE_REGENERATED' => 'We have send you the activation code in your registered email, please check',
				'PASSWORD_RESET_CODE_GENERATED' => 'We have send you the password rest code in your registered email, please check',
				'PASSWORD_UPDATED' => 'Password updated, please sign in',
				'USER_VERIFIED' => 'Thank you for your verification, please update your password',
				'SUCCESS_IN_APP_LOGIN' => 'Delighted to get you back, you can proceed with your context now !',
				'SUCCESS_LOGIN' => 'Welcome to Tudil',
				'SUCCESS_USER_UPDATE' => 'User details updated',
				'SUCCESS_EVENT_CREATE' => 'Event created successfully, you may now post activities',
				'SUCCESS_EVENT_UPDATED' => 'Event updated successfully',
				'SUCCESS_EVENT_DELETED' => 'Event deleted successfully',
				'SUCCESS_EVENT_SIGN_IN' => 'You have successfully signed in to the event',
				'SUCCESS_EVENT_SIGN_OUT' => 'You have successfully signed out from the event',
				'SUCCESS_EVENT_USER_NOMINATION' => 'You have successfully nominated for the event',
				'SUCCESS_USER_FEEDBACK' => 'Thank you for your feedback',
				'SUCCESS_ACHIEVEMENT_CREATE' => 'Actievement created successfully, you may see all your achievements under My Achievements',
				'SUCCESS_ACHIEVEMENT_UPDATED' => 'Actievement updated successfully',
				'SUCCESS_ACHIEVEMENT_DELETED' => 'Actievement deleted successfully',
				'SUCCESS_CORPORATE_DETAILS' => 'Corporate details captured succfully',
				'SUCCESS_EVENT_IMAGE' => 'Event photograpg uploaded successfully',
			],
			'hashKey' => [
				'SALT'=>'tudil'
			]
		];
?>