import { FilledInput } from '@material-ui/core';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import PhoneIphoneRoundedIcon from '@material-ui/icons/PhoneIphoneRounded';
import React from 'react';
import userLogo from '../../assets/images/user.png';
import { fetchAllUsers } from './all-users.helper';
import "./all-users.styles.css";
export default function MyTweets(props) {
    React.useEffect(() => {
        initialise();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.global.selectedPage]);
    const [allUsers, setAllUsers] = React.useState([])
    const [usersCopy, setUsersCopy] = React.useState([])
    const initialise = async () => {
        try {
            props.showLoader("Fetching All Users")
            let allUsers = await fetchAllUsers();
            setAllUsers(allUsers);
            setUsersCopy(allUsers);
            props.hideLoader();
        } catch (e) {
            props.hideLoader();
        }
    }
    const handleSearchKey = async (event) => {
        setTimeout(() => {
            searchFromKey(event.target.value)
        }, 1500);
    }
    const searchFromKey = async (key) => {
        let filteredResults = []
        if (key === "" || key === undefined)
            filteredResults = usersCopy
        else {
            usersCopy.forEach(tweet => {
                key = key.toUpperCase()
                if (tweet.firstName.toUpperCase().includes(key) || tweet.lastName.toUpperCase().includes(key) || tweet.emailId.toUpperCase().includes(key)) {
                    filteredResults.push(tweet)
                }
            })
        }
        setAllUsers(filteredResults)
    }
    const generateTweets = () => {

        return allUsers.map((tweet, index) => {
            let imgSrc = userLogo;
            return (
                <div className="shadow" style={{ width: "60%", marginLeft: "auto", marginRight: "auto", alignItems: "flex-start", display: "flex", flexDirection: "column", borderRadius: 10, marginBottom: 10 }}>
                    <div style={{ alignItems: "flex-start", display: "inline-flex", width: "100%", padding: 20, borderRadius: 10, borderWidth: 1 }}>
                        <img src={imgSrc} className="rounded-circle" height={40} width={40} style={{ marginRight: 20 }} />
                        <div style={{ width: "100%", justifyContent: "flex-start", display: "inline-flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <div style={{ display: "inline-flex", justifyContent: "space-between", width: "100%" }}>
                                <p style={{ fontFamily: "Barlow-SemiBold", fontSize: 16, margin: 0 }}>{tweet.firstName} {tweet.lastName} <span style={{ color: "GrayText", fontFamily: "OpenSans-Regular", fontSize: 12 }}>@{tweet.loginId}</span></p>
                            </div>
                            <div style={{ flexDirection: "row", display: "inline-flex", alignItems: "center", marginTop: 10 }}>
                                <span height={20} width={20} style={{ marginRight: 5 }} ><AlternateEmailRoundedIcon /></span>
                                <p style={{ marginRight: 10, marginBottom: 0 }}>{tweet.emailId} </p>
                                <span height={20} width={20} style={{ marginRight: 5 }} >{<PhoneIphoneRoundedIcon />}</span>
                                <p style={{ marginRight: 5, marginBottom: 0 }}>{tweet.contactNumber}</p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })
    }
    return (
        <>
            <div className={"h-100"}>
                <div><input className="search-field" type="text" placeholder="Find user by name or email" onChange={handleSearchKey} />
                </div>
                <div>
                    {
                        generateTweets()
                    }
                </div>

            </div>
        </>
    )

}
