import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ChatEngine = dynamic(() => 
    import("react-chat-engine").then((module) => module.ChatEngine)    
);
const MessageFormSocial = dynamic(() =>
    import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Home() {
    const { username, secret } = useContext(Context);
    const [ showChat, setShowChat ] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof document !== undefined) {
            setShowChat(true);
        }
    }, []);

    useEffect(() => {
        if (username === "" || secret === "") {
            router.push("/");
        }
    }, [username, secret]);

    if (!showChat) return <div/>;

    return (
        <div className='background'>
            <div className='shadow'>
                <ChatEngine
                    height="calc(100vh - 212px)"
                    projectID="61d1cd01-9b33-4bcb-9929-3a77db1f2df3"
                    userName={username}
                    userSecret={secret}
                    renderNewMessageForm={() => <MessageFormSocial/>}
                />
            </div>
        </div>
    );
}
