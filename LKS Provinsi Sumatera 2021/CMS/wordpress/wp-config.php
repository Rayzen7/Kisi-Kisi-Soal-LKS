<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'lksn2021' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '-%oKHw1!U_kv-~GH/yUboLjoF}uxv[~+o(L4NXIEo~()q2}(dD,_J,+,t(Bmi8!3' );
define( 'SECURE_AUTH_KEY',  '-$^EO{50OeY7yw!h7uVZ+)iAvXc-cE}*&|9|YcwIV8}yw]}VGbkmq+naF4n8`3fA' );
define( 'LOGGED_IN_KEY',    ' $>M3~w9z`lo?WFRwrb3l,FL%ii%7ibrSMKw36$8RzQ?ghOJq2e@*2~&tn-J/ (]' );
define( 'NONCE_KEY',        'H{v,5/r&OX+,4/&aX&fq^n2{*yoV+SrO=B=ZAoO<j!xR>P?{p7MG2jGos,:oBzZ<' );
define( 'AUTH_SALT',        'cF9<e1~5nr>w3lG$YPW;@DUcL;?|Nqo;/%Pc^8rJ4Gq|Z:m{{dV{Q*e)8IXj 6R^' );
define( 'SECURE_AUTH_SALT', '-mEne&o!{USNcsv*rUdIBP.zGgw1n.qxlT$!`b;~W]w<Y%7aXFmPu(V$^|sPDDuj' );
define( 'LOGGED_IN_SALT',   'If$4cn-Ez<2Ggd]. Q3Ks@0 3DwM[L6@;=O&Hrei^MNGi^|WQz@:Vc7R$:R&NFS0' );
define( 'NONCE_SALT',       'V[Hx:Aj^rq.RlIE^@!ZxQX4<2Rf}:5;=VKp&|3=!ARWN>u}8^BBK(/k$kfYK#cuX' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
