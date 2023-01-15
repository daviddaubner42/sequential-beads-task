import * as animations from "./animations.js";

//////////////////////// Begin experiment timeline ///////////////////////////////


let timeline = [];

// Function to remove data that is not necessary
// jsPsych.data.ignore(['trial_type', 'trial_index', 'time_elapsed', 'internal_node_id', 'stimulus', 'key_press', 'success']);

/* init connection with pavlovia.org */
// const pavlovia_init = {
//     type: "pavlovia",
//     command: "init"
// };
// timeline.push(pavlovia_init);

// const preload = {
//     type: 'preload',
//     auto_preload: true
// };
// timeline.push(preload);

const welcome = {
    type: 'html-keyboard-response',
    stimulus: "Welcome to the experiment. Press any key to begin."
}
timeline.push(welcome);


const instructions = {
    type: 'html-keyboard-response',
    choices: [' '],
    stimulus: `

    <p>This page contains the instructions for the experiment.</p>

    <p>Please read them carefully.</p>

    <p>There are 2 types of jars, A and B, each of which contains a different number of red and green beads.
    The 2 types look something like this:</p>

    <img src="img/jar_40_60.png" alt = "6-4" style="width:10%; margin-right:2%" float:"left">
    <img src="img/jar_60_40.png" alt="4-6" style="width:10%; margin-left:2%" float:"right">
    
    <p>The ratio of red:green in the jar of type A on the left is 60 to 40 and this ratio for the jar of type B on the right
    is 40 to 60. </p>

    <p>In each trial, there will be 10 jars, some of them will be of type A, some of type B, and you will be 
    told the proportion at the beginning of each trial. For example, there may be 7 jars of type A and 3 of type
    B, looking something like this:</p>

    <p><img src="img/ten_jars_70_30.png" alt="7-3" style="width:50%"></p>

    <p>You will be given one of these jars at random. But, you won't know which jar it is you have been given, as it will be
    presented to you covered, so you can't see the contents of the jar. This would look something like this:</p>

    <p><img src="img/jar_covered.png" style="width:20%"</p>

    <p>Before the trial starts, you will be asked to guess, which type of jar was picked. But you only 
    need to state a confidence, using a confidence bar. The left circle indicates the jar type A, 
    with majority of red beads and the right circle is indication of the jar type B, with majority of green beads. 
    For instance, if you were strongly confident that the samples are drawn from the jar type with majority of red beads, 
    you might choose to place your guess on the confidence scale like so:</p>

    <p><img src="img/agent_choices_piechart/5.png"></p>

    <p>If you think it could be a 50-50 chance of either red or green majority, you might choose to give a confidence like
    this:</p>

    <p><img src="img/agent_choices_piechart/50.png"</p>

    <p>After you state your confidence, you will repeatedly draw beads from the chosen jar, one by one. Your draw can 
    be either a single red bead, or a single green bead:</p>

    <img src="img/single_bead_sample_red.png" alt = "single-red" style="width:10%" float:"left">
    <img src="img/single_bead_sample_green.png" alt="single-green" style="width:10%" float:"right">

    <p>After each draw, you will be again asked to state your confidence about which type of jar you are drawing the beads from.</p>

    <p>After you have taken a guess, you will draw another bead. Once you have drawn all ??? beads, you will proceed to the
    next trial, with a different set of 10 jars to choose from.</p>

    <p>Let's do some practice trials, 3 in total. If you're ready to start, and feel that you understand the
    instructions, go ahead and press the 'space' key.</p>

    <p> &lt; Press 'space' to continue &gt; </p>

    `
}
timeline.push(instructions);


const enter_fullscreen = {
    type: 'fullscreen',
    message: '<p>The experiment will switch to full screen mode when you press the button below. You can exit any time by hitting the Esc key.</p>',
    fullscreen_mode: true
}
// timeline.push(enter_fullscreen);

// Practice trials, 3 in total, done without an agent

let bead_samples_path;
const ten_jars_practice = [7, 2, 5];
for (let trial = 0; trial < 1; trial++) {
    let n_red_jars = ten_jars_practice[trial];
    animations.jarChoice(n_red_jars, timeline);
    animations.stateConfidenceWithoutEvidence(n_red_jars, timeline);
    for (let sample = 0; sample < 1; sample++) {
        let colour = Math.random() > 0.5 ? "red" : "green";
        bead_samples_path = "img/single_bead_sample_" + colour + ".png";
        animations.beadChoice(bead_samples_path, timeline);
        animations.stateConfidenceWithEvidence(bead_samples_path, timeline);
    }
}

const exit_fullscreen = {
    type: 'fullscreen',
    message: '<p>Practice trials completed.</p>',
    fullscreen_mode: false
}
// timeline.push(exit_fullscreen);

const instructions2 = {
    type: 'html-keyboard-response',
    choices: [' '],
    stimulus: `

    <p>Practice trials are over. Hopefully the task was simple enough to grasp. 
    We'll do real trials now. It will be greatly speeded up, so
    you can make each guess much more quickly. There will be ??? trials in total. Good luck!</p>

    <p> &lt; Press 'space' to continue &gt; </p>

    `
}
timeline.push(instructions2);


// Running the real trials

for (let trial = 0; trial < 3; trial++) {
    let n_red_jars = Math.ceil(Math.random() * 10);
    animations.jarChoice(n_red_jars, timeline, 100);
    animations.stateConfidenceWithoutEvidence(n_red_jars, timeline);
    for (let sample = 0; sample < 3; sample++) {

        let colour = Math.random()   >= 0.5 ? "red" : "green";
        bead_samples_path = "img/single_bead_sample_" + colour + ".png";
        animations.beadChoice(bead_samples_path, timeline, 100);
        animations.stateConfidenceWithEvidence(bead_samples_path, timeline);
    }
}

// const observation = [0.6, 0.4, 0.2, 0.6, 0.6, 0.7, 0.8, 0.3, 0.5, 0.3, 0.7, 0.1, 0.6, 0.5, 0.4, 0.6, 0.6, 0.2, 0.2, 0.4, 0.8, 0.7, 0.3, 0.4, 0.7, 0.8, 0.6, 0.4, 0.7, 0.8, 0.3, 0.4, 0.4, 0.6, 0.6, 0.6, 0.2, 0.9, 0.4, 0.5, 0.5, 0.7, 0.3, 0.7, 0.3, 0.1, 0.5, 0.7, 0.5, 0.3, 0.9, 0.3, 0.3, 0.3, 0.9, 0.7, 0.6, 0.3, 0.4, 0.4, 0.2, 0.7, 0.9, 0.1, 0.4, 0.8, 0.9, 0.5, 0.4, 0.4, 0.5, 0.3, 0.3, 0.6, 0.8, 0.4, 0.7, 0.4, 0.7, 0.7, 0.5, 0.4, 0.6, 0.6, 0.3, 0.8, 0.3, 0.8, 0.4, 0.1, 0.5, 0.8, 0.4, 0.6, 0.4, 0.2, 0.6, 0.3, 0.5, 0.3, 0.6, 0.2, 0.4, 0.7, 0.1, 0.6, 0.6, 0.1, 0.3, 0.5, 0.7, 0.3, 0.2, 0.7, 0.6, 0.4, 0.2, 0.7, 0.8, 0.6, 0.1, 0.8, 0.7, 0.5, 0.7, 0.4, 0.6, 0.5, 0.2, 0.9, 0.4, 0.6, 0.9, 0.2]

// for (let trial = 0; trial < 134; trial++) {
//     let agent_img_path_1 = `img/faces/${trial % 19 + 1}.png`;
//     let agent_img_path_2 = `img/faces/${trial % 19 + 2}.png`;
//     let agent_choice_path_1 = 'img/agent_choices_piechart/' + agent_choices_trials_1[trial] + '.png';
//     let agent_choice_path_2 = 'img/agent_choices_piechart/' + agent_choices_trials_2[trial] + '.png';
//     bead_samples_path = 'img/bead_samples/' + observation[trial] + '.png';

//     let p = Math.random() * 1;
//     let color;
//     if (p <= 0.5){
//         color = "red"
//     }else {
//         color = "green"
//     }

//     if (trial % 20 == 0){
//         animations.attention_check(color, timeline);
//     }
//     animations.jarAgentEnteringScreen(agent_img_path, false, timeline);
//     animations.shuffleJars(timeline);
//     // agentChoosingBeads(agent_img_path, false);
//     // agent_viewing_beads(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, false);
//     // agentReplacingBeads(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, false);
//     // participantChoosingBeads(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, bead_samples_path, false);
//     animations.participantStateConfidence(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, bead_samples_path, timeline);

//     // fixation();
// }

timeline.push(exit_fullscreen);

const finished = {
    type: 'html-keyboard-response',
    choices: [' '],
    stimulus: `

    <p>The experiment is now complete. Many thanks for your participation.</p>
    <p>Now, we are going to ask you to fill out two questionnaires.</p> 

    <p> &lt; Press 'space' to redirect to the forms &gt; </p>

    `
}
timeline.push(finished);

// /* finish connection with pavlovia.org */
// // const pavlovia_finish = {
// //     type: "pavlovia",
// //     command: "finish"
// //     };
// // timeline.push(pavlovia_finish);

// Getting participant info
const subject_id = jsPsych.data.getURLVariable('participant');
jsPsych.data.addProperties({
    subject_id: subject_id,
});

/* start the experiment */
jsPsych.init({
timeline: timeline,
on_finish: function(){
    window.location = "https://edinburghinformatics.eu.qualtrics.com/jfe/form/SV_e3etDdFBJUrGaR8?participant=" + subject_id;
}
});
