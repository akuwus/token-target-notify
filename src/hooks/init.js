Hooks.once( "init", () =>
{
    game.settings.register( "token-target-notify", "Select", {
        name: "Display Selection", hint: "Always display selection", scope: "client", config: true, type: Boolean, default: true, onChange: value => console.log( "Display selection changed to ", value )
    } );

    game.settings.register( "token-target-notify", "Deselect", {
        name: "Display Deselection", hint: "Always display deselection", scope: "client", config: true, type: Boolean, default: true, onChange: value => console.log( "Display deselection changed to ", value )
    } );

    game.settings.register( "token-target-notify", "boldNames", {
        name: "Bold Names", hint: "Bold the name of the player and token.", scope: "client", config: true, type: Boolean, default: true, onChange: value => console.log( "Bold changed to ", value )
    } );

    game.settings.register( "token-target-notify", "targetColor", {
        name: "Target Color", hint: "The color to use when a token is targeted.", scope: "client", config: true, type: String, default: "#FF0000", onChange: value => console.log( "Target Color changed to ", value )
    } );

    game.settings.register( "token-target-notify", "deselectColor", {
        name: "Deselect Color", hint: "The color to use when a token is deselected.", scope: "client", config: true, type: String, default: "#009900", onChange: value => console.log( "Deselect Color changed to ", value )
    } );
} );