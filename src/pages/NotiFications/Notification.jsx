import { delteNotification, fetchNotifications } from "@/Redux/ThunkFunction/Notification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Modal from 'react-modal'
import { setNotificationRelatedState } from "@/store/Notification";
import { Typography } from "@mui/material";

const NotiFication = () => {

    const notificationstate = useSelector(state => state.notification.notificationRelatedState);
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.authState.token)
    useEffect(() => {
        dispatch(fetchNotifications({
            token: token
        }))

    }, [])
    console.log("state", notificationstate)

    const markAsRead = (id) => {
        dispatch(delteNotification({
            id: id
        }))
    }

    const closePopUp=()=>{
        dispatch(setNotificationRelatedState({
            ...notificationstate,
            hasNewNotification:false
        }))
    }

    return (
        <Modal


            style={{
                overlay: {
                    backgroundColor: 'transparent', // No background overlay
                },
                content: {
                    top: '10%',
                    right: '0',
                    bottom: '0%',
                    width: '390px', // Adjust width as needed
                    height: '80%', // Adjust height
                    position: 'fixed',
                    borderRadius: '8px',
                    padding: '20px',
                    overflow: 'auto',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginLeft: 900,
                    marginTop: 0
                    // Slide-in effect
                },
            }}


            contentLabel="Right Side Modal"
            isOpen={notificationstate.hasNewNotification}

        >

            <div style={{
                width: 350,
                height: 120,

            }}>
                <div 
                  onClick={closePopUp}
                  
                    style={{
                    marginLeft:320,
                    marginBottom:10,
                    cursor:"pointer"

                }}>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="#000000" stroke-width="2" />
                    <path d="M9 9L15 15M15 9L9 15" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                </svg>
                </div>
                {
                    notificationstate.notificationList?.map((notification) => {
                        return (
                            <div
                                key={notification.id}
                                style={{

                                    backgroundColor: "#F3E6F4",
                                    boxShadow: 12,
                                    borderRadius: 10,
                                    padding: 10,
                                    margin:10

                                }}
                            >
                                <div style={{
                                    flexDirection: "row",
                                    display: "flex",
                                    gap: 10
                                }}>
                                    <div
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: "#870091"
                                        }}
                                    >Notification Number  </div>

                                    <div
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: "#870091"

                                        }}
                                    >{notification.id}</div>



                                </div>
                                <div>{notification.message}</div>
                                <div
                                    onClick={() => markAsRead(notification.id)}


                                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#F3E6F4')}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'purple')}
                                    style={{
                                        backgroundColor: 'purple',
                                        borderRadius: 8,
                                        color: "white",
                                        width: 120,
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        marginTop: 10,
                                        padding:5
                                    }} >
                                    Mark As Read

                                </div>

                            </div>

                        )

                    })


                }
                {notificationstate.notificationList.length==0 && 
                (
                    <div style={{
                        justifyContent:"center",
                        alignItems:"center",
                        textAlign:"center"


                    }}>
                        No New NotiFication

                        </div>
                )
                }


            </div>
        </Modal>
    )

}

export default NotiFication