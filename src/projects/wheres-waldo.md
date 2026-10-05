---
title: Where's Waldo? detector
summary: A single-shot detector that finds Waldo in cluttered puzzle illustrations, adapted from a strawberry-detection paper.
period: Jan to Mar 2026
type: Machine learning
context: COMP 4360 Machine Learning, University of Manitoba
team: Team of 3
stack: [Python, PyTorch, MobileNet V3, SSD, OpenCV]
order: 2
repo: https://github.com/satyambhanot/wheres-waldo-comp4360
---

## The problem

Waldo is tiny, and puzzle illustrations are full of red-and-white distractors. We started from a paper that detected strawberries in field video (Lamb and Chuah, IEEE Big Data 2018). Then we asked how far its approach could go on a much harder target.

## What we built

- **A stronger backbone.** We replaced the paper's three-layer CNN with a pretrained MobileNet V3 Large and increased the SSD detection heads from four levels to six.
- **Preprocessing aimed at Waldo's stripes.** Dual HSV colour masks pick out red and white, and a Sobel edge map is added as a fourth input channel.
- **Tiling.** Each puzzle is sliced into overlapping tiles at 64, 128, and 256 px, and the model predicts boxes on each tile.

## Decisions that mattered

1. **Split by image, not by tile.** Tiles from the same puzzle overlap. If they landed in both the training and test sets, the scores would look better than they really are. The 19 puzzles were split 11 / 3 / 5 for training, validation, and testing.
2. **Treat the imbalance as the main problem.** At 256 px only about 2.8% of tiles contain Waldo, and at 64 px it's about 0.2%. Training uses hard negative mining at a 3:1 ratio.
3. **Change one thing at a time.** Four ablation studies cover 11 configurations against one baseline. Each varies a single factor: edge channel on or off, tile resolution, colour mode, or detection-head count and channel pruning.
