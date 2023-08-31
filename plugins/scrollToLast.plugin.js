/**
 * @name scrollToLast
 * @author square
 * @description When entering any text channel, scrolls to the bottom and marks it as read.
 * @version 1.1.0
 */

const Patcher = BdApi.Patcher;
const Dispatcher = BdApi.Webpack.getModule(m => m.dispatch && m.subscribe);
const Keybinds = BdApi.Webpack.getByKeys("MARK_CHANNEL_READ");

module.exports = class scrollToLast {

    start() {
        Patcher.after("scrollToLast", Dispatcher, "dispatch", (_, [{ type }]) => {
            if ((type === "CHANNEL_SELECT" || type === "GUILD_SELECT") && /^\/channels\/(?:@me|\d+)\/\d+$/.test(window.location.pathname)) {
                Keybinds.MARK_CHANNEL_READ.action(true);
            }
        });
    }
  
    stop() {
        Patcher.unpatchAll("scrollToLast");
    }
  };