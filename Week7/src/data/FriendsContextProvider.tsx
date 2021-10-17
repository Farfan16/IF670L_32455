import React, {useState} from 'react'
import FriendsContext, {Friend} from "./friend-context";

const FriendsContextProvider: React.FC = props => {
    const [friends, setFriends] = useState<Friend[]>([
        {
            id: 'f1',
            name: 'John Thor',
            photo: ''
        }
    ]);

    const addFriend = (name: string, photo: string) => {
        const newFriend: Friend = {
            id: Math.random().toString(),
            name: name,
            photo: photo
        };

        setFriends((currFriends) => {
            return currFriends.concat(newFriend);
        })
    };
    const updateFriend = () => {};
    const deleteFriend = () => {};

    return(
        <FriendsContext.Provider value={{
            friends,
            addFriend,
            updateFriend,
            deleteFriend
        }}>
            {props.children}
        </FriendsContext.Provider>
    );
}

export default FriendsContextProvider;