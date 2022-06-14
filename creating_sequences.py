'''
Simple script that creates a random set of bead samples and agent choices for a given number of trials
'''

import numpy as np
import random

class generateTrials:

    def __init__(self, num_trials):
        self.num_trials = num_trials
        self.trials = None
        self.beads = None

    def round_5(self, x):
        x_round = round(x)
        remainder = x_round % 5
        if remainder >= 3:
            num = x_round + 5 - remainder
        else:
            num = x_round - remainder
        if num < 5:
            return 5
        elif num > 95:
            return 95
        else:
            return num

    def main(self):
        np.random.seed(10)
        bead_samples = np.arange(1, 8)
        agent_choices = []
        beads = []
        for trial in range(self.num_trials):
            agent_choices.append(100 - self.round_5((bead_samples[trial % 7] / 7 + np.random.normal(0, 0.2)) * 100))
            beads.append(bead_samples[trial % 7])
        combined_list = list(zip(agent_choices, beads))
        random.shuffle(combined_list)

        self.agent_choice_sequence, self.beads_sequence = zip(*combined_list)

    def write_to_text(self):
        with open('agent_choices.txt', 'w') as f:
            for i in self.agent_choice_sequence:
                f.write("{}, ".format(i))
        with open('beads_sequence.txt', 'w') as f:
            for i in self.beads_sequence:
                f.write("{}, ".format(i))


if __name__ == "__main__":
    test = generateTrials(num_trials=115)
    test.main()
    test.write_to_text()





