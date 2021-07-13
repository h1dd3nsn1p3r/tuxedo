<?php
/**
 * Entry point.
 * Without this file, WordPress will consider the theme is broken.
 * @package tuxedo/index.php
 */

if ( current_user_can( 'activate_plugins' ) ) {

	esc_html_e( 'This Theme was built for the WordPress experimental Full Site Editing feature. You need to install and activate the Gutenberg plugin to make it work. ', 'tuxedo' );
}

