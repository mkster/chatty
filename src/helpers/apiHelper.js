import { useEffect, useState } from "react";


//firebase Query hook returns [] or result and function to refresh result, only gets once
export function useGet(fbQuery, intialState = null){
    const [response, setResponse] = useState(intialState);
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        //fetch from backend
        var unsubscribe;
        function updateGetNetwork() {
            unsubscribe = fbQuery.onSnapshot(function (doc) {
                setResponse(doc.docs);
                unsubscribe(); //immediately unsub since this is a one time operation
            }, function (error) {
                setResponse([])
            });

            //not using get since it cant be canceled on unmount
            /*
            fbQuery.get().then((snapshot) => {
                console.log(snapshot.docs);
                //setResponse(snapshot.docs);
            }).catch((err) => {
                console.log(err);
                setResponse([])
            })
            */
        }
        setResponse(intialState) //reset response to inital state
        updateGetNetwork()
        //TOOD cancel on return
        return unsubscribe;
    }, [refresh, fbQuery, intialState])

    
    function doRefresh(){
        //force update by changing useEffect dep
        setRefresh(!refresh);
    }

    return [response, doRefresh]
}

export function updateQueryResults(query, set) {
    query.get()
        .then(function (querySnapshot) {
            if (querySnapshot.docs.length <= 0){ console.log("query yielded no results"); }
            querySnapshot.forEach(function (doc) {
                doc.ref.update(set)
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
