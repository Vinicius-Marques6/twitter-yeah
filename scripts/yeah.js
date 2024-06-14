console.log('Yeah!!');

window.addEventListener('load', async function() {
    const cookies = await chrome.cookies.getAll({
        domain: "https://x.com"
    });

    console.log(cookies)

    $('#react-root').prepend(
        $(document.createElement("button")).prop({
            innerHTML: "Click me!"
        }).on('click', function() {
            $.ajax({
                url: "https://x.com/i/api/graphql/oB-5XsHNAbjvARJEc8CZFw/CreateTweet",
                method: 'POST',
                contentType: "application/json; charset=utf-8",
                headers: {
                    "content-type": "application/json",
                    // coisas
                },
                data: JSON.stringify(info)
            })
        })
    )
});

var info = {
    "variables": {
        "tweet_text": "aaa",
        "reply": {
            "in_reply_to_tweet_id": "1801625496733552760",
            "exclude_reply_user_ids": []
        },
        "batch_compose": "BatchSubsequent",
        "dark_request": false,
        "media": {
            "media_entities": [],
            "possibly_sensitive": false
        },
        "semantic_annotation_ids": []
    },
    "features": {
        "communities_web_enable_tweet_community_results_fetch": true,
        "c9s_tweet_anatomy_moderator_badge_enabled": true,
        "tweetypie_unmention_optimization_enabled": true,
        "responsive_web_edit_tweet_api_enabled": true,
        "graphql_is_translatable_rweb_tweet_is_translatable_enabled": true,
        "view_counts_everywhere_api_enabled": true,
        "longform_notetweets_consumption_enabled": true,
        "responsive_web_twitter_article_tweet_consumption_enabled": true,
        "tweet_awards_web_tipping_enabled": false,
        "creator_subscriptions_quote_tweet_preview_enabled": false,
        "longform_notetweets_rich_text_read_enabled": true,
        "longform_notetweets_inline_media_enabled": true,
        "articles_preview_enabled": true,
        "rweb_video_timestamps_enabled": true,
        "rweb_tipjar_consumption_enabled": true,
        "responsive_web_graphql_exclude_directive_enabled": true,
        "verified_phone_label_enabled": false,
        "freedom_of_speech_not_reach_fetch_enabled": true,
        "standardized_nudges_misinfo": true,
        "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": true,
        "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false,
        "responsive_web_graphql_timeline_navigation_enabled": true,
        "responsive_web_enhance_cards_enabled": false
    },
    "queryId": "oB-5XsHNAbjvARJEc8CZFw"
}