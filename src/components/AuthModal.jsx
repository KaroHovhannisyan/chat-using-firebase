import React, {useState, useEffect} from "react";
import { Button, Modal, ModalBody, ModalFooter, Label, Input, FormGroup, Form, FormFeedback, FormText} from 'reactstrap';
import Avatar from 'react-avatar';
import {FaUpload} from "react-icons/fa"
import FirebaseApi from "../api";
import {useSession} from "../hooks/useSession";


const AuthModal = (props) => {
    const { user } = useSession();
    const [open, setOpen] = useState(true);
    const [authMode, setAuthMode] = useState(1); // Show Sign up at first
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError,setPasswordError] = useState(null);
    const [password, setPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if(user && user.email && open){
            setOpen(false)
        }

    },[user]);

    const onAuth = () => {
        if(authMode){ // Register
            FirebaseApi.signUp({email, password })
                .then(() => setOpen(false))
                .catch(() => setEmailError("Email already taken") )
        } else {
            FirebaseApi.signIn({email, password })
                .then(() => setOpen(false))
                .catch(() => setEmailError("Wrong email") )
        }

    };

    const onFileUpload = (e) => {
        const file = e.target.files[0];
        FirebaseApi.uploadFile(file, (data) => {
            setAvatarUrl(file);
        })
    };

    const changeAuthMode = () => {
        setAuthMode(!authMode)
    };

    return (
        <div>
            <Modal returnFocusAfterClose={open} isOpen={open}>
                <ModalBody>
                     <Form>
                        <FormText>{authMode ? "Register": "Login"}</FormText>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input invalid={emailError} type="email" value={email} onChange={({target}) => setEmail(target.value)} />
                            <FormFeedback>Email already taken!!</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input value={password}
                                   invalid={emailError}
                                   onChange={({target}) => setPassword(target.value)}
                                   type={"password"}
                            />
                            <FormFeedback>Wrong Password</FormFeedback>

                        </FormGroup>
                    </Form>
                    {authMode && <FormGroup>
                        <Label for="password">Avatar</Label><br/>
                        <Avatar name={email}/> or
                        <input
                            onChange={onFileUpload}
                            type="file" name="file" id="file" className="inputfile"/>
                        <label htmlFor="file"> <FaUpload /></label>
                    </FormGroup>}
                </ModalBody>
                <FormText
                    style={{textAlign: "center", cursor: "pointer"}}
                    onClick={changeAuthMode}> {authMode ? "Already have an account ?" : "Don't have an account?"}</FormText>
                <ModalFooter>
                    <Button color="primary" onClick={onAuth}>{authMode ? "Register": "Login"} & Start Chat</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AuthModal
