/**
 * Created by thomasnatter on 8/23/16.
 */

export function loadConfig(){
    return { type: "LOAD_CONFIG", payload: {
        url: "api/config"
    }}
}