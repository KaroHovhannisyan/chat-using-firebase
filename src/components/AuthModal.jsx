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
    const [emailExist, setEmailExist] = useState(null);
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
                .catch(() => setEmailExist(true) )
        } else {
            FirebaseApi.signIn({email, password })
                .then(() => setOpen(false))
                .catch(() => setEmailExist(true) )
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
                    { authMode ? <Form>
                        <FormText>Register</FormText>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input invalid={emailExist} type="email" value={email} onChange={({target}) => setEmail(target.value)} />
                            <FormFeedback>Oh noes!s that email is already taken</FormFeedback>
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                            <FormText>Your username must be uniq</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input value={password}
                                   onChange={({target}) => setPassword(target.value)}
                                   type={"password"}/>
                            <FormText>Example help text that remains unchanged.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Avatar</Label><br/>
                            <Avatar name={email}/> or
                            <input
                                onChange={onFileUpload}
                                type="file" name="file" id="file" className="inputfile"/>
                            <label htmlFor="file"> <FaUpload /></label>
                        </FormGroup>
                    </Form> : <Form>
                        <FormText>Login</FormText>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input invalid={emailExist} type="email" value={email} onChange={({target}) => setEmail(target.value)} />
                            <FormFeedback>Oh noes!s that email is already taken</FormFeedback>
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input value={password}
                                   onChange={({target}) => setPassword(target.value)}
                                   type={"password"}/>
                            <FormText>Example help text that remains unchanged.</FormText>
                        </FormGroup>
                    </Form>}
                </ModalBody>
                <Button onClick={changeAuthMode}> {authMode ? "Already have an account ?" : "Don't have an account?"}</Button>
                <ModalFooter>
                    <Button color="primary" onClick={onAuth}>Start Chat</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AuthModal
