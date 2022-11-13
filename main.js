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

    <p>There are 2 jars, each of which contains a different number of red and green beads.
    They look something like this:</p>

    <img src="img/jar_40_60.png" alt = "6-4" style="width:10%" float:"left">
    <img src="img/jar_60_40.png" alt="4-6" style="width:10%" float:"right">
    
    <p>The ratio of red:green in the left jar is 60 to 40 and this ratio for the right jar is 40 to 60. </p>

    <p>In each trial, you will be given one of these jars. However, the contents of the jar will be concealed, so that you don't 
    know which one it is. This would look something like this:</p>

    <p><img src="img/jar_covered.png" style="width:20%"</p>

    <p>You will then repeatedly draw a single random bead from the jar. The result of such a draw can be either 
    a single red bead, or a single green bead:</p>

    <img src ="img/single_red_bead_sample.png" style="width:10%" float:"left">
    <img src ="img/single_green_bead_sample.png" style="width:10%" float:"right">

    <p>Based on the colour of the drawn bead, your task is to guess, which of the 2 jars you were given in this trial. But you only need to state a confidence, 
    using a confidence bar. The left circle indicates the jar with majority of red beads and the right circle is indication of 
    the jar with majority of green beads. For instance, if you were strongly confident that the samples are drawn 
    from the jar with majority of red beads, you might choose to place your guess on the confidence scale like
    so (note that the style of the slider you will see in the experiment might look different to that shown here,
    but that should not make a difference):</p>

    <p><img src="img/agent_choices_piechart/5.png"></p>

    <p>If you think it could be a 50-50 chance of either red or green, you might choose to give a confidence like
    this:</p>

    <p><img src="img/agent_choices_piechart/50.png"</p>

    <p>After you have taken a guess, the jars will be randomly shuffled, after which you will repeat
    the task.</p>

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
timeline.push(enter_fullscreen);

// Practice trials, 3 in total, done without an agent

let bead_samples_path;
// const bead_samples_practice1 = [0.1, 0.3, 0.5, 0.2, 0.7];
const bead_sequence = ["red", "red", "green", "red", "green"];
animations.jarEnteringScreen(timeline);
animations.shuffleJars(timeline);
for (let trial = 0; trial < 3; trial++) {
    bead_samples_path = 'img/bead_samples_new/single_' + bead_sequence[trial] + '_bead_sample.png';
    animations.participantChoosingBeadsWithoutAgent(bead_samples_path, timeline);
    animations.participantStateConfidenceWithoutAgent(bead_samples_path, timeline);
    // fixation();
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

    <p>Practice trials are over. Hopefully the task was simple enough to grasp. We're now going to add an
    additional element to the task. You will perform the guesswork just like before, but you will do so alongside other players.
    There are 20 players in total, and two new players will be swapped in for each trial. They will take their turn
    first, picking out beads, making a guess, then replacing the beads back into the jar. You'll be able to see the guess they make, but you won't be
    able to see their beads. This should help you in making your own decision, as their guess provides some extra
    information on which jar might be in front of you both.</p>

    <p>We'll run another 3 practice trials, this time with the additional players. If you're ready to start, go
    ahead and press the 'space' key.</p>

    <p> &lt; Press 'space' to continue &gt; </p>

    `
}
timeline.push(instructions2);

// timeline.push(enter_fullscreen);

let agent_img_path;
let agent_choice_path;
let agent_choice_confidence;
const agent_choices_practice_1 = [15, 50, 30, 20, 90, 50];
const agent_choices_practice_2 = [20, 40, 50, 15, 70, 60];
const bead_samples_practice2 = [0.7, 0.3, 0.4, 0.6, 0.1];
for (let trial = 0; trial < 3; trial++) {
    let agent_img_path_1 = `img/faces/${trial + 1}.png`;
    let agent_img_path_2 = `img/faces/${trial + 2}.png`;

    
    let agent_choice_path_1 = 'img/agent_choices_piechart/' + agent_choices_practice_1[trial] + '.png';
    let agent_choice_path_2 = 'img/agent_choices_piechart/' + agent_choices_practice_2[trial] + '.png';
    
    bead_samples_path = 'img/bead_samples/' + bead_samples_practice2[trial] + '.png';

    animations.jarAgentEnteringScreen(agent_img_path, true, timeline);
    animations.shuffleJars(timeline);
    animations.agentChoosingBeads(agent_img_path, true, timeline);
    animations.agent_viewing_beads(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, true, timeline);
    animations.agentReplacingBeads(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, true, timeline);
    animations.participantChoosingBeads(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, bead_samples_path, true, timeline);
    animations.participantStateConfidence(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, bead_samples_path, timeline);
    // fixation();
}

// timeline.push(exit_fullscreen);

const instructions3 = {
    type: 'html-keyboard-response',
    choices: [' '],
    stimulus: `

    <p>Now you have had a chance to practice the task, we'll do real trials now. It will be greatly speeded up, so
    you can make each guess much more quickly. There will be 115 trials in total. Good luck!</p>

    <p> &lt; Press 'space' to continue &gt; </p>

    `
}
timeline.push(instructions3);

// timeline.push(enter_fullscreen);

// Running the real trials
// I was going to read the choices and beads directly from the text files. But I'm too lazy, and it seems a little
// complicated. So for now, I'll just copy and paste them here.
// const agent_choices_trials_1 = [75, 65, 20, 60, 40, 20, 20, 60, 30, 5, 40, 20, 35, 85, 5, 35, 20, 55, 15, 5, 65, 70, 55, 50, 35, 5, 45, 95, 50, 75, 70, 5, 5, 55, 90, 45, 5, 25, 75, 50, 65, 55, 60, 25, 40, 5, 65, 65, 70, 95, 85, 10, 30, 25, 25, 5, 5, 50, 25, 35, 65, 75, 5, 5, 80, 50, 30, 65, 30, 5, 60, 55, 70, 20, 40, 5, 75, 80, 5, 80, 50, 20, 5, 95, 85, 50, 20, 40, 95, 70, 40, 55, 75, 90, 95, 80, 5, 90, 30, 5, 5, 5, 85, 50, 80, 90, 20, 5, 5, 30, 20, 35, 10, 15, 75];
const agent_choices_trials_1 = [70, 25, 80, 60, 55, 30, 35, 40, 70, 30, 30, 70, 15, 55, 35, 60, 90, 90, 10, 70, 55, 55, 45, 30, 55, 35, 40, 10, 60, 35, 40, 40, 65, 30, 55, 75, 55, 80, 55, 30, 30, 45, 20, 40, 65, 35, 20, 65, 85, 30, 65, 35, 55, 35, 55, 85, 50, 35, 50, 75, 35, 35, 65, 55, 65, 35, 25, 55, 40, 35, 40, 20, 50, 40, 60, 70, 40, 30, 80, 55, 40, 75, 45, 55, 30, 40, 40, 50, 25, 30, 65, 70, 30, 25, 60, 30, 25, 50, 60, 15, 40, 50, 45, 25, 50, 25, 30, 45, 70, 30, 60, 45, 70, 40, 15, 15, 60, 10, 70, 90, 45, 40, 35, 60, 40, 25, 60, 25, 50, 65, 45, 55, 60, 40]
// const agent_choices_trials_2 = [50, 40, 15, 70, 65, 15, 35, 65, 45, 5, 95, 5, 75, 80, 20, 10, 5, 35, 30, 30, 80, 65, 35, 10, 45, 15, 70, 70, 65, 15, 95, 5, 5, 65, 75, 50, 5, 70, 70, 60, 80, 50, 40, 5, 55, 5, 50, 55, 80, 70, 95, 5, 15, 5, 5, 5, 45, 85, 80, 15, 50, 80, 5, 5, 95, 45, 25, 95, 45, 5, 80, 95, 55, 40, 95, 5, 30, 75, 5, 80, 25, 55, 30, 60, 60, 60, 45, 40, 95, 95, 60, 35, 80, 85, 60, 80, 30, 95, 40, 15, 5, 15, 80, 25, 75, 75, 5, 5, 10, 30, 35, 5, 5, 40, 50];
const agent_choices_trials_2 = [60, 25, 40, 40, 55, 50, 70, 95, 20, 40, 60, 50, 65, 55, 30, 50, 45, 35, 80, 40, 75, 55, 65, 50, 65, 30, 60, 65, 75, 75, 40, 60, 55, 40, 55, 55, 15, 30, 65, 90, 40, 65, 65, 35, 45, 45, 60, 60, 60, 40, 55, 65, 35, 45, 55, 60, 70, 80, 60, 75, 75, 75, 25, 35, 45, 65, 55, 10, 50, 55, 50, 30, 40, 50, 35, 50, 60, 50, 50, 35, 40, 10, 35, 90, 75, 40, 85, 40, 70, 70, 45, 50, 70, 25, 40, 70, 70, 50, 60, 35, 85, 60, 80, 45, 60, 55, 60, 35, 50, 65, 40, 45, 20, 80, 60, 75, 30, 55, 40, 25, 45, 80, 55, 50, 95, 25, 40, 85, 30, 55, 85, 65, 40, 50]
// const bead_samples_trials = [3, 4, 5, 1, 1, 5, 5, 3, 4, 6, 1, 5, 4, 2, 6, 5, 7, 3, 7, 7, 1, 2, 4, 3, 3, 7, 3, 2, 5, 4, 1, 7, 7, 3, 1, 4, 7, 2, 1, 3, 2, 4, 6, 5, 5, 6, 3, 3, 2, 2, 1, 7, 7, 6, 6, 7, 6, 2, 3, 6, 4, 2, 6, 6, 1, 5, 5, 1, 5, 7, 3, 3, 3, 4, 3, 6, 4, 1, 6, 2, 4, 4, 6, 1, 2, 3, 4, 4, 1, 2, 2, 5, 2, 1, 2, 4, 6, 1, 5, 6, 7, 6, 1, 3, 1, 2, 5, 7, 7, 5, 5, 7, 7, 4, 2];
const observation = [0.6, 0.4, 0.2, 0.6, 0.6, 0.7, 0.8, 0.3, 0.5, 0.3, 0.7, 0.1, 0.6, 0.5, 0.4, 0.6, 0.6, 0.2, 0.2, 0.4, 0.8, 0.7, 0.3, 0.4, 0.7, 0.8, 0.6, 0.4, 0.7, 0.8, 0.3, 0.4, 0.4, 0.6, 0.6, 0.6, 0.2, 0.9, 0.4, 0.5, 0.5, 0.7, 0.3, 0.7, 0.3, 0.1, 0.5, 0.7, 0.5, 0.3, 0.9, 0.3, 0.3, 0.3, 0.9, 0.7, 0.6, 0.3, 0.4, 0.4, 0.2, 0.7, 0.9, 0.1, 0.4, 0.8, 0.9, 0.5, 0.4, 0.4, 0.5, 0.3, 0.3, 0.6, 0.8, 0.4, 0.7, 0.4, 0.7, 0.7, 0.5, 0.4, 0.6, 0.6, 0.3, 0.8, 0.3, 0.8, 0.4, 0.1, 0.5, 0.8, 0.4, 0.6, 0.4, 0.2, 0.6, 0.3, 0.5, 0.3, 0.6, 0.2, 0.4, 0.7, 0.1, 0.6, 0.6, 0.1, 0.3, 0.5, 0.7, 0.3, 0.2, 0.7, 0.6, 0.4, 0.2, 0.7, 0.8, 0.6, 0.1, 0.8, 0.7, 0.5, 0.7, 0.4, 0.6, 0.5, 0.2, 0.9, 0.4, 0.6, 0.9, 0.2]

for (let trial = 0; trial < 134; trial++) {
    let agent_img_path_1 = `img/faces/${trial % 19 + 1}.png`;
    let agent_img_path_2 = `img/faces/${trial % 19 + 2}.png`;
    let agent_choice_path_1 = 'img/agent_choices_piechart/' + agent_choices_trials_1[trial] + '.png';
    let agent_choice_path_2 = 'img/agent_choices_piechart/' + agent_choices_trials_2[trial] + '.png';
    bead_samples_path = 'img/bead_samples/' + observation[trial] + '.png';

    let p = Math.random() * 1;
    let color;
    if (p <= 0.5){
        color = "red"
    }else {
        color = "green"
    }

    if (trial % 20 == 0){
        animations.attention_check(color, timeline);
    }
    animations.jarAgentEnteringScreen(agent_img_path, false, timeline);
    animations.shuffleJars(timeline);
    // agentChoosingBeads(agent_img_path, false);
    // agent_viewing_beads(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, false);
    // agentReplacingBeads(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, false);
    // participantChoosingBeads(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, bead_samples_path, false);
    animations.participantStateConfidence(agent_img_path_1,agent_img_path_2, agent_choice_path_1,agent_choice_path_2, bead_samples_path, timeline);

    // fixation();
}

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

/* finish connection with pavlovia.org */
// const pavlovia_finish = {
//     type: "pavlovia",
//     command: "finish"
//     };
// timeline.push(pavlovia_finish);

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
