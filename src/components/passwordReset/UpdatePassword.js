import React, { useState } from "react";
import Card from "../../util/card/card";

export const UpdatePassword = props => {
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ error, setError ] = useState();

    const changePasswordHandler = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            throw new Error("Password Must Match!");
        }
        //spinner
        try {
            const response = await fetch(`http://localhost:5000/${props.user.username}/change_password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: password
                })
            })
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData);
            }
        } catch(err) {
            setError(err.message)
        }
    };

    const filteredPassword = password.filter(item => item === confirmPassword);
    console.log("filteredPassword in updatePassword component", filteredPassword);

    return (
        <React.Fragment>
            <Card displayProps={error}>
                <div>
                    <label>Re-enter Password</label>
                    <input type="text" placeholder="password" 
                       onChange={(event) => setConfirmPassword(event.target.value)} />
                </div>
                <div>
                    <form onSubmit={changePasswordHandler}>
                        <label>Enter New Password</label>
                        <input type="text" placeholder="password" 
                            onChange={(event) => setPassword(event.target.value)} /><br />
                        <button type="submit">Change Password</button>
                    </form>
                </div>
            </Card>
        </React.Fragment>
    );
};