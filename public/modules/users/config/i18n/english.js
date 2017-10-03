'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {
		ACCESS_DENIED_TEXT: 'You need to be logged in to access this page',
		USERNAME_OR_EMAIL_LABEL: 'Username or Email',
		AGENCY_LABEL: 'Agency',
		USERNAME_LABEL: 'Username',
		PASSWORD_LABEL: 'Password',
		CURRENT_PASSWORD_LABEL: 'Old password',
		NEW_PASSWORD_LABEL: 'New password',
		VERIFY_PASSWORD_LABEL: 'Confirm new password',
		UPDATE_PASSWORD_LABEL: 'Update Password',
		FIRST_NAME_LABEL: 'First Name',
		LAST_NAME_LABEL: 'Last Name',
		LANGUAGE_LABEL: 'Language',
		EMAIL_LABEL: 'Email',
		TYPE_OR_SELECT_AGENCY: 'Type or select an agency',

		SIGNUP_ACCOUNT_LINK: 'Don\'t have an account? Sign up here',
		SIGN_IN_ACCOUNT_LINK: 'Already have an account? Sign in here',
		SIGN_IN_FROM_FORGET: 'Back to Sign in',
		SIGNUP_HEADER_TEXT: 'Sign up',
		SIGNIN_HEADER_TEXT: 'Sign in',

		SIGNUP_ERROR_TEXT: 'Couldn\'t complete registration due to errors',
		ENTER_ACCOUNT_EMAIL: 'Enter your email',
		SAVE_CHANGES: 'Save',
		CANCEL_BTN: 'Cancel',

		FORGOT_PASSWORD_LINK: 'Forgot your password?',
		REVERIFY_ACCOUNT_LINK: 'Resend verification email',

		SIGNIN_BTN: 'Sign in',
		SIGNUP_BTN: 'Sign up',
		SAVE_PASSWORD_BTN: 'Change Password',

		SUCCESS_TEXT: 'Please verify your account by clicking the activation link sent to your email inbox.',
		VERIFICATION_EMAIL_SENT: 'Verification email has been sent!',
		VERIFICATION_EMAIL_SENT_TO: 'A verification email has been sent to',
		NOT_ACTIVATED_YET: '',
		RESEND_VERIFY_TEXT: 'If you want to resend the verification email, go ',
		BEFORE_YOU_CONTINUE: 'If you any issues with sign up, please contact the FormSG team at',
		CHECK_YOUR_EMAIL: '',
		CONTINUE: 'Continue',

		PASSWORD_RESTORE_HEADER: 'Restore pass',
		ENTER_YOUR_EMAIL: 'Enter your account email.',
		SUBMIT_BTN: 'Submit',

		ASK_FOR_NEW_PASSWORD: 'Ask for new password reset',
		PASSWORD_RESET_INVALID: 'Password reset is invalid',
		PASSWORD_RESET_SUCCESS: 'Password successfully reset',
		PASSWORD_CHANGE_SUCCESS: 'Password successfully changed',
		RESET_PASSWORD: 'Reset your password',
		CHANGE_PASSWORD: 'Change your password',
		VIEW_ACCOUNT: 'Account details',

		CONTINUE_TO_LOGIN: 'Continue to login page',

		VERIFY_SUCCESS: 'Account successfully activated',
		VERIFY_ERROR: 'Verification link is invalid or has expired'
	});

	$translateProvider.preferredLanguage('en')
		.fallbackLanguage('en')
		.useSanitizeValueStrategy('escape');

}]);
