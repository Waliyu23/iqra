<?php
/**
 * Iqra Bookshop integration helpers.
 *
 * Drop this file into the active WordPress theme's `functions.php`
 * or include it from there.
 */

if (!defined('ABSPATH')) {
    exit;
}

function iqra_register_product_cpt() {
    register_post_type('iqra_product', array(
        'labels' => array(
            'name' => 'Products',
            'singular_name' => 'Product',
            'add_new_item' => 'Add New Product',
            'edit_item' => 'Edit Product',
        ),
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-cart',
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail'),
        'taxonomies' => array('iqra_product_category'),
        'has_archive' => true,
        'rewrite' => array('slug' => 'products'),
    ));

    register_taxonomy('iqra_product_category', array('iqra_product'), array(
        'labels' => array(
            'name' => 'Product Categories',
            'singular_name' => 'Product Category',
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => true,
        'rewrite' => array('slug' => 'product-category'),
    ));
}
add_action('init', 'iqra_register_product_cpt');

function iqra_seed_product_categories() {
    $categories = array(
        'Islamic Books',
        'Islamic Electronics',
        "Children's Learning",
        'Islamic Home Decor',
        'Gifts & Accessories',
    );

    foreach ($categories as $category_name) {
        if (!term_exists($category_name, 'iqra_product_category')) {
            wp_insert_term($category_name, 'iqra_product_category', array(
                'slug' => sanitize_title($category_name),
            ));
        }
    }
}
add_action('init', 'iqra_seed_product_categories', 20);

function iqra_allow_rest_cors($served, $result, $request, $server) {
    $origin = get_http_origin();
    if ($origin) {
        header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Vary: Origin');
    } else {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    }

    return $served;
}
add_filter('rest_pre_serve_request', 'iqra_allow_rest_cors', 10, 4);

function iqra_register_product_meta() {
    $fields = array(
        'iqra_price' => 'number',
        'iqra_compare_at_price' => 'number',
        'iqra_sku' => 'string',
        'iqra_stock_quantity' => 'number',
        'iqra_is_active' => 'boolean',
        'iqra_is_featured' => 'boolean',
        'iqra_is_bestseller' => 'boolean',
        'iqra_is_new_arrival' => 'boolean',
        'iqra_rating' => 'number',
        'iqra_review_count' => 'number',
        'iqra_product_image' => 'string',
        'iqra_short_description' => 'string',
    );

    foreach ($fields as $key => $type) {
        register_post_meta('iqra_product', $key, array(
            'type' => $type,
            'single' => true,
            'show_in_rest' => true,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
            'sanitize_callback' => function ($value) use ($type) {
                if ($type === 'boolean') {
                    return !empty($value);
                }

                if ($type === 'number') {
                    return is_numeric($value) ? 0 + $value : 0;
                }

                return sanitize_text_field($value);
            },
        ));
    }
}
add_action('init', 'iqra_register_product_meta');

function iqra_add_product_meta_boxes() {
    add_meta_box(
        'iqra_product_details',
        'Product Details',
        'iqra_render_product_meta_box',
        'iqra_product',
        'normal',
        'high'
    );

    add_meta_box(
        'iqra_product_category_selector',
        'Product Category',
        'iqra_render_product_category_box',
        'iqra_product',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'iqra_add_product_meta_boxes');

function iqra_render_product_category_box($post) {
    wp_nonce_field('iqra_save_product_meta', 'iqra_product_meta_nonce');

    $terms = get_terms(array(
        'taxonomy' => 'iqra_product_category',
        'hide_empty' => false,
    ));
    $selected = wp_get_post_terms($post->ID, 'iqra_product_category', array('fields' => 'ids'));
    $selected_id = !empty($selected) ? (int) $selected[0] : 0;

    echo '<p><label for="iqra_product_category">Select the storefront category.</label></p>';
    echo '<select id="iqra_product_category" name="iqra_product_category" style="width:100%;">';
    echo '<option value="0">Select category</option>';

    foreach ($terms as $term) {
        printf(
            '<option value="%d" %s>%s</option>',
            (int) $term->term_id,
            selected($selected_id, (int) $term->term_id, false),
            esc_html($term->name)
        );
    }

    echo '</select>';
}

function iqra_render_product_meta_box($post) {
    wp_nonce_field('iqra_save_product_meta', 'iqra_product_meta_nonce');

    $meta = array(
        'iqra_short_description' => get_post_meta($post->ID, 'iqra_short_description', true),
        'iqra_price' => get_post_meta($post->ID, 'iqra_price', true),
        'iqra_compare_at_price' => get_post_meta($post->ID, 'iqra_compare_at_price', true),
        'iqra_sku' => get_post_meta($post->ID, 'iqra_sku', true),
        'iqra_stock_quantity' => get_post_meta($post->ID, 'iqra_stock_quantity', true),
        'iqra_is_active' => get_post_meta($post->ID, 'iqra_is_active', true),
        'iqra_is_featured' => get_post_meta($post->ID, 'iqra_is_featured', true),
        'iqra_is_bestseller' => get_post_meta($post->ID, 'iqra_is_bestseller', true),
        'iqra_is_new_arrival' => get_post_meta($post->ID, 'iqra_is_new_arrival', true),
        'iqra_rating' => get_post_meta($post->ID, 'iqra_rating', true),
        'iqra_review_count' => get_post_meta($post->ID, 'iqra_review_count', true),
        'iqra_product_image' => get_post_meta($post->ID, 'iqra_product_image', true),
    );
    ?>
    <style>
        .iqra-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .iqra-grid label, .iqra-grid .full { display: flex; flex-direction: column; gap: 6px; }
        .iqra-grid input[type="text"], .iqra-grid input[type="number"], .iqra-grid textarea { width: 100%; }
        .iqra-grid .full { grid-column: 1 / -1; }
    </style>
    <div class="iqra-grid">
        <label class="full">
            <span>Short Description</span>
            <textarea name="iqra_short_description" rows="3"><?php echo esc_textarea($meta['iqra_short_description']); ?></textarea>
        </label>
        <label>
            <span>Price</span>
            <input type="number" step="0.01" name="iqra_price" value="<?php echo esc_attr($meta['iqra_price']); ?>" />
        </label>
        <label>
            <span>Compare At Price</span>
            <input type="number" step="0.01" name="iqra_compare_at_price" value="<?php echo esc_attr($meta['iqra_compare_at_price']); ?>" />
        </label>
        <label>
            <span>SKU</span>
            <input type="text" name="iqra_sku" value="<?php echo esc_attr($meta['iqra_sku']); ?>" />
        </label>
        <label>
            <span>Stock Quantity</span>
            <input type="number" name="iqra_stock_quantity" value="<?php echo esc_attr($meta['iqra_stock_quantity']); ?>" />
        </label>
        <label>
            <span>Rating</span>
            <input type="number" step="0.1" min="0" max="5" name="iqra_rating" value="<?php echo esc_attr($meta['iqra_rating']); ?>" />
        </label>
        <label>
            <span>Review Count</span>
            <input type="number" name="iqra_review_count" value="<?php echo esc_attr($meta['iqra_review_count']); ?>" />
        </label>
        <label class="full">
            <span>Product Image URL</span>
            <input type="text" name="iqra_product_image" value="<?php echo esc_attr($meta['iqra_product_image']); ?>" />
        </label>
        <label><span><input type="checkbox" name="iqra_is_active" <?php checked($meta['iqra_is_active'], '1'); ?> /> Active</span></label>
        <label><span><input type="checkbox" name="iqra_is_featured" <?php checked($meta['iqra_is_featured'], '1'); ?> /> Featured</span></label>
        <label><span><input type="checkbox" name="iqra_is_bestseller" <?php checked($meta['iqra_is_bestseller'], '1'); ?> /> Bestseller</span></label>
        <label><span><input type="checkbox" name="iqra_is_new_arrival" <?php checked($meta['iqra_is_new_arrival'], '1'); ?> /> New Arrival</span></label>
    </div>
    <?php
}

function iqra_save_product_meta($post_id) {
    if (!isset($_POST['iqra_product_meta_nonce']) || !wp_verify_nonce($_POST['iqra_product_meta_nonce'], 'iqra_save_product_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = array(
        'iqra_short_description',
        'iqra_price',
        'iqra_compare_at_price',
        'iqra_sku',
        'iqra_stock_quantity',
        'iqra_rating',
        'iqra_review_count',
        'iqra_product_image',
    );

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field(wp_unslash($_POST[$field])));
        }
    }

    foreach (array('iqra_is_active', 'iqra_is_featured', 'iqra_is_bestseller', 'iqra_is_new_arrival') as $field) {
        update_post_meta($post_id, $field, isset($_POST[$field]) ? '1' : '0');
    }

    if (isset($_POST['iqra_product_category'])) {
        $term_id = (int) $_POST['iqra_product_category'];
        if ($term_id > 0) {
            wp_set_post_terms($post_id, array($term_id), 'iqra_product_category', false);
        }
    }
}
add_action('save_post_iqra_product', 'iqra_save_product_meta');

function iqra_rest_product($post) {
    $terms = wp_get_post_terms($post->ID, 'iqra_product_category', array('fields' => 'all'));
    $category = !empty($terms) ? $terms[0] : null;

    return array(
        'id' => (int) $post->ID,
        'name' => get_the_title($post),
        'slug' => $post->post_name,
        'description' => apply_filters('the_content', $post->post_content),
        'shortDescription' => get_post_meta($post->ID, 'iqra_short_description', true) ?: wp_trim_words(wp_strip_all_tags($post->post_content), 18, ''),
        'price' => (string) get_post_meta($post->ID, 'iqra_price', true),
        'compareAtPrice' => get_post_meta($post->ID, 'iqra_compare_at_price', true) ?: null,
        'categoryId' => $category ? (int) $category->term_id : 0,
        'categoryName' => $category ? $category->name : '',
        'categorySlug' => $category ? $category->slug : '',
        'image' => get_post_meta($post->ID, 'iqra_product_image', true) ?: get_the_post_thumbnail_url($post->ID, 'full') ?: '',
        'sku' => get_post_meta($post->ID, 'iqra_sku', true),
        'stockQuantity' => (int) get_post_meta($post->ID, 'iqra_stock_quantity', true),
        'isActive' => get_post_meta($post->ID, 'iqra_is_active', true) === '1',
        'isFeatured' => get_post_meta($post->ID, 'iqra_is_featured', true) === '1',
        'isBestseller' => get_post_meta($post->ID, 'iqra_is_bestseller', true) === '1',
        'isNewArrival' => get_post_meta($post->ID, 'iqra_is_new_arrival', true) === '1',
        'rating' => (string) get_post_meta($post->ID, 'iqra_rating', true),
        'reviewCount' => (int) get_post_meta($post->ID, 'iqra_review_count', true),
        'tags' => implode(',', wp_get_post_tags($post->ID, array('fields' => 'names'))),
    );
}

function iqra_register_product_rest_routes() {
    register_rest_route('iqra/v1', '/products', array(
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $query = new WP_Query(array(
                'post_type' => 'iqra_product',
                'post_status' => 'publish',
                'posts_per_page' => -1,
            ));

            $items = array();
            foreach ($query->posts as $post) {
                $items[] = iqra_rest_product($post);
            }

            return rest_ensure_response($items);
        },
    ));

    register_rest_route('iqra/v1', '/categories', array(
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $terms = get_terms(array(
                'taxonomy' => 'iqra_product_category',
                'hide_empty' => false,
            ));

            $items = array();
            foreach ($terms as $index => $term) {
                $items[] = array(
                    'id' => (int) $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                    'description' => $term->description,
                    'image' => '',
                    'sortOrder' => $index + 1,
                );
            }

            return rest_ensure_response($items);
        },
    ));
}
add_action('rest_api_init', 'iqra_register_product_rest_routes');
