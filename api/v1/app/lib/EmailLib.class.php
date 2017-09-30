<?php

    namespace PeopleConnect\Email;

    require_once __DIR__.'/swiftmailer/lib/swift_required.php';

    class EmailLib {
    	
        protected $settings = null;
    	protected $transport;

        function __construct($settings) {
            $this->settings = $settings;

            $smtp_host_ip = gethostbyname($this->settings['email']['smtp_host_ip']);
			$this->transport = \Swift_SmtpTransport::newInstance($smtp_host_ip, $this->settings['email']['port'])
			  ->setUsername($this->settings['email']['smtp_username'])
			  ->setPassword($this->settings['email']['smtp_password']);
        }
    
        function __destruct() {
            //
        }
        //sendSignUpVerificationCodex
    	function sendSignUpVerificationCode($user_full_name, $user_verification_code, $user_email){
    		
			$mailer = \Swift_Mailer::newInstance($this->transport);
			//$recievers = array("ranjoy.sen85@gmail.com", "ranjoy@ranjoy.comeze.com");
			$date = date("l jS \of F Y");
			$message = \Swift_Message::newInstance('People Connect - Email Verification')
			  ->setFrom(array($this->settings['email']['support_email'] => $this->settings['email']['preety_email_name']))
			  ->setTo(array($user_email))
			  ->setBody('<body style="background:#272125">
<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;width:100%!important;min-height:100%;line-height:1.6;background:#272125;margin:0;padding:0">
				<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;width:100%;background:#272125;margin:0;padding:0">
					<tbody>

						<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0" valign="top"></td>
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;display:block!important;max-width:300px!important;clear:both!important;margin:0 auto;padding:0" valign="top" width="300">
								<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;max-width:300px;display:block;margin:0 auto;padding:20px">
									<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;border-radius:3px;background:#fff;margin:0;padding:0;border:1px solid #e9e9e9" cellpadding="0" cellspacing="0" width="100%">
										<tbody>
											<tr style="border:0">
												<td style="border:0">
													<img src="https://rollingarray.co.in/peopleConnect/api/img/app_logo_front.png" style="border:0">
												</td>
											</tr>
											<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
												<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:20px" valign="top">
													<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0" cellpadding="0" cellspacing="0" width="100%">
														<tbody>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;margin:0;padding:0 0 0px;float:right" valign="top">
																	'.$date.'
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
																	Dear <strong style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">'.$user_full_name.'
																	</strong>
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
																	You or someone with your email id signed up at PeopleConnect. Your account is almost ready, but before you login you need to confirm your email by applying below verification code in the app.
																	<br><br>
																	<table border=0 style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px">
																        <tr>
																            <td><b>Verification code</b></td>
																            <td>'.$user_verification_code.'</td>
																        </tr>
																        
																	</table>
																	
																	Once you verify, your account will be active.
																	<br><br>
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top"><b>
																	Regards<br>
																	Team PeopleConnect</b>
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px;font-style:italic" valign="top">
																	PeopleConnect - Connecting People for Good
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;clear:both;margin:0;padding:20px">
										<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0;color:#fff" width="100%">
											<tbody>
												<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0,">
													<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;text-align:center;margin:0;padding:0 0 5px" align="center" valign="top">You are receiving this notification because you have registered with <span style="color:#56C2E1">PeopleConnect</span></td>
												</tr>
												<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
													<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;text-align:center;margin:0;padding:0 0 5px;" align="center" valign="top">
														&copy; 2016 PeopleConnect, Bangalore, India. 
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</td>
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0" valign="top"></td>
						</tr>
					</tbody>
				</table>
			</div>
			</body>
			', 'text/html');

			$result = $mailer->send($message);
    	}

    	//sendSignUpVerificationCode
    	function signUpSuccess($user_full_name, $user_email){
    		$mailer = \Swift_Mailer::newInstance($this->transport);
			//$recievers = array("ranjoy.sen85@gmail.com", "ranjoy@ranjoy.comeze.com");
			$date = date("l jS \of F Y");
			$message = \Swift_Message::newInstance('Welcome to People Connect')
			  ->setFrom(array($this->settings['email']['support_email'] => $this->settings['email']['preety_email_name']))
			  ->setTo(array($user_email))
			  ->setBody('<body style="background:#272125">
<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;width:100%!important;min-height:100%;line-height:1.6;background:#272125;margin:0;padding:0">
				<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;width:100%;background:#272125;margin:0;padding:0">
					<tbody>

						<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0" valign="top"></td>
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;display:block!important;max-width:300px!important;clear:both!important;margin:0 auto;padding:0" valign="top" width="300">
								<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;max-width:300px;display:block;margin:0 auto;padding:20px">
									<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;border-radius:3px;background:#fff;margin:0;padding:0;border:1px solid #e9e9e9" cellpadding="0" cellspacing="0" width="100%">
										<tbody>
											<tr style="border:0">
												<td style="border:0">
													<img src="https://rollingarray.co.in/peopleConnect/api/img/app_logo_front.png" style="border:0">
												</td>
											</tr>
											<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
												<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:20px" valign="top">
													<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0" cellpadding="0" cellspacing="0" width="100%">
														<tbody>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;margin:0;padding:0 0 0px;float:right" valign="top">
																	'.$date.'
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
																	Dear <strong style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">'.$user_full_name.'
																	</strong>
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
																	Welcome to PeopleConnect :-) Your account is active and we are waiting for you to join any on going event.
																	<br><br>
																	
																	Happy Eventing.
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top"><b>
																	Regards<br>
																	Team PeopleConnect</b>
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px;font-style:italic" valign="top">
																	PeopleConnect - Connecting People for Good
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;clear:both;margin:0;padding:20px">
										<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0;color:#fff" width="100%">
											<tbody>
												<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0,">
													<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;text-align:center;margin:0;padding:0 0 5px" align="center" valign="top">You are receiving this notification because you have registered with <span style="color:#56C2E1">PeopleConnect</span></td>
												</tr>
												<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
													<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;text-align:center;margin:0;padding:0 0 5px;" align="center" valign="top">
														&copy; 2016 PeopleConnect, Bangalore, India. 
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</td>
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0" valign="top"></td>
						</tr>
					</tbody>
				</table>
			</div>
			</body>
			', 'text/html');

			$result = $mailer->send($message);
    	}

    	//sendPasswordResetCode
    	function sendPasswordResetCode($user_full_name, $user_password_reset_code, $user_email){
    		$mailer = \Swift_Mailer::newInstance($this->transport);
			//$recievers = array("ranjoy.sen85@gmail.com", "ranjoy@ranjoy.comeze.com");
			$date = date("l jS \of F Y");
			$message = \Swift_Message::newInstance('People Connect - Reset Password')
			  ->setFrom(array($this->settings['email']['support_email'] => $this->settings['email']['preety_email_name']))
			  ->setTo(array($user_email))
			  ->setBody('<body style="background:#272125">
<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;width:100%!important;min-height:100%;line-height:1.6;background:#272125;margin:0;padding:0">
				<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;width:100%;background:#272125;margin:0;padding:0">
					<tbody>

						<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0" valign="top"></td>
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;display:block!important;max-width:300px!important;clear:both!important;margin:0 auto;padding:0" valign="top" width="300">
								<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;max-width:300px;display:block;margin:0 auto;padding:20px">
									<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;border-radius:3px;background:#fff;margin:0;padding:0;border:1px solid #e9e9e9" cellpadding="0" cellspacing="0" width="100%">
										<tbody>
											<tr style="border:0">
												<td style="border:0">
													<img src="https://rollingarray.co.in/peopleConnect/api/img/app_logo_front.png" style="border:0">
												</td>
											</tr>
											<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
												<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:20px" valign="top">
													<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0" cellpadding="0" cellspacing="0" width="100%">
														<tbody>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;margin:0;padding:0 0 0px;float:right" valign="top">
																	'.$date.'
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
																	Dear <strong style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">'.$user_full_name.'
																	</strong>
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
																	You told us you forgot your password. If you readdy did, use this code to reset your password.
																	<br><br>
																	<table border=0 style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px">
																        <tr>
																            <td><b>Reset Code</b></td>
																            <td>'.$user_password_reset_code.'</td>
																        </tr>
																        
																	</table>
																	If you did not mean to reset your password, then you can just ingore this email. Your password will not change.
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top"><b>
																	Regards<br>
																	Team PeopleConnect</b>
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px;font-style:italic" valign="top">
																	PeopleConnect - Connecting People for Good
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;clear:both;margin:0;padding:20px">
										<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0;color:#fff" width="100%">
											<tbody>
												<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0,">
													<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;text-align:center;margin:0;padding:0 0 5px" align="center" valign="top">You are receiving this notification because you have registered with <span style="color:#56C2E1">PeopleConnect</span></td>
												</tr>
												<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
													<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;text-align:center;margin:0;padding:0 0 5px;" align="center" valign="top">
														&copy; 2016 PeopleConnect, Bangalore, India. 
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</td>
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0" valign="top"></td>
						</tr>
					</tbody>
				</table>
			</div>
			</body>
			', 'text/html');

			$result = $mailer->send($message);
    	}

    	//birthdayWish
    	function birthdayWish($user_full_name, $user_email){
    		$mailer = \Swift_Mailer::newInstance($this->transport);
			//$recievers = array("ranjoy.sen85@gmail.com", "ranjoy@ranjoy.comeze.com");
			$date = date("l jS \of F Y");
			$message = \Swift_Message::newInstance('Happy Birth Day from People Connect')
			  ->setFrom(array($this->settings['email']['support_email'] => $this->settings['email']['preety_email_name']))
			  ->setTo(array($user_email))
			  ->setBody('<body style="background:#272125">
<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;width:100%!important;min-height:100%;line-height:1.6;background:#272125;margin:0;padding:0">
				<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;width:100%;background:#272125;margin:0;padding:0">
					<tbody>

						<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0" valign="top"></td>
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;display:block!important;max-width:300px!important;clear:both!important;margin:0 auto;padding:0" valign="top" width="300">
								<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;max-width:300px;display:block;margin:0 auto;padding:20px">
									<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;border-radius:3px;background:#fff;margin:0;padding:0;border:1px solid #e9e9e9" cellpadding="0" cellspacing="0" width="100%">
										<tbody>
											<tr style="border:0">
												<td style="border:0">
													<img src="https://rollingarray.co.in/peopleConnect/api/img/app_logo_front.png" style="border:0">
												</td>
											</tr>
											<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
												<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:20px" valign="top">
													<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0" cellpadding="0" cellspacing="0" width="100%">
														<tbody>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;margin:0;padding:0 0 0px;float:right" valign="top">
																	'.$date.'
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
																	Dear <strong style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">'.$user_full_name.'
																	</strong>
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
																	Wishing you Happy Birth Day :-)
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top"><b>
																	Regards<br>
																	Team PeopleConnect</b>
																</td>
															</tr>
															<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
																<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px;font-style:italic" valign="top">
																	PeopleConnect - Connecting People for Good
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;clear:both;margin:0;padding:20px">
										<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0;color:#fff" width="100%">
											<tbody>
												<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0,">
													<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;text-align:center;margin:0;padding:0 0 5px" align="center" valign="top">You are receiving this notification because you have registered with <span style="color:#56C2E1">PeopleConnect</span></td>
												</tr>
												<tr style="font-family:Helvetica,Arial,sans-serif;font-size:14px;margin:0;padding:0">
													<td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;vertical-align:top;text-align:center;margin:0;padding:0 0 5px;" align="center" valign="top">
														&copy; 2016 PeopleConnect, Bangalore, India. 
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</td>
							<td style="font-family:Helvetica,Arial,sans-serif;font-size:14px;vertical-align:top;margin:0;padding:0" valign="top"></td>
						</tr>
					</tbody>
				</table>
			</div>
			</body>
			', 'text/html');

			$result = $mailer->send($message);
    	}
    }
?>


    