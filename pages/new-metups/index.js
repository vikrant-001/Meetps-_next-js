import NewMeetupForm from "../../components/meetups/NewMeetupForm";
const NewMeetups = () => {
    const addMeetUpHandeler = async (data) =>{
      console.log(data);
      const response = await fetch('/api/new-metups',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type' : 'application/json'
        }
      });

      const resData = await response.json();
      console.log(resData);
        
    }
  return (
    <NewMeetupForm onAddMeetup = {addMeetUpHandeler} />
  )
}
export default NewMeetups;
