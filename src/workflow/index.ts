import {proxyActivities} from "@temporalio/workflow";
import type * as activities from "./../activities/apiCalls";

const {apiCallActivity} = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute'
})


export async function workflow(){
    const activityResponse = await apiCallActivity();
    console.log("Result: ", activityResponse);
} 