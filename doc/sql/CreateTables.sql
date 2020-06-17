CREATE SCHEMA IF NOT EXISTS `sindh_erp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sindh_erp`;
##
## for Spring Session
##
CREATE TABLE IF NOT EXISTS SPRING_SESSION
(
    PRIMARY_ID            CHAR(36) NOT NULL,
    SESSION_ID            CHAR(36) NOT NULL,
    CREATION_TIME         BIGINT   NOT NULL,
    LAST_ACCESS_TIME      BIGINT   NOT NULL,
    MAX_INACTIVE_INTERVAL INT      NOT NULL,
    EXPIRY_TIME           BIGINT   NOT NULL,
    PRINCIPAL_NAME        VARCHAR(100),

    CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
) ENGINE = InnoDB
  ROW_FORMAT = DYNAMIC;

CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID);
CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME);
CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);


CREATE TABLE IF NOT EXISTS SPRING_SESSION_ATTRIBUTES
(
    SESSION_PRIMARY_ID CHAR(36)     NOT NULL,
    ATTRIBUTE_NAME     VARCHAR(200) NOT NULL,
    ATTRIBUTE_BYTES    BLOB         NOT NULL,

    CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION (PRIMARY_ID) ON DELETE CASCADE
) ENGINE = InnoDB
  ROW_FORMAT = DYNAMIC;


##
## for Application
##
CREATE TABLE IF NOT EXISTS base_users
(
    id               NVARCHAR(64)  NOT NULL,
    password         NVARCHAR(128) NOT NULL,
    name             NVARCHAR(64)  NOT NULL,
    type             VARCHAR(32)   NOT NULL,
    is_enabled       CHAR(1)       NOT NULL,
    created_datetime DATETIME      NOT NULL,
    updated_datetime DATETIME      NOT NULL,

    CONSTRAINT users_pk PRIMARY KEY (id)
) ENGINE InnoDB
  CHARACTER SET utf8
  COLLATE utf8_unicode_ci;

-- [USER] Users
CREATE TABLE `erp_users`
(
    `user_id`        VARCHAR(50)    NOT NULL COMMENT 'UUID version4',                              -- User ID
    `login_id`       VARCHAR(50)    NOT NULL COMMENT 'Login ID',                                   -- Login ID
    `login_password` VARBINARY(250) NOT NULL COMMENT 'HASH String',                                -- Login Password
    `type_code`      VARCHAR(20)    NOT NULL DEFAULT 'NORMAL' COMMENT 'NORMAL(default), ADMIN',    -- User Type
    `status_code`    VARCHAR(20)    NOT NULL DEFAULT 'NORMAL' COMMENT 'NORMAL(default), WITHDRAW', -- Status Code
    `created_date`   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date',     -- Created Date
    `modified_date`  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified Date'     -- Modified Date
)
    COMMENT '[USER] Users';

-- [USER] Users
ALTER TABLE `erp_users`
    ADD CONSTRAINT `PK_erp_users` -- [USER] Users 기본키
        PRIMARY KEY (
                     `user_id` -- User ID
            );

-- [TEMPLATE] Report Templates
CREATE TABLE `erp_templates`
(
    `template_id`   VARCHAR(50)  NOT NULL COMMENT 'Template ID',                            -- Template ID
    `template_name` VARCHAR(100) NOT NULL COMMENT 'Template Name',                          -- Template Name
    `file_name`     VARCHAR(100) NOT NULL COMMENT 'Template File Name',                     -- Template File Name
    `file_path`     VARCHAR(500) NOT NULL COMMENT 'Template File Path',                     -- Template File Path
    `file_size`     FLOAT        NOT NULL COMMENT 'Template File Size',                     -- Template File Size
    `created_date`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date', -- Created Date
    `modified_date` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified Date' -- Modified Date
)
    COMMENT '[TEMPLATE] Report Templates';

-- [TEMPLATE] Report Templates
ALTER TABLE `erp_templates`
    ADD CONSTRAINT `PK_erp_templates` -- [TEMPLATE] Report Templates 기본키
        PRIMARY KEY (
                     `template_id` -- Template ID
            );

-- [PLATFORM] Platforms
CREATE TABLE `erp_platforms`
(
    `platform_id`   VARCHAR(50)  NOT NULL COMMENT 'UUID version4',                      -- Platform ID
    `platform_name` VARCHAR(100) NOT NULL COMMENT 'Platform Name',                          -- Platform Name
    `type_code`     VARCHAR(20)  NOT NULL COMMENT 'DIRECT, NONDIRECT',                      -- Platform Type
    `created_date`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date', -- Created Date
    `modified_date` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified Date' -- Modified Date
)
    COMMENT '[PLATFORM] Platforms';

-- [PLATFORM] Platforms
ALTER TABLE `erp_platforms`
    ADD CONSTRAINT `PK_erp_platforms` -- [PLATFORM] Platforms 기본키
        PRIMARY KEY (
                     `platform_id` -- Platform ID
            );

-- [USER] Roles
CREATE TABLE `erp_roles`
(
    `role_id`       VARCHAR(50)  NOT NULL COMMENT 'UUID version4',                          -- Role ID
    `role_name`     VARCHAR(100) NOT NULL COMMENT 'Role Name',                              -- Role Name
    `created_date`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date', -- Created Date
    `modified_date` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified Date' -- Modified Date
)
    COMMENT '[USER] Roles';

-- [USER] Roles
ALTER TABLE `erp_roles`
    ADD CONSTRAINT `PK_erp_roles` -- [USER] Roles 기본키
        PRIMARY KEY (
                     `role_id` -- Role ID
            );

-- [USER] User Roles
CREATE TABLE `erp_user_roles`
(
    `user_id`      VARCHAR(50) NOT NULL COMMENT 'UUID version4',                         -- User ID
    `role_id`      VARCHAR(50) NOT NULL COMMENT 'UUID version4',                         -- Role ID
    `created_date` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date' -- Created Date
)
    COMMENT '[USER] User Roles';

-- [USER] User Roles
ALTER TABLE `erp_user_roles`
    ADD CONSTRAINT `PK_erp_user_roles` -- [USER] User Roles 기본키
        PRIMARY KEY (
                     `user_id`, -- User ID
                     `role_id` -- Role ID
            );

-- [USER] Permissions
CREATE TABLE `erp_permissions`
(
    `permission_id`   VARCHAR(50)  NOT NULL COMMENT 'UUID version4',                          -- Permission ID
    `permission_name` VARCHAR(100) NOT NULL COMMENT 'Permission Name',                        -- Permission Name
    `created_date`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date', -- Created Date
    `modified_date`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified Date' -- Modified Date
)
    COMMENT '[USER] Permissions';

-- [USER] Permissions
ALTER TABLE `erp_permissions`
    ADD CONSTRAINT `PK_erp_permissions` -- [USER] Permissions 기본키
        PRIMARY KEY (
                     `permission_id` -- Permission ID
            );

-- [PLATFORM] Platform Reports
CREATE TABLE `erp_reports`
(
    `report_id`     VARCHAR(50)  NOT NULL COMMENT 'UUID version4',                          -- Report ID
    `report_name`   VARCHAR(100) NOT NULL COMMENT 'Display Name',                           -- Report Name
    `report_month`  VARCHAR(6)   NOT NULL COMMENT 'Year(4byte) + Month(2byte)',             -- Report Month
    `platform_id`   VARCHAR(50)  NOT NULL COMMENT 'UUID version4',                          -- Platform ID
    `template_id`   VARCHAR(50)  NOT NULL COMMENT 'UUID version4',                          -- Template ID
    `file_name`     VARCHAR(100) NOT NULL COMMENT 'UUID version4.[ext]',                    -- Report  File Name
    `file_path`     VARCHAR(500) NOT NULL COMMENT 'Report  File Path',                      -- Report  File Path
    `file_size`     FLOAT        NOT NULL COMMENT 'Report File Size',                       -- Report File Size
    `created_date`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date', -- Created Date
    `modified_date` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified Date' -- Modified Date
)
    COMMENT '[PLATFORM] Platform Reports';

-- [PLATFORM] Platform Reports
ALTER TABLE `erp_reports`
    ADD CONSTRAINT `PK_erp_reports` -- [PLATFORM] Platform Reports 기본키
        PRIMARY KEY (
                     `report_id` -- Report ID
            );

ALTER TABLE `erp_reports`
    AUTO_INCREMENT = 10000000;

-- [TEMPLATE] Template Publish History
CREATE TABLE `erp_template_publish_histories`
(
    `publish_hist_id` BIGINT      NOT NULL COMMENT 'Publish History ID',                    -- Publish History ID
    `template_id`     VARCHAR(50) NOT NULL COMMENT 'UUID version4',                         -- Template ID
    `platform_id`     VARCHAR(50) NOT NULL COMMENT 'UUID version4',                         -- Platform ID
    `report_month`    VARCHAR(6)  NOT NULL COMMENT 'Year(4byte) + Month(2byte)',            -- Report Month
    `success_flag`    VARCHAR(1)  NOT NULL COMMENT 'Y:Success, N:Fail',                     -- Success Flag
    `description`     LONGTEXT    NULL COMMENT 'Error Description',                         -- Description
    `created_date`    DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date' -- Created Date
)
    COMMENT '[TEMPLATE] Template Publish History';

-- [TEMPLATE] Template Publish History
ALTER TABLE `erp_template_publish_histories`
    ADD CONSTRAINT `PK_erp_template_publish_histories` -- [TEMPLATE] Template Publish History 기본키
        PRIMARY KEY (
                     `publish_hist_id` -- Publish History ID
            );

ALTER TABLE `erp_template_publish_histories`
    MODIFY COLUMN `publish_hist_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Publish History ID';

-- [USER] User Login History
CREATE TABLE `erp_user_login_histories`
(
    `login_hist_id` BIGINT      NOT NULL COMMENT 'Login History ID',                      -- Login History ID
    `user_id`       VARCHAR(50) NOT NULL COMMENT 'User ID',                               -- User ID
    `os`            VARCHAR(50) NOT NULL DEFAULT 'UNKNOWN' COMMENT 'User-Agent의 OS 값',      -- Client OS
    `browser`       VARCHAR(50) NOT NULL DEFAULT 'UNKNOWN' COMMENT 'User-Agent의 브라우저 값',    -- Client Browser
    `ip_address`    VARCHAR(50) NOT NULL COMMENT 'Client IP Address',                     -- Client IP Address
    `created_date`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date' -- Created Date
)
    COMMENT '[USER] User Login History';

-- [USER] User Login History
ALTER TABLE `erp_user_login_histories`
    ADD CONSTRAINT `PK_erp_user_login_histories` -- [USER] User Login History 기본키
        PRIMARY KEY (
                     `login_hist_id` -- Login History ID
            );

ALTER TABLE `erp_user_login_histories`
    MODIFY COLUMN `login_hist_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Login History ID';

-- [USER] Platform Reports History
CREATE TABLE `erp_report_histories`
(
    `report_hist_id` BIGINT       NOT NULL COMMENT 'Report History ID',                     -- Report History ID
    `report_name`    VARCHAR(100) NOT NULL COMMENT 'Display Name',                          -- Report Name
    `report_month`   VARCHAR(6)   NOT NULL COMMENT 'Year(4byte) + Month(2byte)',            -- Report Month
    `platform_id`    VARCHAR(50)  NOT NULL COMMENT 'UUID version4',                         -- Platform ID
    `template_id`    VARCHAR(50)  NOT NULL COMMENT 'UUID version4',                         -- Template ID
    `file_name`      VARCHAR(100) NOT NULL COMMENT 'UUID version4.[ext]',                   -- Report  File Name
    `file_path`      VARCHAR(500) NOT NULL COMMENT 'Report  File Path',                     -- Report  File Path
    `file_size`      FLOAT        NOT NULL COMMENT 'Report File Size',                      -- Report File Size
    `user_id`        VARCHAR(50)  NOT NULL COMMENT 'UUID version4',                         -- Reported User ID
    `created_date`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date' -- Created Date
)
    COMMENT '[USER] Platform Reports History';

-- [USER] Platform Reports History
ALTER TABLE `erp_report_histories`
    ADD CONSTRAINT `PK_erp_report_histories` -- [USER] Platform Reports History 기본키
        PRIMARY KEY (
                     `report_hist_id` -- Report History ID
            );

ALTER TABLE `erp_report_histories`
    MODIFY COLUMN `report_hist_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Report History ID';

-- [USER] User Action History
CREATE TABLE `erp_user_action_histories`
(
    `action_hist_id` BIGINT      NOT NULL COMMENT 'Action History ID',                         -- Action History ID
    `user_id`        VARCHAR(50) NOT NULL COMMENT 'Action User ID',                            -- Action User ID
    `type_code`      VARCHAR(20) NOT NULL COMMENT 'USER, ROLE, PLAFORM, TEMPLATE, PERMISSION', -- Action Type
    `status_code`    VARCHAR(20) NOT NULL COMMENT 'CREATE, UPDATE, DELETE, MAPPING',           -- Action Status
    `description`    LONGTEXT    NULL COMMENT 'Action Object String (ex: JSON)',               -- Action Description
    `ip_address`     VARCHAR(50) NOT NULL COMMENT 'Client IP Address',                         -- Client IP Address
    `created_date`   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date'     -- Created Date
)
    COMMENT '[USER] User Action History';

-- [USER] User Action History
ALTER TABLE `erp_user_action_histories`
    ADD CONSTRAINT `PK_erp_user_action_histories` -- [USER] User Action History 기본키
        PRIMARY KEY (
                     `action_hist_id` -- Action History ID
            );

ALTER TABLE `erp_user_action_histories`
    MODIFY COLUMN `action_hist_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Action History ID';

-- [USER] Role Permissions
CREATE TABLE `erp_role_permissions`
(
    `role_id`       VARCHAR(50) NOT NULL COMMENT 'UUID version4',                         -- Role ID
    `permission_id` VARCHAR(50) NOT NULL COMMENT 'UUID version4',                         -- Permission ID
    `created_date`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date' -- Created Date
)
    COMMENT '[USER] Role Permissions';

-- [USER] Role Permissions
ALTER TABLE `erp_role_permissions`
    ADD CONSTRAINT `PK_erp_role_permissions` -- [USER] Role Permissions 기본키
        PRIMARY KEY (
                     `role_id`, -- Role ID
                     `permission_id` -- Permission ID
            );

-- [USER] User Platforms
CREATE TABLE `erp_user_platforms`
(
    `user_id`       VARCHAR(50) NOT NULL COMMENT 'UUID version4',                          -- User ID
    `platform_id`   VARCHAR(50) NOT NULL COMMENT 'UUID version4',                          -- Platform ID
    `created_date`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Date', -- Created Date
    `modified_date` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified Date' -- Modified Date
)
    COMMENT '[USER] User Platforms';

-- [USER] User Platforms
ALTER TABLE `erp_user_platforms`
    ADD CONSTRAINT `PK_erp_user_platforms` -- [USER] User Platforms 기본키
        PRIMARY KEY (
                     `user_id`, -- User ID
                     `platform_id` -- Platform ID
            );

-- [USER] User Roles
ALTER TABLE `erp_user_roles`
    ADD CONSTRAINT `FK_erp_users_TO_erp_user_roles` -- [USER] Users -> [USER] User Roles
        FOREIGN KEY (
                     `user_id` -- User ID
            )
            REFERENCES `erp_users` ( -- [USER] Users
                                    `user_id` -- User ID
                );

-- [USER] User Roles
ALTER TABLE `erp_user_roles`
    ADD CONSTRAINT `FK_erp_roles_TO_erp_user_roles` -- [USER] Roles -> [USER] User Roles
        FOREIGN KEY (
                     `role_id` -- Role ID
            )
            REFERENCES `erp_roles` ( -- [USER] Roles
                                    `role_id` -- Role ID
                );

-- [PLATFORM] Platform Reports
ALTER TABLE `erp_reports`
    ADD CONSTRAINT `FK_erp_platforms_TO_erp_reports` -- [PLATFORM] Platforms -> [PLATFORM] Platform Reports
        FOREIGN KEY (
                     `platform_id` -- Platform ID
            )
            REFERENCES `erp_platforms` ( -- [PLATFORM] Platforms
                                        `platform_id` -- Platform ID
                );

-- [PLATFORM] Platform Reports
ALTER TABLE `erp_reports`
    ADD CONSTRAINT `FK_erp_templates_TO_erp_reports` -- [TEMPLATE] Report Templates -> [PLATFORM] Platform Reports
        FOREIGN KEY (
                     `template_id` -- Template ID
            )
            REFERENCES `erp_templates` ( -- [TEMPLATE] Report Templates
                                        `template_id` -- Template ID
                );

-- [USER] Role Permissions
ALTER TABLE `erp_role_permissions`
    ADD CONSTRAINT `FK_erp_roles_TO_erp_role_permissions` -- [USER] Roles -> [USER] Role Permissions
        FOREIGN KEY (
                     `role_id` -- Role ID
            )
            REFERENCES `erp_roles` ( -- [USER] Roles
                                    `role_id` -- Role ID
                );

-- [USER] Role Permissions
ALTER TABLE `erp_role_permissions`
    ADD CONSTRAINT `FK_erp_permissions_TO_erp_role_permissions` -- [USER] Permissions -> [USER] Role Permissions
        FOREIGN KEY (
                     `permission_id` -- Permission ID
            )
            REFERENCES `erp_permissions` ( -- [USER] Permissions
                                          `permission_id` -- Permission ID
                );

-- [USER] User Platforms
ALTER TABLE `erp_user_platforms`
    ADD CONSTRAINT `FK_erp_users_TO_erp_user_platforms` -- [USER] Users -> [USER] User Platforms
        FOREIGN KEY (
                     `user_id` -- User ID
            )
            REFERENCES `erp_users` ( -- [USER] Users
                                    `user_id` -- User ID
                );

-- [USER] User Platforms
ALTER TABLE `erp_user_platforms`
    ADD CONSTRAINT `FK_erp_platforms_TO_erp_user_platforms` -- [PLATFORM] Platforms -> [USER] User Platforms
        FOREIGN KEY (
                     `platform_id` -- Platform ID
            )
            REFERENCES `erp_platforms` ( -- [PLATFORM] Platforms
                                        `platform_id` -- Platform ID
                );

