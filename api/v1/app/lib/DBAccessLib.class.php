<?php

    namespace PeopleConnect\Database;

    class DBAccessLib extends BaseDatabaseAPI {
        function __construct($settings) {
            parent::__construct($settings);
        }
    
        function __destruct() {
            parent::__destruct();
        }
        
        public function ifExistingUser($user_email)
        {
            $query = "SELECT 
                                user_first_name, 
                                user_last_name 
                            FROM 
                                tbl_user 
                            WHERE 
                                user_email = '$user_email'";
            return parent::ifRecordExist($query); // 1 line selection, return 1 line
        }

        //insertNewUserInDB
        public function insertNewUserInDB($passedData)
        {
            $query = 'INSERT INTO 
                        tbl_user 
                            (
                                user_id,
                                third_party_user_id,
                                user_first_name, 
                                user_last_name, 
                                user_password, 
                                user_dob,
                                user_email, 
                                user_status,
                                user_verification_code,
                                user_type,
                                user_created_at
 
                            ) 
                        values 
                            (
                                "' . $passedData['user_id'] . '",
                                "' . $passedData['third_party_user_id'] . '",
                                "' . $passedData['user_first_name'] . '",
                                "' . $passedData['user_last_name'] . '",
                                "' . $passedData['user_password'] . '",
                                "' . $passedData['user_dob'] . '",
                                "' . $passedData['user_email'] . '",
                                "' . $passedData['user_status'] . '",
                                "' . $passedData['user_verification_code'] . '",
                                "' . $passedData['user_type'] . '",
                                now()
                            )';
            return parent::executeStatement($query);
        }

        //insertNewDomainInDB
        public function getIfVerificationCodeValid($passedData)
        {
            $query = 'SELECT 
                            user_email
                        FROM 
                            tbl_user 
                        WHERE 
                            user_email = "' . $passedData['user_email'] . '"
                        AND 
                            user_verification_code = "' . $passedData['user_verification_code'] . '"';
            return parent::getOneRecord($query);
        }

        //getIfUserInactive
        public function getIfUserInactive($passedData)
        {
            $query = 'SELECT 
                            user_email
                        FROM 
                            tbl_user 
                        WHERE 
                            user_email = "' . $passedData['user_email'] . '"
                        AND
                            user_status = "INACTIVE"';
                            
            return parent::getOneRecord($query);
        }

        //activateUserAccount
        public function activateUserAccount($passedData)
        {
            //run query
            $query = 'UPDATE 
                        tbl_user
                            SET
                                user_status  = "ACTIVE",
                                user_verification_code = "VEREFIED",
                                user_updated_at = now()
                            WHERE 
                                user_email = "' . $passedData['user_email'] . '"';
            return parent::executeStatement($query);
        }

        //regenerateUserAccountActivationCode
        public function regenerateUserAccountActivationCode($passedData)
        {
            //run query
            $query = 'UPDATE 
                        tbl_user
                            SET
                                user_verification_code  = "' . $passedData['user_verification_code'] . '",
                                user_updated_at = now()
                            WHERE 
                                user_email = "' . $passedData['user_email'] . '"';
            return parent::executeStatement($query);
        }

        //generateUserPasswordResetCode
        public function generateUserPasswordResetCode($passedData)
        {
            $query = 'UPDATE 
                        tbl_user
                            SET
                                user_password_reset_code  = "' . $passedData['user_password_reset_code'] . '",
                                user_updated_at = now()
                            WHERE 
                                user_email = "' . $passedData['user_email'] . '"';
            return parent::executeStatement($query);
        }

        //ifPasswordResetCodeExist
        public function ifPasswordResetCodeExist($passedData)
        {
            //run query
            $query = 'SELECT 
                            user_email
                        FROM 
                            tbl_user 
                        WHERE 
                            user_email = "' . $passedData['user_email'] . '"
                        AND
                            user_password_reset_code = "' . $passedData['user_password_reset_code'] . '"';
                            
            return parent::ifRecordExist($query);
        }

        //updatePassword
        public function updatePassword($passedData)
        {
            $query = 'UPDATE 
                        tbl_user
                            SET
                                user_password  = "' . $passedData['user_password'] . '",
                                user_password_reset_code = "NONE",
                                user_updated_at = now()
                            WHERE 
                                user_email = "' . $passedData['user_email'] . '"';

            return parent::executeStatement($query);
        }

        //ifUserIdentified
        function ifUserIdentified($passedData)
        {
            //run query
            $query = "SELECT 
                            user_id 
                        FROM 
                            tbl_user 
                        WHERE 
                            user_email = '$passedData[user_email]'
                        AND
                            user_security_answer_1 = '$passedData[user_security_answer_1]'
                        AND
                            user_security_answer_2 = '$passedData[user_security_answer_2]'";
            return parent::ifRecordExist($query);
        }

        //getSignInUser
        function getSignInUser($passedData)
        {
            //run query
            $query = "SELECT 
                            user_id 
                        FROM 
                            tbl_user 
                        WHERE 
                            user_email = '$passedData[user_email]' 
                        AND 
                            user_password = '$passedData[user_password]' 
                        AND
                            user_status = 'ACTIVE'";

            //echo $query;

            return parent::getOneRecord($query);
        }

        //getUserDetailsById
        function getUserDetailsById($passedData)
        {
            $query = "SELECT
                            tbl_user.user_id,  
                            tbl_user.user_first_name, 
                            tbl_user.user_last_name,
                            tbl_user.user_dob,
                            tbl_user.user_email,
                            tbl_user.third_party_user_id,
                            tbl_user.user_type
                        FROM 
                            tbl_user  
                        WHERE 
                            tbl_user.user_id = '$passedData[user_id]' 
                        AND 
                            tbl_user.user_status = 'ACTIVE'";

            return parent::getOneRecord($query);
        }

        //getUserDetailsByEmail
        function getUserDetailsByEmail($passedData)
        {
            $query = "SELECT
                            tbl_user.user_id,  
                            tbl_user.user_first_name, 
                            tbl_user.user_last_name,
                            tbl_user.user_email,
                            tbl_user.third_party_user_id,
                            tbl_user.user_type
                        FROM 
                            tbl_user  
                        WHERE 
                            tbl_user.user_email = '$passedData[user_email]' 
                        AND
                            tbl_user.user_status = 'ACTIVE'";
            //echo $query;
                    
            return parent::getOneRecord($query);
        }

        //updatedUserProfileInDB
        function updatedUserProfileInDB($passedData)
        {
            $query = 'UPDATE  
                        tbl_user 
                            SET
                                user_first_name = "' . $passedData['user_first_name'] . '",
                                user_last_name = "' . $passedData['user_last_name'] . '",
                                user_dob = "' . $passedData['user_dob'] . '",
                                user_updated_at = now()
                        WHERE 
                            user_id = "' . $passedData['user_id'] . '"';
            return parent::executeStatement($query);
        }

        //getAllRegisteredUsers
        function getAllRegisteredUsers($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_user.user_id,  
                            tbl_user.user_first_name, 
                            tbl_user.user_last_name,
                            tbl_user.user_email,
                            tbl_user.user_dob,
                            tbl_user.third_party_user_id,
                            tbl_user.user_type
                        FROM 
                            tbl_user 
                        WHERE
                            tbl_user.user_status = 'ACTIVE'
                        ORDER BY
                            tbl_user.user_created_at DESC";

            //echo $query;

            return parent::getAllRecords($query);
        }
        //user
        //session
        //insertNewSessionInDB
        function insertNewSessionInDB($user_id, $logged_in_session_id)
        {
            $query = 'INSERT INTO 
                    tbl_user_session 
                        (
                            session_id,
                            session_user_id,
                            session_time_stamp
                        ) 
                    values 
                        (
                            "' . $logged_in_session_id . '",
                            "' . $user_id . '",
                            now()
                        )';
            return parent::executeStatement($query);
        }

        //deleteSessionFromDB
        function deleteSessionFromDB($user_id)
        {
            $query = 'DELETE 
                        FROM 
                            tbl_user_session 
                        WHERE 
                            session_user_id = "' . $user_id .'"';
            return parent::executeStatement($query);
        }

        //getUserSessionDetails
        function getUserSessionDetails($user_id, $logged_in_session_id)
        {
            $query = "SELECT 
                            * 
                        FROM 
                            tbl_user_session 
                        WHERE 
                            session_id = '$logged_in_session_id' 
                        AND 
                            session_user_id = '$user_id'";
            return parent::getOneRecord($query);
        }

        //updateSessionInDB
        function updateSessionInDB($user_id, $logged_in_session_id)
        {
            $query = 'UPDATE  
                        tbl_user_session 
                            SET
                                session_id = "' . $logged_in_session_id . '",
                                session_time_stamp = now()
                            
                        WHERE 
                            session_user_id = "' . $user_id . '"';
            return parent::executeStatement($query);
        }

        //ifUseHasAnySessionAny
        public function ifUseHasAnySessionAny($user_id)
        {
            $query = "SELECT 
                            * 
                        FROM 
                            tbl_user_session 
                        WHERE 
                            session_user_id = '$user_id'";
            
            return parent::getOneRecord($query);
        }
        //session

        //event
        //ifEventAlreadyExist
        function ifEventAlreadyExist($passedData)
        {
            //run query
            $query = "SELECT 
                            event_id 
                        FROM 
                            tbl_event 
                        WHERE 
                            event_name = '$passedData[event_name]'";

            //echo $query;

            return parent::getOneRecord($query);
        }
        
        //insertNewChennelInDB
        public function insertNewEventInDB($passedData)
        {
            $query = 'INSERT INTO 
                        tbl_event
                            (
                                event_id, 
                                event_name, 
                                event_description, 
                                event_youtube_link,
                                event_web_link,
                                event_twitter_link,
                                event_facebook_link,
                                event_date,
                                event_created_at
 
                            ) 
                        values 
                            (
                                "' . $passedData['event_id'] . '",
                                "' . $passedData['event_name'] . '",
                                "' . $passedData['event_description'] . '",
                                "' . $passedData['event_youtube_link'] . '",
                                "' . $passedData['event_web_link'] . '",
                                "' . $passedData['event_twitter_link'] . '",
                                "' . $passedData['event_facebook_link'] . '",
                                "' . $passedData['event_date'] . '",
                                now()
                            )';
            return parent::executeStatement($query);
        }

        //updateEvent
        public function updateEvent($passedData)
        {
            //run query
            $query = 'UPDATE  
                        tbl_event 
                            SET
                                event_name = "' . $passedData['event_name'] . '",
                                event_description = "' . $passedData['event_description'] . '",
                                event_youtube_link = "' . $passedData['event_youtube_link'] . '",
                                event_web_link = "' . $passedData['event_web_link'] . '",
                                event_twitter_link = "' . $passedData['event_twitter_link'] . '",
                                event_facebook_link = "' . $passedData['event_facebook_link'] . '",
                                event_date = "' . $passedData['event_date'] . '",
                                event_created_at = now()
                        WHERE 
                            event_id = "' . $passedData['event_id'] . '"';
            return parent::executeStatement($query);
        }

        //insertNewMemberWithEventInDB
        public function insertNewMemberWithEventInDB($passedData)
        {
            $query = 'INSERT INTO 
                        tbl_event_member
                            (
                                event_id, 
                                user_id, 
                                user_type, 
                                user_acceptence_status,
                                member_added_at
 
                            ) 
                        values 
                            (
                                "' . $passedData['event_id'] . '",
                                "' . $passedData['user_id'] . '",
                                "' . $passedData['user_type'] . '",
                                "' . $passedData['user_acceptence_status'] . '",
                                now()
                            )';
            return parent::executeStatement($query);
        }

        //getAllEvents
        function getAllEvents($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_event.event_id, 
                            tbl_event.event_name, 
                            tbl_event.event_description, 
                            tbl_event.event_date,
                            tbl_event.event_youtube_link,
                            tbl_event.event_web_link,
                            tbl_event.event_twitter_link,
                            tbl_event.event_facebook_link,
                            tbl_event.event_created_at
                        FROM 
                            tbl_event 
                        ORDER BY
                            tbl_event.event_created_at DESC";

            //echo $query;

            return parent::getAllRecords($query);
        }

        //getUserEvents
        function getUserEvents($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_event.event_id, 
                            tbl_event.event_name, 
                            tbl_event.event_description, 
                            tbl_event.event_date,
                            tbl_event.event_youtube_link,
                            tbl_event.event_web_link,
                            tbl_event.event_twitter_link,
                            tbl_event.event_facebook_link,
                            tbl_event.event_created_at
                        FROM 
                            tbl_event 
                        JOIN 
                            tbl_event_member
                        ON 
                            tbl_event.event_id = tbl_event_member.event_id
                        WHERE 
                            tbl_event_member.user_id = '$passedData[user_id]'
                        ORDER BY
                            tbl_event.event_created_at DESC";

            //echo $query;

            return parent::getAllRecords($query);
        }

        //getUserEvents
        function getEventUsers($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_event_member.event_id, 
                            tbl_event_member.user_id, 
                            tbl_user.user_first_name,
                            tbl_user.user_last_name,
                            tbl_user.user_email,
                            tbl_event_member.user_type, 
                            tbl_event_member.user_event_sign_out,
                            tbl_event_member.user_event_sign_in,
                            TIMESTAMPDIFF(SECOND, tbl_event_member.user_event_sign_in, tbl_event_member.user_event_sign_out) AS user_event_logged_time,
                            tbl_event_member.member_added_at
                        FROM 
                            tbl_event_member 
                        JOIN 
                            tbl_user
                        ON 
                            tbl_event_member.user_id = tbl_user.user_id
                        WHERE 
                            tbl_event_member.event_id = '$passedData[event_id]'";

            //echo $query;

            return parent::getAllRecords($query);
        }

        //getEventDetails
        function getEventDetails($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_event.event_id, 
                            tbl_event.event_name, 
                            tbl_event.event_description, 
                            tbl_event.event_date,
                            tbl_event.event_youtube_link,
                            tbl_event.event_web_link,
                            tbl_event.event_twitter_link,
                            tbl_event.event_facebook_link,
                            tbl_event.event_created_at
                        FROM 
                            tbl_event 
                        WHERE 
                            event_id = '$passedData[event_id]'";

            //echo $query;

            return parent::getOneRecord($query);
        }

        //userSignInEvent
        function userSignInEvent($passedData)
        {
            $query = "UPDATE  
                        tbl_event_member 
                            SET
                                user_event_sign_in = now()
                        WHERE 
                            user_id = '$passedData[user_id]'
                        AND
                            event_id = '$passedData[event_id]'";

            return parent::executeStatement($query);
        }

        //userSignInEvent
        function userSignOutEvent($passedData)
        {
            $query = "UPDATE  
                        tbl_event_member 
                            SET
                                user_event_sign_out = now()
                        WHERE 
                            user_id = '$passedData[user_id]'
                        AND
                            event_id = '$passedData[event_id]'";

            return parent::executeStatement($query);
        }

        //ifUserAlreadyNominated
        function ifUserAlreadyNominated($passedData)
        {
            //run query
            $query = "SELECT 
                            event_id 
                        FROM 
                            tbl_event_member 
                         WHERE 
                            user_id = '$passedData[user_id]'
                        AND
                            event_id = '$passedData[event_id]'";

            //echo $query;

            return parent::getOneRecord($query);
        }

        //getEventHoursForDate
        function getEventHoursForDate($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_event_member.event_id, 
                            tbl_event_member.user_id, 
                            tbl_user.user_first_name,
                            tbl_user.user_last_name,
                            tbl_user.user_email,
                            tbl_event_member.user_type, 
                            tbl_event_member.user_event_sign_out,
                            tbl_event_member.user_event_sign_in,
                            TIMESTAMPDIFF(SECOND, tbl_event_member.user_event_sign_in, tbl_event_member.user_event_sign_out) AS user_event_logged_time,
                            tbl_event_member.member_added_at
                        FROM 
                            tbl_event_member 
                        LEFT JOIN 
                            tbl_user
                        ON 
                            tbl_event_member.user_id = tbl_user.user_id
                         
                        WHERE 
                            tbl_event_member.event_id = '$passedData[event_id]'
                        AND
                            DATE(tbl_event_member.user_event_sign_out) >= '$passedData[from_date]'
                        AND
                            DATE(tbl_event_member.user_event_sign_out) <= '$passedData[to_date]'";

            //echo $query;

            return parent::getAllRecords($query);
        }

        //getUserHoursForDate
        function getUserHoursForDate($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_event_member.event_id, 
                            tbl_event.event_name,
                            tbl_event_member.user_id, 
                            tbl_event_member.user_type, 
                            tbl_event_member.user_event_sign_out,
                            tbl_event_member.user_event_sign_in,
                            TIMESTAMPDIFF(SECOND, tbl_event_member.user_event_sign_in, tbl_event_member.user_event_sign_out) AS user_event_logged_time,
                            tbl_event_member.member_added_at
                        FROM 
                            tbl_event_member 
                        LEFT JOIN 
                            tbl_user
                        ON 
                            tbl_event_member.user_id = tbl_user.user_id
                        LEFT JOIN 
                            tbl_event
                        ON 
                            tbl_event_member.event_id = tbl_event.event_id 
                        WHERE 
                            tbl_event_member.user_id = '$passedData[user_id]'
                        AND
                            DATE(tbl_event_member.user_event_sign_out) >= '$passedData[from_date]'
                        AND
                            DATE(tbl_event_member.user_event_sign_out) <= '$passedData[to_date]'";

            //echo $query;

            return parent::getAllRecords($query);
        }


        //feedback
        //insertUserFeeback
        public function insertUserFeeback($passedData)
        {
            $query = 'INSERT INTO 
                        tbl_feedback
                            (
                                user_id, 
                                user_feedback, 
                                feedback_created_on
 
                            ) 
                        values 
                            (
                                "' . $passedData['user_id'] . '",
                                "' . $passedData['user_feedback'] . '",
                                now()
                            )';
            return parent::executeStatement($query);
        }

        //getAllUserFeedbacks
        function getAllUserFeedbacks($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_feedback.feedback_id, 
                            tbl_feedback.user_id, 
                            tbl_user.user_first_name,
                            tbl_user.user_last_name,
                            tbl_user.user_email,
                            tbl_feedback.user_feedback, 
                            tbl_feedback.feedback_created_on
                        FROM 
                            tbl_feedback 
                        LEFT JOIN 
                            tbl_user
                        ON 
                            tbl_feedback.user_id = tbl_user.user_id";

            //echo $query;

            return parent::getAllRecords($query);
        }

        //achievement
        //ifAchievementAlreadyExist
        function ifAchievementAlreadyExist($passedData)
        {
            //run query
            $query = "SELECT 
                            achievement_id 
                        FROM 
                            tbl_achievement 
                        WHERE 
                            achievement_name = '$passedData[achievement_name]'
                        AND 
                            user_id = '$passedData[user_id]'
                        AND 
                            event_id = '$passedData[event_id]'";

            //echo $query;

            return parent::getOneRecord($query);
        }

        //insertNewAchievementForUser
        public function insertNewAchievementForUser($passedData)
        {
            $query = 'INSERT INTO 
                        tbl_achievement
                            (
                                user_id,
                                event_id, 
                                achievement_name, 
                                achievement_receaved_on, 
                                achievement_description,
                                achievement_created_on
                            ) 
                        values 
                            (
                                "' . $passedData['user_id'] . '",
                                "' . $passedData['event_id'] . '",
                                "' . $passedData['achievement_name'] . '",
                                "' . $passedData['achievement_receaved_on'] . '",
                                "' . $passedData['achievement_description'] . '",
                                now()
                            )';
            return parent::executeStatement($query);
        }

        //updateAchievementForUser
        public function updateAchievementForUser($passedData)
        {
            //run query
            $query = 'UPDATE  
                        tbl_achievement 
                            SET
                                achievement_name = "' . $passedData['achievement_name'] . '",
                                achievement_receaved_on = "' . $passedData['achievement_receaved_on'] . '",
                                achievement_description = "' . $passedData['achievement_description'] . '",
                                achievement_created_on = now()
                        WHERE 
                            achievement_id = "' . $passedData['achievement_id'] . '"';
            return parent::executeStatement($query);
        }

        //deleteAchievementForUser
        function deleteAchievementForUser($passedData)
        {
            $query = 'DELETE 
                        FROM 
                            tbl_achievement 
                        WHERE 
                            achievement_id = "' . $passedData['achievement_id'] .'"';
            return parent::executeStatement($query);
        }

        //getUserEvents
        function getUserAchievements($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_achievement.achievement_id,
                            tbl_achievement.event_id, 
                            tbl_event.event_name,
                            tbl_achievement.user_id, 
                            tbl_achievement.achievement_name, 
                            tbl_achievement.achievement_receaved_on, 
                            tbl_achievement.achievement_description
                        FROM 
                            tbl_achievement 
                        JOIN 
                            tbl_event
                        ON 
                            tbl_achievement.event_id = tbl_event.event_id
                        WHERE 
                            tbl_achievement.user_id = '$passedData[user_id]'";

            //echo $query;

            return parent::getAllRecords($query);
        }

        //insertNewCorporateDetails
        public function insertNewCorporateDetails($passedData)
        {
            $query = 'INSERT INTO 
                        tbl_corporate
                            (
                                corporate_name,
                                corporate_phone_no, 
                                corporate_email, 
                                corporate_address, 
                                corporate_created_at
                            ) 
                        values 
                            (
                                "' . $passedData['corporate_name'] . '",
                                "' . $passedData['corporate_phone_no'] . '",
                                "' . $passedData['corporate_email'] . '",
                                "' . $passedData['corporate_address'] . '",
                                now()
                            )';
            return parent::executeStatement($query);
        }

        //updateCorporateDetails
        public function updateCorporateDetails($passedData)
        {
            //run query
            $query = 'UPDATE  
                        tbl_corporate 
                            SET
                                corporate_name = "' . $passedData['corporate_name'] . '",
                                corporate_phone_no = "' . $passedData['corporate_phone_no'] . '",
                                corporate_email = "' . $passedData['corporate_email'] . '",
                                corporate_address = "' . $passedData['corporate_address'] . '",
                                corporate_created_at = now()
                        WHERE 
                            corporate_id = "' . $passedData['corporate_id'] . '"';
            return parent::executeStatement($query);
        }

        //getAllCorporateDetails
        function getAllCorporateDetails($passedData)
        {
            //run query
            $query = "SELECT 
                            corporate_name,
                            corporate_phone_no,
                            corporate_email,
                            corporate_address
                        FROM 
                            tbl_corporate";

            //echo $query;

            return parent::getAllRecords($query);
        }

        //event photo
        //insertNewEventPhoto
        public function insertNewEventPhoto($passedData)
        {
            $query = 'INSERT INTO 
                        tbl_event_file
                            (
                                event_id,
                                file_name, 
                                file_created_on
                            ) 
                        values 
                            (
                                "' . $passedData['event_id'] . '",
                                "' . $passedData['file_name'] . '",
                                now()
                            )';
            return parent::executeStatement($query);
        }

        //getEventPhotos
        function getEventPhotos($passedData)
        {
            //run query
            $query = "SELECT 
                            tbl_event_file.file_id,
                            tbl_event_file.event_id,
                            tbl_event.event_name, 
                            tbl_event_file.file_name
                        FROM 
                            tbl_event_file 
                        LEFT JOIN 
                            tbl_event
                        ON 
                            tbl_event_file.event_id = tbl_event.event_id
                        WHERE 
                            tbl_event_file.event_id = '$passedData[event_id]'
                        ORDER BY
                            tbl_event_file.file_created_on DESC";

            //echo $query;

            return parent::getAllRecords($query);
        }


    }
?>