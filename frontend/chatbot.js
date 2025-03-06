import React, { useEffect } from "react";

const Chatbot = () => {
    useEffect(() => {
        window.dialogflowMessenger = window.dialogflowMessenger || [];
        window.dialogflowMessenger.push({
            pageId: "TEU_DIALOGFLOW_AGENT_ID"
        });
    }, []);

    return (
        <div>
            <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
            <df-messenger intent="WELCOME" chat-title="LUMIN AI CASINO"
                agent-id="TEU_DIALOGFLOW_AGENT_ID" language-code="pt"></df-messenger>
        </div>
    );
};

export default Chatbot;
