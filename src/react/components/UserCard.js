import React from "react";

  const fakeUser = {
    "pictureLocation": null,
    "username": "cheriaa43",
    "displayName": "Cheria Artis",
    "about": "",
    "googleId": null,
    "createdAt": "2020-03-10T14:29:35.595Z",
    "updatedAt": "2020-03-10T14:29:35.595Z"
    };
    
class UserCard extends React.Component {   
    render() {
        return (
          <>
            <img alt="Loading..."
              src={
                fakeUser.pictureLocation
                  ? fakeUser.pictureLocation
                  : "http://clipart-library.com/images/ATbrxjpyc.jpg"
              }
            />
            <h3>{fakeUser.displayName}</h3>
            <p>
              <em>Username:</em> {fakeUser.username}
            </p>
            <p>
              <h4>About Me</h4>
              {fakeUser.about
                ? fakeUser.about
                : "You do not have about details yet"}
            </p>
            <p>
              <em>Created:</em> {new Date(fakeUser.createdAt).toDateString()}
            </p>
            <p>
              <em>Last Updated:</em>{" "}
              {new Date(fakeUser.updatedAt).toDateString()}
            </p>
          </>
        );
    }
}

export default UserCard;