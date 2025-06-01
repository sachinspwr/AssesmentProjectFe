/* eslint-disable no-unused-vars */

export enum Permissions {
  // User Management

  USER_CREATE = 'user_create',

  USER_EDIT = 'user_edit',

  USER_VIEW = 'user_view',

  USER_DELETE = 'user_delete',

  USER_INVITE = 'user_invite',

  USER_SUSPEND = 'user_suspend',

  USER_ACTIVATE = 'user_activate',

  USER_ASSIGN_ROLE = 'user_assign_role',

  USER_REVOKE_ROLE = 'user_revoke_role',

  // Role & Permission Management

  ROLE_CREATE = 'role_create',

  ROLE_EDIT = 'role_edit',

  ROLE_VIEW = 'role_view',

  ROLE_DELETE = 'role_delete',

  ROLE_ASSIGN_PERMISSION = 'role_assign_permission',

  ROLE_VIEW_PERMISSION = 'role_view_permission',

  ROLE_ASSIGN_USER = 'role_assign_user',

  ROLE_REVOKE_USER = 'role_revoke_user',

  // Test & Question Management

  TEST_CREATE = 'test_create',

  TEST_EDIT = 'test_edit',

  TEST_VIEW = 'test_view',

  TEST_DELETE = 'test_delete',

  TEST_PUBLISH = 'test_publish',

  TEST_ARCHIVE = 'test_archive',

  TEST_ASSIGN = 'test_assign',

  QUESTION_CREATE = 'question_create',

  QUESTION_EDIT = 'question_edit',

  QUESTION_VIEW = 'question_view',

  QUESTION_DELETE = 'question_delete',

  QUESTION_IMPORT = 'question_import',

  QUESTION_EXPORT = 'question_export',

  // Attempt Management

  ATTEMPT_START = 'attempt_start',

  ATTEMPT_SUBMIT = 'attempt_submit',

  ATTEMPT_REVIEW = 'attempt_review',

  ATTEMPT_RETAKE = 'attempt_retake',

  ATTEMPT_VIEW = 'attempt_view',

  ATTEMPT_ANALYZE = 'attempt_analyze',

  // Reporting & Analytics

  REPORT_VIEW = 'report_view',

  REPORT_GENERATE = 'report_generate',

  REPORT_EXPORT = 'report_export',

  REPORT_ANALYZE = 'report_analyze',

  REPORT_VIEW_ATTEMPTS = 'report_view_attempts',

  // File Management

  FILE_UPLOAD = 'file_upload',

  FILE_VIEW = 'file_view',

  FILE_DELETE = 'file_delete',

  FILE_EDIT = 'file_edit',

  // Settings & Configuration

  SETTINGS_UPDATE = 'settings_update',

  EMAIL_TEMPLATE_EDIT = 'email_template_edit',

  NOTIFICATION_MANAGE = 'notification_manage',

  THEMES_MANAGE = 'themes_manage',

  FEATURE_TOGGLE = 'feature_toggle',

  // Support & Helpdesk

  SUPPORT_CREATE = 'support_create',

  SUPPORT_VIEW = 'support_view',

  SUPPORT_EDIT = 'support_edit',

  SUPPORT_DELETE = 'support_delete',

  SUPPORT_ASSIGN = 'support_assign',

  SUPPORT_RESOLVE = 'support_resolve',

  // Access Control & Security

  ACCESS_LOG_VIEW = 'access_log_view',

  USER_ACCESS_CONTROL = 'user_access_control',

  API_KEY_CREATE = 'api_key_create',

  API_KEY_REVOKE = 'api_key_revoke',

  TWO_FACTOR_ENABLE = 'two_factor_enable',

  TWO_FACTOR_DISABLE = 'two_factor_disable',

  // Subscription & Plan Management

  SUBSCRIPTION_CREATE = 'subscription_create',

  SUBSCRIPTION_EDIT = 'subscription_edit',

  SUBSCRIPTION_VIEW = 'subscription_view',

  SUBSCRIPTION_DELETE = 'subscription_delete',

  SUBSCRIPTION_ASSIGN = 'subscription_assign',

  SUBSCRIPTION_RENEW = 'subscription_renew',

  SUBSCRIPTION_UPGRADE = 'subscription_upgrade',

  // Custom Permissions (Company/Organization Specific)

  CUSTOM_FEATURE_ACCESS = 'custom_feature_access',

  DATA_EXPORT = 'data_export',

  BRANDING_MANAGE = 'branding_manage',

  ORGANIZATION_MANAGE = 'organization_manage',

  // Tenant (Company) Management

  TENANT_CREATE = 'tenant_create',

  TENANT_EDIT = 'tenant_edit',

  TENANT_VIEW = 'tenant_view',

  TENANT_DELETE = 'tenant_delete',

  TENANT_INVITE_USER = 'tenant_invite_user',

  TENANT_MANAGE_SUBSCRIPTION = 'tenant_manage_subscription',

  TENANT_MANAGE_SETTINGS = 'tenant_manage_settings',

  // Team Management

  TEAM_CREATE = 'team_create',

  TEAM_EDIT = 'team_edit',

  TEAM_VIEW = 'team_view',

  TEAM_DELETE = 'team_delete',

  TEAM_ADD_MEMBER = 'team_add_member',

  TEAM_REMOVE_MEMBER = 'team_remove_member',

  TEAM_ASSIGN_ROLE = 'team_assign_role',

  TEAM_MANAGE_PERMISSIONS = 'team_manage_permissions',

  // Team Member Permissions

  MEMBER_VIEW_TEAMS = 'member_view_teams',

  MEMBER_ACCESS_TEAM_RESOURCES = 'member_access_team_resources',

  MEMBER_CREATE_RESOURCES = 'member_create_resources',

  MEMBER_EDIT_OWN_RESOURCES = 'member_edit_own_resources',

  MEMBER_VIEW_TEAM_MEMBERS = 'member_view_team_members',

  //Custom for tenant

  TENANT_CUSTOM_ROLE_CREATE = 'tenant_custom_role_create',

  TENANT_CUSTOM_ROLE_EDIT = 'tenant_custom_role_edit',

  TENANT_CUSTOM_ROLE_DELETE = 'tenant_custom_role_delete',

  TENANT_CUSTOM_PERMISSION_CREATE = 'tenant_custom_permission_create',

  TENANT_CUSTOM_PERMISSION_ASSIGN = 'tenant_custom_permission_assign',
}
