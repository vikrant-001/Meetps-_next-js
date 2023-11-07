import { MongoClient } from "mongodb";
async function handler (req,res){
    if(req.method === 'POST'){
        const data = req.body;
        console.log("check")
        // const {title,image,address,description} = data;

        const client = await MongoClient.connect('mongodb+srv://MeetupsData:hgJsldGTrfhDcnjo@cluster0.re3sveo.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsColection = db.collection('MeetuPs');
        const result = await meetupsColection.insertOne(data);

        console.log(result);
        client.close();

        res.status(201).json({message:'MeetUp Insterted'});

    }
}
export default handler;