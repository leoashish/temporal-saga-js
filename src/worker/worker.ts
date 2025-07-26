import { NativeConnection, Worker }  from "@temporalio/worker";
const address = process.env.TEMPORAL_ADDRESS || 'localhost:7233';

async function runWorkerWithRetry() {
    while (true) {
        try {
            const connection = await NativeConnection.connect({ address });
            const worker = await Worker.create({
                workflowsPath: require.resolve("./../workflow/index"),
                activities: require("./../activities/apiCalls"),
                taskQueue: "apiCalls",
                connection,
            });
            await worker.run();
            break;
        } catch (err) {
            console.error("Worker failed to connect, retrying in 5 seconds...", err);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

runWorkerWithRetry();

