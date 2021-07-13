<?php
/**
 * Functions and definitions for Tuxedo theme.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package tuxedo
 * @subpackage tuxedo/function.php
 * @since 1.0.0
 */

if ( ! function_exists( 'tuxedo_setup' ) ) {

	function tuxedo_setup() {
		
		load_theme_textdomain( 'tuxedo' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 1568, 9999 );
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'experimental-link-color' );
		add_theme_support( 'custom-units' );
		add_editor_style( array( 
			'./inc/patterns/block-style.css'
		) );
	}
}
add_action( 'after_setup_theme', 'tuxedo_setup' );

/**
 * Show '(no title)' in frontend if post has no title to make it selectable
 */
 
add_filter(
	'the_title',
	function( $title ) {
		if ( ! is_admin() && empty( $title ) ) {
			$title = __( '(no title)', 'tuxedo' );
		}
		return $title;
	}
);


/**
 * Enqueue scripts and styles.
 *
 * @since 1.0.0
 *
 * @return void
 */
function tuxedo_scripts() {

	wp_enqueue_style( 'tuxedo-style', get_template_directory_uri() . '/style.css', array(), wp_get_theme()->get( 'Version' ) );

	wp_enqueue_style( 'tuxedo-additional-style', get_template_directory_uri() . '/assets/build/css/tuxedo-public.css', array(), wp_get_theme()->get( 'Version' ) );

	wp_enqueue_script( 'tuxedo-script', get_template_directory_uri() . '/assets/build/js/tuxedo-public-bundle.min.js', array(), wp_get_theme()->get( 'Version' , false ) );
}
add_action( 'wp_enqueue_scripts', 'tuxedo_scripts' );