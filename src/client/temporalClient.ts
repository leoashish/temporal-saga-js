import {Connection, WorkflowClient} from "@temporalio/client"

export async function runClient(){
    const connection = await Connection.connect();
    const client =  new WorkflowClient({connection});

    const handle = await client.start('workflow',{
        taskQueue: "apiCalls",
        workflowId: "API-CALLS-1",
        args: []
    })
    console.log(`Started Workflow ${handle.workflowId}`)
}
