'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {
		ACCESS_DENIED_TEXT: 'You need to be logged in to access this page',
		USERNAME_OR_EMAIL_LABEL: 'Username or Email',
		AGENCY_LABEL: 'Agency',
		USERNAME_LABEL: 'Username',
		PASSWORD_LABEL: 'Password',
		CURRENT_PASSWORD_LABEL: 'Current Password',
		NEW_PASSWORD_LABEL: 'New Password',
		VERIFY_PASSWORD_LABEL: 'Verify Password',
		UPDATE_PASSWORD_LABEL: 'Update Password',
		FIRST_NAME_LABEL: 'First Name',
		LAST_NAME_LABEL: 'Last Name',
		LANGUAGE_LABEL: 'Language',
		EMAIL_LABEL: 'Email',

		SIGNUP_ACCOUNT_LINK: 'Don\'t have an account? Sign up here',
		SIGN_IN_ACCOUNT_LINK: 'Already have an account? Sign in here',
		SIGNUP_HEADER_TEXT: 'Sign up',
		SIGNIN_HEADER_TEXT: 'Sign in',

		SIGNUP_ERROR_TEXT: 'Couldn\'t complete registration due to errors',
		ENTER_ACCOUNT_EMAIL: 'Enter your account email.',
		RESEND_VERIFICATION_EMAIL: 'Resend Verification Email',
		SAVE_CHANGES: 'Save',
		CANCEL_BTN: 'Cancel',

		EDIT_PROFILE: 'Edit your profile',
		UPDATE_PROFILE_BTN: 'Update Profile',
		PROFILE_SAVE_SUCCESS: 'Profile saved successfully',
		PROFILE_SAVE_ERROR: 'Could\'t Save Your Profile.',
		CONNECTED_SOCIAL_ACCOUNTS: 'Connected social accounts',
		CONNECT_OTHER_SOCIAL_ACCOUNTS: 'Connect other social accounts',

		FORGOT_PASSWORD_LINK: 'Forgot your password?',
		REVERIFY_ACCOUNT_LINK: 'Resend your verification email',

		SIGNIN_BTN: 'Sign in',
		SIGNUP_BTN: 'Sign up',
		SAVE_PASSWORD_BTN: 'Save Password',

		SUCCESS_HEADER: 'Almost there... Just one more step!',
		SUCCESS_TEXT: 'Please verify your account by clicking the activation link sent to your email inbox. Then you will be all set!',
		VERIFICATION_EMAIL_SENT: 'Verification Email has been Sent',
		VERIFICATION_EMAIL_SENT_TO: 'A verification email has been sent to',
		NOT_ACTIVATED_YET: '',
		BEFORE_YOU_CONTINUE: 'If you do not receive the activation email within 24 hrs, please contact the FormSG team at',
		CHECK_YOUR_EMAIL: '',
		CONTINUE: 'Continue',

		PASSWORD_RESTORE_HEADER: 'Restore your password',
		ENTER_YOUR_EMAIL: 'Enter your account email.',
		SUBMIT_BTN: 'Submit',

		ASK_FOR_NEW_PASSWORD: 'Ask for new password reset',
		PASSWORD_RESET_INVALID: 'Password reset is invalid',
		PASSWORD_RESET_SUCCESS: 'Passport successfully reset',
		PASSWORD_CHANGE_SUCCESS: 'Passport successfully changed',
		RESET_PASSWORD: 'Reset your password',
		CHANGE_PASSWORD: 'Change your password',

		CONTINUE_TO_LOGIN: 'Continue to login page',

		VERIFY_SUCCESS: 'Account successfully activated',
		VERIFY_ERROR: 'Verification link is invalid or has expired'
	});

	$translateProvider.preferredLanguage('en')
		.fallbackLanguage('en')
		.useSanitizeValueStrategy('escape');

}]);
