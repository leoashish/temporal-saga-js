import axios from "axios";

const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL;
export async function apiCallActivity(){
    await axios.post(EXTERNAL_API_URL!, {
        title:"Hello World",
        body:"This is a test post",
    }).catch(err => {
        console.error("Error making API call:", err);
        throw err;
    });

    var result = await axios.get(EXTERNAL_API_URL!,).catch(err => {
        console.error("Error making API call:", err);
        throw err;
    });

    console.log("Result: ", result.data);
    var finalResult = await axios.get(`${EXTERNAL_API_URL!}/${result.data[0].id}`,).catch(err => {
        console.error("Error making API call:", err);
        throw err;
    });

    console.log("Final Result: ", finalResult.data);
}