import { MongoClient,ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetails"

const MeetupDetails = (props) => {
  return (
    < MeetupDetail
        image = {props.meetupData.image}
        title = {props.meetupData.title}
        address = {props.meetupData.address}
        description = {props.meetupData.description}/>
  )
}

export async function getStaticPaths(){

  const client = await MongoClient.connect('mongodb+srv://MeetupsData:hgJsldGTrfhDcnjo@cluster0.re3sveo.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsColection = db.collection('MeetuPs');
  const meetups = await meetupsColection.find({},{_id:1}).toArray();
  client.close();
  return {
    fallback:false,
    // paths:[
    //   {
    //     params:{
    //       meetupid:'m1'
    //     },
    //   },
    // ]
    paths:meetups.map(meetup => ({
      params:{meetupid:meetup._id.toString()}
    }))
  }
}

export async function getStaticProps(context){
  const meetupId = context.params.meetupid;
  console.log(meetupId);

  const client = await MongoClient.connect('mongodb+srv://MeetupsData:hgJsldGTrfhDcnjo@cluster0.re3sveo.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsColection = db.collection('MeetuPs');
  let meetupData = await meetupsColection.findOne({_id:new ObjectId(meetupId)});
  console.log(meetupData);
  meetupData = meetupData.toArray()
  return {
    props:{
      meetupData :{
        id:meetupData._id.toString(),
        title:meetupData.title,
        image:meetupData.image,
        address:meetupData.address,
        description:meetupData.description,
      }
    }
  }
}

export default MeetupDetails
