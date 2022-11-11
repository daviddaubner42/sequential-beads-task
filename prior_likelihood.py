from random import shuffle
import numpy as np
import random

LP = [[0, 0, 2, 2, 1, 1, 1, 0, 0],
      [0, 1, 2, 3, 1, 2, 1, 1, 0],
      [2, 2, 3, 3, 2, 3, 2, 1, 1],
      [2, 3, 3, 3, 3, 3, 3, 2, 1],
      [1, 1, 2, 3, 0, 3, 2, 1, 1],
      [1, 2, 3, 3, 3, 3, 3, 3, 2],
      [1, 1, 2, 3, 2, 3, 3, 2, 2],
      [0, 1, 1, 2, 1, 3, 2, 1, 0],
      [0, 0, 1, 1, 1, 2, 2, 0, 0]]

pairs = []

for p in range(1,10):
    for l in range(1,10):
        for i in range(LP[p-1][l-1]):
            pairs.append((p/10,l/10))
shuffle(pairs)


def round_5(x):
        x_round = round(x * 100)
        # print(x, x_round)
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


L = []
P = []
agent_1 = []
agent_2 = []
for pair in pairs:
    L.append(pair[1])
    P.append(pair[0])
    
    if random.uniform(0,1) <= 0.5:
        p1 = np.random.uniform(max(pair[0]-0.2, 0.05), min(pair[0]+0.2, 0.95), 1)[0]
        p2 = pair[0]*(p1 - 1) / (p1 * (pair[0] - 1) - pair[0] * (1 - p1))
    else:
        p2 = np.random.uniform(max(pair[0]-0.2, 0.05), min(pair[0]+0.2, 0.95), 1)[0]
        p1 = pair[0]*(p2 - 1) / (p2 * (pair[0] - 1) - pair[0] * (1 - p2))
    
    agent_1.append(round_5(p1))
    agent_2.append(round_5(p2))

with open('prior.txt', 'w') as f:
    f.write(str(P))

with open('likelihood.txt', 'w') as f:
    f.write(str(L))

with open('agent_1.txt', 'w') as f:
    f.write(str(agent_1))

with open('agent_2.txt', 'w') as f:
    f.write(str(agent_2))

print(len(L), len(P))