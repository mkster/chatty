import { useMemo } from "react";
import { store } from "../services/firebase";
import { updateQueryResults, useGet } from "./apiHelper";

//store some info about a new user
export function dbAddUserEntry(uid){
  store.collection(`users`).add({
    uid: uid,
    bio: "",
    name: getRandomName(),
  });  
}

export async function dbGetUserEntry(uid) {
  const query = store.collection(`users`).where("uid", "==", uid)
  let res = null; 
  await query.get().then((snapshot)=>{
    res = snapshot.docs[0].data();
  }).catch((err)=>{console.log(err);})
  return res;
}

export function useUserEntry(uid){
  //have to use memo for queries so they dont change and retrigger useGet hook
  const initalResult = "";
  const query = useMemo(() => store.collection(`users`).where("uid", "==", uid), [uid])
  const [response, doRefresh] = useGet(query, initalResult);
  let user = response && response[0] && response[0].data() //first result
  if (response === initalResult) user = initalResult;
  return [user, doRefresh]
}

export function setUserBio(uid, bio) {
  const query = store.collection(`users`).where("uid", "==", uid)
  updateQueryResults(query, {bio : bio})
}

export function setUserName(uid, name) {
  const query = store.collection(`users`).where("uid", "==", uid)
  updateQueryResults(query, { name: name })
}

//helper for user creation
function getRandomName(){
  return  randomNames[Math.floor(Math.random() * randomNames.length)];

}

const randomNames = [
  "bassbilge",
  "jinnedmention",
  "suckeddecisive",
  "dostydesert",
  "donnyscrawny",
  "impatientmode",
  "loweropposite",
  "literaturepossession",
  "cheeplosberne",
  "prayswag",
  "boonerismsvolatile",
  "riseshapeless",
  "burgoouniverse",
  "huskeyeballs",
  "cheaterbrogson",
  "sneerclass",
  "sarmingwestern",
  "blumpetdivorce",
  "alarmedclugger",
  "abovethinking",
  "tuffinbouffant",
  "humbleflange",
  "craftinggiggles",
  "cauldrontotalus",
  "smithingconsultant",
  "buoyantstubbs",
  "sendeconomics",
  "draughtexcellent",
  "ptarmiganlose",
  "chicsqueeze",
  "blathersannouncer",
  "lapishansper",
  "bickledegyptian",
  "tomorrowpurchase",
  "optimisticcouch",
  "snoozesnodgrass",
  "savannafuelpump",
  "facedpitch",
  "reginaldconvince",
  "theamycolor",
  "drowsyhumdrum",
  "handmadedivergent",
  "exclaimcolonial",
  "readerstained",
  "complaintbory",
  "freshauthority",
  "bitesizedcoat",
  "subwaymission",
  "staddleuncovered",
  "dreadledrook",
  "mooshroomblathers",
  "opinionone",
  "missiondeft",
  "friendordinary",
  "farassertive",
  "halflingtrumpery",
  "icecreamwilderness",
  "feathersmeese",
  "kelpweighty",
  "lenvillewithout",
  "competentsmite",
  "replaceplanning",
  "spatulashrawns",
  "fickensknife",
  "customkoko",
  "painterserpentine",
  "unreliablehasty",
  "shabbyswoggles"
]