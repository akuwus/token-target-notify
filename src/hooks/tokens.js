import { chat_message_debounced } from "../debounce.js";

let token_targets = {};

Hooks.on( "targetToken", function ( user, token, targeted )
{
    if ( targeted )
    {
        if ( !token_targets[ token.id ] )
        {
            token_targets[ token.id ] = [];
        }
        token_targets[ token.id ].push( user.id );
    }
    else
    {
        if ( token_targets[ token.id ] )
        {
            token_targets[ token.id ] = token_targets[ token.id ].filter( uid => uid !== user.id );
        }
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
            alias: user.character?.name || user.name,
            actor: user.character?.actor?.id,
            token: user.character?.token?.id,
            scene: canvas.scene.id
        };

        chat_message_debounced( message, speaker );
    }
} );

Hooks.on( "hoverToken", function ( token, hovered )
{
    const show_token_targets = game.settings.get( "token-target-notify", "tokenTargets" );

    if ( hovered && show_token_targets )
    {
        const targeters = token_targets[ token.id ] || [];
        if ( targeters.length > 0 )
        {
            const avatars = targeters.map( uid =>
            {
                const user = game.users.get( uid );
                return user.avatar ? `<img src="${ user.avatar }" alt="${ user.name }" title="${ user.name }" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 5px;">` : '';
            } ).join( '' );

            const tokenPos = token.getCenter();
            const canvasPos = canvas.stage.worldTransform.apply( tokenPos );

            let hoverDiv = $( `<div class="hover-token-targeters" style="position: absolute; pointer-events: none; transform: translate(-50%, -50%);">${ avatars }</div>` );

            hoverDiv.css( {
                top: canvasPos.y + 'px',
                left: canvasPos.x + 'px'
            } );

            $( 'body' ).append( hoverDiv );

            const updatePosition = () =>
            {
                const newCanvasPos = canvas.stage.worldTransform.apply( tokenPos );
                hoverDiv.css( {
                    top: newCanvasPos.y + 'px',
                    left: newCanvasPos.x + 'px'
                } );
            };

            canvas.stage.on( 'mousemove', updatePosition );
            canvas.stage.on( 'wheel', updatePosition );

            hoverDiv.on( 'remove', () =>
            {
                canvas.stage.off( 'mousemove', updatePosition );
                canvas.stage.off( 'wheel', updatePosition );
            } );
        }
    }
    else
    {
        $( '.hover-token-targeters' ).remove();
    }
} );
