import { reverseObject } from "./utils"

export const SpaceEventsMap: AnyObject = {
    // Normal HTTP code
    429: "RETRY_REQUEST",
    
    // Spaceship Code
    4000: "COOL_DOWN",
    4104: "INVALID_TOKEN",
    4214: "SPACESHIP_IN_TRANSIT",
}


export const ReverseSpaceEventsMap = reverseObject<typeof SpaceEventsMap>(SpaceEventsMap)