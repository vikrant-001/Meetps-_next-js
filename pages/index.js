import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
const DUMMY_METUPS = [
    {
        id:'m1',
        title:'My first Metups',
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/278px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
        address:'Kolkata',
        descriptin:'Enjoyed Alot',
    }
]
const HomePage = (props) => {
  return (
    <MeetupList meetups = {props.meetups}/>
  )
}
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;

//   return {
//     props:{
//       meetups:DUMMY_METUPS
//     }
//   }
// }
export async function getStaticProps(){
  const client = await MongoClient.connect('mongodb+srv://MeetupsData:hgJsldGTrfhDcnjo@cluster0.re3sveo.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsColection = db.collection('MeetuPs');

  const meetups = await meetupsColection.find().toArray();
  client.close();
  return {
    props:{
      meetups:meetups.map((meetup) => ({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id : meetup._id.toString(),
      }))
    },
    revalidate:1
  }
}
export default HomePage;

