import { chat_message_debounced } from "../debounce.js";

Hooks.on( "targetToken", function ( user, token, targeted )
{

    if ( user.id !== game.user.id )
    {
        return;
    }

    const select = game.settings.get( "token-target-notify", "Select" );
    const deselect = game.settings.get( "token-target-notify", "Deselect" );
    const bold_names = game.settings.get( "token-target-notify", "boldNames" );
    const clr_select = game.settings.get( "token-target-notify", "targetColor" );
    const clr_deselect = game.settings.get( "token-target-notify", "deselectColor" );

    let style_select = `color: ${ clr_select };`;
    let style_deselect = `color: ${ clr_deselect };`;
    let style_name = bold_names ? `font-weight: bold;` : "";

    let message = '';

    if ( targeted && select )
    {
        message = `<span style="${ style_select }"><span style="${ style_name }">${ user.name }</span> is now targeting <span style="${ style_name }">${ token.name }</span>.</span>`;
    }

    else if ( !targeted && deselect )
    {
        message = `<span style="${ style_deselect }"><span style="${ style_name }">${ user.name }</span> is no longer targeting <span style="${ style_name }">${ token.name }</span>.</span>`;
    }

    if ( message.length !== 0 )
    {

        const speaker = {
            alias: user.character?.name || user.name, actor: user.character?.actor?.id, token: user.character?.token?.id, scene: canvas.scene.id
        };

        chat_message_debounced( message, speaker );
    }
} );