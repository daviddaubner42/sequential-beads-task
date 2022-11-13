// Creating functions. Most of these are for animations.

// Functions for the practice trials without the agent
// Only jar coming onto the screen
export function jarEnteringScreen (timeline) {
    // let percentage;
    // for (let step = 0; step < 131; step++) {
    //     percentage = step / 2 - 15;
    //     const change_jar_on = {
    //         type: 'html-keyboard-response',
    //         stimulus: `
    //         <img src='img/jar_covered.png'
    //         style="position:absolute;
    //         top:50%;
    //         left:${percentage}%;
    //         margin-top:-233px;
    //         margin-left:-233px;"/>

    //         <p style="position:absolute; top:90%; left:50%; transform: translate(-50%, -50%);">New jar</p>
    //         `,
    //         choices: "NO_KEYS",
    //         trial_duration: 8,
    //     }
    //     timeline.push(change_jar_on);
    // }
    const jar_agent_still = {
        type: 'html-keyboard-response',
        stimulus: `
            <img src='img/jar_covered.png'
            style="position:absolute;
            top:50%;
            left:45%;
            height: 300px;
            margin-top:-233px;
            margin-left:-233px;"/>

            <img src='img/jar_covered.png'
            style="position:absolute;
            top:50%;
            left:65%;
            height: 300px;
            margin-top:-233px;
            margin-left:-233px;"/>

            
            <p style="position:absolute; top:90%; left:50%; transform: translate(-50%, -50%);">New jar</p>
        `,
        choices: "NO_KEYS",
        trial_duration: 800,
    }
    timeline.push(jar_agent_still);
}

// Only jar leaving the screen
export function jarLeavingScreen (timeline) {
    let percentage;
    for (let step = 0; step < 131; step++) {
        percentage = 50 - step / 2;
        const change_jar_off = {
            type: 'html-keyboard-response',
            stimulus: `

            <img src='img/jar_covered.png'
            style="position:absolute;
            top:50%;
            left:${percentage}%;
            margin-top:-233px;
            margin-left:-233px;"/>

            <p style="position:absolute; top:90%; left:50%; transform: translate(-50%, -50%);">New jar and agent</p>

            `,
            choices: "NO_KEYS",
            trial_duration: 8,
        }
        timeline.push(change_jar_off);
    }
}

export function participantChoosingBeadsWithoutAgent (participant_beads_img_path, timeline) {
    let percentage;
    let hand_img_path;
    for (let step = 0; step < 261; step = step + 2) {
        if (step < 100) {
            percentage = step / 2 - 10;
            hand_img_path = 'img/hand_back.png'
        } else {
            percentage = 100 - step / 2;
            hand_img_path = 'img/hand_fist_edited.png'
        }

        const participant_choosing_beads = {
            type: 'html-keyboard-response',
            stimulus: `

            <img src="${hand_img_path}"
            style="position:absolute;
            top:${percentage}%;
            left:50%;
            transform: translate(-50%, -50%) rotate(180deg);
            height:300px;
            width:auto;
            "/>

            <img src='img/jar_covered_opened.png'
            style="position:absolute;
            top:50%;
            left:53%;
            height: 600px;
            margin-top:-430px;
            margin-left:-290px"/>

            <p style="position:absolute;
            top:90%;
            left:50%;
            transform: translate(-50%, -50%);">You are picking beads</p>

            `,
            choices: "NO_KEYS",
            trial_duration: 0.5,
        }
        timeline.push(participant_choosing_beads);
    }

    for (let step = 0; step < 131; step = step + 2) {
        percentage = 120 - step/2;
        const participant_viewing_beads = {
            type: 'html-keyboard-response',
            stimulus: `

            <img src="${participant_beads_img_path}"
            style="position:absolute;
            top:${percentage}%;
            left:25%;
            transform: translate(-50%, -50%);
            height:400px;
            width:auto;
            "/>

            <img src='img/jar_covered_opened.png'
            style="position:absolute;
            top:50%;
            left:53%;
            height: 600px;
            margin-top:-430px;
            margin-left:-290px;"/>

            <p style="position:absolute;
            top:90%;
            left:50%;
            transform: translate(-50%, -50%);">You are picking beads</p>

            `,
            choices: "NO_KEYS",
            trial_duration: 1,
        }
        timeline.push(participant_viewing_beads);
    }

}

export function participantStateConfidenceWithoutAgent (participant_beads_img_path, timeline) {
    const participant_stating_confidence = {
        type: 'html-slider-response',
        stimulus: `

        <div style="z-index: -1">

        <img src="${participant_beads_img_path}"
        style="position:absolute;
        top:55%;
        left:25%;
        transform: translate(-50%, -50%);
        height:400px;
        width:auto;
        "/>

        <img src='img/jar_covered_opened.png'
        style="position:absolute;
        z-index: -1;
        top:50%;
        left:53%;
        height:600px;
        margin-top:-430px;
        margin-left:-290px;"/>

        </div>

        <div style="width:200px;
        margin-bottom: 40px;
        margin-top: 50px;">
        <p>Choose your confidence for the jar which the beads are being drawn from:</p>
        <div style="width:10px; float: left;">
        <p><img src="img/red_jar_piechart.png" style="width:30px; top:43px"/></p>
        </div>
        <div style="width:25px; float: right;">
        <p><img src="img/green_jar_piechart.png" style = "width:30px; top:43px"/></p>
        </div>
        </div>

        `,
        slider_width: 150,
    }
    timeline.push(participant_stating_confidence);
}

////////////////////////////////////////////////////////////////////////////////////////
// The functions with an agent.

// Jar and agent coming onto the screen, and then remaining there for 1 second during practice, and 0.2s during
// real trials.
export function jarAgentEnteringScreen (agent_img_path, practice, timeline) {
    let trialduration1;
    let trialduration2;
    let step_inc;
    if (practice) {
        trialduration1 = 8;
        trialduration2 = 1000;
        step_inc = 2;
    } else {
        trialduration1 = 1;
        trialduration2 = 200;
        step_inc = 4;
    };

    let percentage;
    // for (let step = 0; step < 131; step = step + step_inc) {
    //     percentage = step / 2 - 15;
    //     const change_jar_on = {
    //         type: 'html-keyboard-response',
    //         stimulus: `
    //         <img src='img/jar_covered.png'
    //         style="position:absolute;
    //         top:50%;
    //         left:${percentage}%;
    //         margin-top:-233px;
    //         margin-left:-233px;"/>
            
    //         <img src='img/jar_covered.png'
    //         style="position:absolute;
    //         top:50%;
    //         left:${percentage}%;
    //         margin-top:-233px;
    //         margin-left:-233px;"/>


    //         <p style="position:absolute; top:90%; left:50%; transform: translate(-50%, -50%);">New jar and player</p>
    //         `,
    //         choices: "NO_KEYS",
    //         trial_duration: trialduration1,
    //     }
    //     timeline.push(change_jar_on);
    // }
    const jar_agent_still = {
        type: 'html-keyboard-response',
        stimulus: `
        <img src='img/jar_covered.png'
        style="position:absolute;
        top:50%;
        left:45%;
        height: 300px;
        margin-top:-233px;
        margin-left:-233px;"/>

        <img src='img/jar_covered.png'
        style="position:absolute;
        top:50%;
        left:65%;
        height: 300px;
        margin-top:-233px;
        margin-left:-233px;"/>

        
        <p style="position:absolute; top:90%; left:50%; transform: translate(-50%, -50%);">New jar and players</p>
        `,
        choices: "NO_KEYS",
        trial_duration: trialduration2,
    }
    timeline.push(jar_agent_still);
}

// Jar and agent leaving the screen
export function jarAgentLeavingScreen (agent_img_path, timeline) {
    let percentage;
    for (let step = 0; step < 131; step++) {
        percentage = 50 - step / 2;
        const change_jar_off = {
            type: 'html-keyboard-response',
            stimulus: `

            <img src='img/jar_covered.png'
            style="position:absolute;
            top:50%;
            left:${percentage}%;
            margin-top:-233px;
            margin-left:-233px;"/>

            <p style="position:absolute; top:90%; left:50%; transform: translate(-50%, -50%);">New jar and agent</p>

            `,
            choices: "NO_KEYS",
            trial_duration: 8,
        }
        timeline.push(change_jar_off);
    }
}

export function agentChoosingBeads (agent_img_path, practice, timeline) {
    let trialduration1;
    let step_inc;
    if (practice) {
        trialduration1 = 6;
        step_inc = 2;
    } else {
        trialduration1 = 0.5;
        step_inc = 4;
    };

    let percentage;
    let hand_img_path;
    let hand_img_path_flipped;
    for (let step = 0; step < 261; step = step + step_inc) {
        if (step < 100) {
            percentage = step / 2 - 10;
            hand_img_path = 'img/hand_back.png'
            hand_img_path_flipped = 'img/hand_flipped.png'
        } else {
            percentage = 100 - step / 2;
            hand_img_path = 'img/hand_fist_edited.png'
            hand_img_path_flipped = 'img/fist_flipped.png'
        }

        const agent_choosing_beads = {
            type: 'html-keyboard-response',
            stimulus: `
            
            <img src="${hand_img_path}"
            style="position:absolute;
            top:${percentage}%;
            left:36%;
            transform: translate(-50%, -50%) rotate(180deg);
            height:200px;
            width:auto;
            "/>
            <img src="${hand_img_path_flipped}"
            style="position:absolute;
            top:${percentage}%;
            left:44%;
            transform: translate(-50%, -50%) rotate(180deg);
            height:200px;
            width:auto;
            "/>

            <img src='img/jar_covered_opened.png'
            style="position:absolute;
            top:50%;
            left:45%;
            height: 500px;
            margin-top:-430px;
            margin-left:-290px;"/>

            <img src='img/jar_covered.png'
            style="position:absolute;
            top:50%;
            left:65%;
            height: 300px;
            margin-top:-233px;
            margin-left:-233px;"/>

            <p style="position:absolute;
            top:90%;
            left:50%;
            transform: translate(-50%, -50%);">Players picking beads</p>

            `,
            choices: "NO_KEYS",
            trial_duration: trialduration1,
        }
        timeline.push(agent_choosing_beads);
        
    }
}

export function shuffleJars(timeline){
    let percentage1, percentage2;
    for(let i = 0; i < 3; i++) {
    for(let step = 0; step < 20; step++) {
        percentage1 = step + 45;
        percentage2 = 65 - step;
        const shuffle_jars = {
            type: 'html-keyboard-response',
            stimulus: `

            <img src="img/jar_covered.png"
            style="position:absolute;
            top:50%;
            left:${percentage1}%;
            height:300px;
            margin-top:-233px;
            margin-left:-233px;
            "/>

            <img src="img/jar_covered.png"
            style="position:absolute;
            top:50%;
            left:${percentage2}%;
            height:300px;
            margin-top:-233px;
            margin-left:-233px;
            "/>
            `,
            choices: "NO_KEYS",
            trial_duration: 10,
            }
    timeline.push(shuffle_jars);
        }
    }
}


export function agent_viewing_beads(agent_img_path_1,agent_img_path_2, agent_decision_img_path_1,agent_decision_img_path_2, practice, timeline) {
    let trialduration1;
    let trialduration2;
    if (practice) {
        trialduration1 = 800;
        trialduration2 = 1200;
    } else {
        trialduration1 = 100;
        trialduration2 = 800;
    };

    const agent_viewing_beads = {
        type: 'html-keyboard-response',
        stimulus: `

        <img src='img/jar_covered_opened.png'
        style="position:absolute;
        top:50%;
        left:53%;
        height: 600px;
        margin-top:-430px;
        margin-left:-290px;"/>

        <img src="${agent_img_path_1}"
        style="position:absolute;
        top:10%; 
        left:85%;
        height:200px;
        width:auto"/>

        
        <img src="${agent_img_path_2}"
        style="position:absolute;
        top:50%; 
        left:85%;
        height:200px;
        width:auto"/>

        <img src="img/hand_back.png"
        style="position:absolute;
        top:12%;
        left:88%;
        height:120px;
        width:auto;
        "/>

        <img src="img/hand_flipped.png"
        style="position:absolute;
        top:52%;
        left:88%;
        height:120px;
        width:auto;
        "/>

        
        <p style="position:absolute;
        top:90%;
        left:50%;
        transform: translate(-50%, -50%);">Players making a decision</p>

        `,
        choices: "NO_KEYS",
        trial_duration: trialduration1,
    }
    timeline.push(agent_viewing_beads);

    const agent_decided = {
        type: 'html-keyboard-response',
        stimulus: `

        <img src='img/jar_covered_opened.png'
        style="position:absolute;
        top:50%;
        left:53%;
        height: 600px;
        margin-top:-430px;
        margin-left:-290px;"/>


        <img src="${agent_img_path_1}"
        style="position:absolute;
        top:10%;
        left:85%;
        height:200px;
        width:auto;"/>

        <img src="${agent_img_path_2}"
        style="position:absolute;
        top:50%;
        left:85%;
        height:200px;
        width:auto;"/>

        
        <img src="${agent_decision_img_path_1}"
        style="position:absolute;
        top:27%;
        left:70%;
        height:30px;
        width:auto;"/>

        <img src="${agent_decision_img_path_2}"
        style="position:absolute;
        top:67%;
        left:70%;
        height:30px;
        width:auto;"/>


        <p style="position:absolute;
        top:90%;
        left:50%;
        transform: translate(-50%, -50%);">Players making a decision</p>

        `,
        choices: "NO_KEYS",
        trial_duration: trialduration2,
    }
    timeline.push(agent_decided);
}

export function agentReplacingBeads (agent_img_path_1,agent_img_path_2, agent_decision_img_path_1,agent_decision_img_path_2, practice, timeline) {
    let trialduration1;
    let step_inc;
    if (practice) {
        trialduration1 = 8;
        step_inc = 2;
    } else {
        trialduration1 = 0.5;
        step_inc = 4;
    };

    let percentage;
    let hand_img_path;
    let hand_img_path_flipped;
    for (let step = 0; step < 261; step = step + step_inc) {
        if (step < 100) {
            percentage = step / 2 - 10;
            hand_img_path = 'img/hand_fist_edited.png'
            hand_img_path_flipped = 'img/fist_flipped.png'
        } else {
            percentage = 100 - step / 2;
            hand_img_path = 'img/hand_back.png'
            hand_img_path_flipped = 'img/hand_flipped.png'
        }
        

        const agent_replacing_beads = {
            type: 'html-keyboard-response',
            stimulus: `

            <img src="${hand_img_path}"
            style="position:absolute;
            top:${percentage}%;
            left:46%;
            transform: translate(-50%, -50%) rotate(180deg);
            height:200px;
            width:auto;
            "/>

            <img src="${hand_img_path_flipped}"
            style="position:absolute;
            top:${percentage}%;
            left:54%;
            transform: translate(-50%, -50%) rotate(180deg);
            height:200px;
            width:auto;
            "/>

            <img src='img/jar_covered_opened.png'
            style="position:absolute;
            top:50%;
            left:53%;
            height: 600px;
            margin-top:-430px;
            margin-left:-290px;"/>

            
            <img src="${agent_img_path_1}"
            style="position:absolute;
            top:10%;
            left:85%;
            height:200px;
            width:auto;"/>

            <img src="${agent_img_path_2}"
            style="position:absolute;
            top:50%;
            left:85%;
            height:200px;
            width:auto;"/>


        <img src="${agent_decision_img_path_1}"
        style="position:absolute;
        top:27%;
        left:70%;
        height:30px;
        width:auto;"/>

        <img src="${agent_decision_img_path_2}"
        style="position:absolute;
        top:67%;
        left:70%;
        height:30px;
        width:auto;"/>

            <p style="position:absolute;
            top:90%;
            left:50%;
            transform: translate(-50%, -50%);">Players replacing beads</p>

            `,
            choices: "NO_KEYS",
            trial_duration: trialduration1,
        }
        timeline.push(agent_replacing_beads);
    }
}

export function participantChoosingBeads (agent_img_path_1,agent_img_path_2, agent_decision_img_path_1,agent_decision_img_path_2, participant_beads_img_path, practice, timeline) {
    let trialduration1;
    let step_inc;
    if (practice) {
        trialduration1 = 4;
        step_inc = 2;
    } else {
        trialduration1 = 0.5;
        step_inc = 4;
    };

    let percentage;
    let hand_img_path;
    for (let step = 0; step < 261; step = step + step_inc) {
        if (step < 100) {
            percentage = step / 2 - 10;
            hand_img_path = 'img/hand_back.png'
        } else {
            percentage = 100 - step / 2;
            hand_img_path = 'img/hand_fist_edited.png'
        }

        const participant_choosing_beads = {
            type: 'html-keyboard-response',
            stimulus: `

            <img src="${hand_img_path}"
            style="position:absolute;
            top:${percentage}%;
            left:50%;
            transform: translate(-50%, -50%) rotate(180deg);
            height:200px;
            width:auto;
            "/>

            <img src='img/jar_covered_opened.png'
            style="position:absolute;
            top:50%;
            left:53%;
            height: 600px;
            margin-top:-430px;
            margin-left:-290px;"/>

            <img src="${agent_img_path_1}"
        style="position:absolute;
        top:10%;
        left:85%;
        height:200px;
        width:auto;"/>

        <img src="${agent_img_path_2}"
        style="position:absolute;
        top:50%;
        left:85%;
        height:200px;
        width:auto;"/>

        
        <img src="${agent_decision_img_path_1}"
        style="position:absolute;
        top:27%;
        left:70%;
        height:30px;
        width:auto;"/>

        <img src="${agent_decision_img_path_2}"
        style="position:absolute;
        top:67%;
        left:70%;
        height:30px;
        width:auto;"/>


            <p style="position:absolute;
            top:90%;
            left:50%;
            transform: translate(-50%, -50%);">You are picking beads</p>

            `,
            choices: "NO_KEYS",
            trial_duration: trialduration1,
        }
        timeline.push(participant_choosing_beads);
    }

    for (let step = 0; step < 100; step = step + step_inc) {
        percentage = 100 - step/2;
        const participant_viewing_beads = {
            type: 'html-keyboard-response',
            stimulus: `

            <img src="${participant_beads_img_path}"
            style="position:absolute;
            top:${percentage}%;
            left:25%;
            transform: translate(-50%, -50%);
            height:300px;
            width:auto;
            "/>

            <img src='img/jar_covered_opened.png'
            style="position:absolute;
            top:50%;
            left:53%;
            height: 600px;
            margin-top:-430px;
            margin-left:-290px;"/>

            <img src="${agent_img_path_1}"
        style="position:absolute;
        top:10%;
        left:85%;
        height:200px;
        width:auto;"/>

        <img src="${agent_img_path_2}"
        style="position:absolute;
        top:50%;
        left:85%;
        height:200px;
        width:auto;"/>

        <img src="${agent_decision_img_path_1}"
        style="position:absolute;
        top:27%;
        left:70%;
        height:30px;
        width:auto;"/>

        <img src="${agent_decision_img_path_2}"
        style="position:absolute;
        top:67%;
        left:70%;
        height:30px;
        width:auto;"/>
            <p style="position:absolute;
            top:90%;
            left:50%;
            transform: translate(-50%, -50%);">You are picking beads</p>

            `,
            choices: "NO_KEYS",
            trial_duration: trialduration1,
        }
        timeline.push(participant_viewing_beads);
    }

}

export function participantStateConfidence (agent_img_path_1,agent_img_path_2, agent_decision_img_path_1,agent_decision_img_path_2, participant_beads_img_path, timeline) {
    const participant_stating_confidence = {
        type: 'html-slider-response',
        stimulus: `

        <div style="z-index: -1">

        <img src="${participant_beads_img_path}"
        style="position:absolute;
        top:55%;
        left:25%;
        transform: translate(-50%, -50%);
        height:300px;
        width:auto;
        "/>

        <img src='img/jar_covered_opened.png'
        style="position:absolute;
        z-index: -1;
        top:50%;
        left:53%;
        height: 600px;
        margin-top:-430px;
        margin-left:-290px"/>

        <img src="${agent_img_path_1}"
        style="position:absolute;
        top:10%;
        left:85%;
        height:200px;
        width:auto;"/>

        <img src="${agent_img_path_2}"
        style="position:absolute;
        top:50%;
        left:85%;
        height:200px;
        width:auto;"/>

        <img src="${agent_decision_img_path_1}"
        style="position:absolute;
        top:27%;
        left:70%;
        height:30px;
        width:auto;"/>

        <img src="${agent_decision_img_path_2}"
        style="position:absolute;
        top:67%;
        left:70%;
        height:30px;
        width:auto;"/>
        </div>

        <div style="width:200px;
        margin-bottom: 40px;
        margin-top: 50px;">
        <p style="top:40%;right:0%; position:relative;">Choose your confidence for the jar which the beads are drawn from:</p>
        <div style="width:10px; float: left;">
        <p><img src="img/red_jar_piechart.png" style="width:30px; top:43px"/></p>
        </div>
        <div style="width: 25px; float: right;">
        <p><img src="img/green_jar_piechart.png" style="width:30px; top:43px"/></p>
        </div>
        </div>

        `,
        slider_width: 150,
        data: {participant_response: true, agent_decision_1: agent_decision_img_path_1, agent_decision_2: agent_decision_img_path_2, beads_shown: participant_beads_img_path},
    }
    timeline.push(participant_stating_confidence);
}

export function fixation(timeline) {
    const fixation = {
        type: 'html-keyboard-response',
        stimulus: `<div style="font-size:60px;">+</div>`,
        choices: "NO_KEYS",
        trial_duration: 1000,
    }
    timeline.push(fixation);
}

export function attention_check(color, timeline){

    const attention_check = {
        type : 'html-button-response',
        stimulus : `

        <img src="img/red_jar_piechart.png" alt = "6-4" style="left:46%; top:40% ;width:3%; position:absolute">
        <img src="img/green_jar_piechart.png" alt="4-6" style="left:51%; top:40% ;width:3%; position:absolute">

        `,
        choices : ['Left', 'Right'],
        prompt : "<p>Which piechart indicates majority " + color + " beads?</p>",
        data: {participant_response: true, color: color},

    }
    timeline.push(attention_check);
}
