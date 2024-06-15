$( document ).ready(function() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message === "navigationCompleted") {
            console.log('Navigation completed');
            fazTudo();
            sendResponse({ message: "Yeah!" });
        }
    });
});

function fazTudo() {
    setTimeout( async () => {
        console.log('Yeah!!');

        let ct0;

        await chrome.runtime.sendMessage({ action: 'getCookie' }, function(response) {
            if (response && response.cookies) {
                console.log('Cookies recebidos:', response.cookies);
                ct0 = response.cookies.value;
            } else {
                console.log('Nenhum cookie encontrado ou erro ao obter cookies.');
            }
        });

        const callback = function(mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // Verificar se novos nós foram adicionados
                    if (mutation.addedNodes.length > 0) {
                        $(mutation.addedNodes).each(function() {
                            // Realizar a ação desejada com o novo nó usando jQuery
                            if (this.nodeType === Node.ELEMENT_NODE) {
                                // Checar se o novo nó contém o seguinte elemento com as respectivas classes
                                let tweet = $(this).find('.css-175oi2r.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu')
                                if (tweet.length > 0) {
                                    let id = $(tweet).find('a').eq(2).attr('href').split('/').pop();
                                    console.log($(tweet).find('a').eq(2));

                                    if ($(tweet).find('.yeah-div').length > 0) {
                                        return;
                                    }
                                    
                                    $(tweet).children().last().children().children().children().eq(2).after(
                                        $(document.createElement("div")).prop({
                                            class: "css-175oi2r r-18u37iz r-1h0z5md r-13awgt0 yeah-div"
                                        }).append(
                                            $(document.createElement("button")).prop({
                                                class: "css-175oi2r r-1777fci r-bt1l66 r-bztko3 r-lrvibr r-1loqt21 r-1ny4l3l r-37j5jr",
                                                style: "text-overflow: unset; color: rgb(113, 118, 123);",
                                                innerHTML: "Yeah!"
                                            }).hover(
                                                function() {
                                                    // on mouseover
                                                    $(this).css('color', 'rgb(0, 186, 124)'); // change color to green
                                                }, 
                                                function() {
                                                    // on mouseout
                                                    $(this).css('color', 'rgb(113, 118, 123)'); // change color back to original
                                                }
                                            ).on('click', function() {
                                                $.ajax({
                                                    url: "https://x.com/i/api/graphql/oB-5XsHNAbjvARJEc8CZFw/CreateTweet",
                                                    method: 'POST',
                                                    contentType: "application/json; charset=utf-8",
                                                    headers: {
                                                        "content-type": "application/json",
                                                        "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                                                        "x-csrf-token": ct0,
                                                    },
                                                    data: JSON.stringify(getMessage(id)),
                                                })
                                            })
                                        )
                                    )
                                }
                            }
                        });
                    }
                }
            }
        };

        // Criar um novo observer
        const observer = new MutationObserver(callback);

        // Selecionar o nó do DOM que você quer observar
        const targetNode = document.querySelector('body');

        if (!targetNode) {
            console.error('Nó não encontrado.');
        }

        // Configurar as opções do observer
        const config = {
            childList: true, // Observar a adição ou remoção de nós filhos
            subtree: true    // Observar também os nós descendentes
        };

        // Iniciar o observer
        observer.observe(targetNode, config);

        // $('#react-root').prepend(
        //     $(document.createElement("button")).prop({
        //         innerHTML: "Click me!"
        //     }).on('click', function() {
        //         $.ajax({
        //             url: "https://upload.x.com/i/media/upload.json?command=INIT&total_bytes=31433&media_type=image%2Fjpeg&media_category=tweet_image",
        //             method: 'POST',
        //             headers: {
        //                 "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        //                 "x-csrf-token": ct0,
        //             }
        //         }).done((data) => {
        //             data = JSON.parse(data);
        //             console.log(data);
        //             // $.ajax({
        //             //     url: `https://upload.x.com/i/media/upload.json?command=APPEND&media_id=${data.media_id}&segment_index=0`
        //             // })
        //         })


        //         // $.ajax({
        //         //     url: "https://x.com/i/api/graphql/oB-5XsHNAbjvARJEc8CZFw/CreateTweet",
        //         //     method: 'POST',
        //         //     contentType: "application/json; charset=utf-8",
        //         //     headers: {
        //         //         "content-type": "application/json",
        //         //         "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        //         //         "x-csrf-token": ct0,
        //         //     },
        //         //     data: JSON.stringify(getMessage("1801625496733552760")),
        //         // })
        //     })
        // )
    }, 1000);
}

function getMessage(id) {
    return {
        "variables": {
        "tweet_text": "",
        "reply": {
            "in_reply_to_tweet_id": id,
            "exclude_reply_user_ids": []
        },
        "batch_compose": "BatchSubsequent",
        "dark_request": false,
        "media": {
            "media_entities": [
                {
                    "media_id": "1801793988610895872",
                    "tagged_users": []
                }
            ],
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
}