function debounce_fnc( func, wait )
{
    let timeout;
    return function ( ...args )
    {
        clearTimeout( timeout );
        timeout = setTimeout( () => func.apply( this, args ), wait );
    };
}

export const chat_message_debounced = debounce_fnc( ( message, speaker ) =>
{
    ChatMessage.create( { content: message, speaker: speaker } );
}, 300 );