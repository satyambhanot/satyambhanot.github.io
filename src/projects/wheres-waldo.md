---
title: Where's Waldo? detector
summary: Which detector finds Waldo best in cluttered puzzle illustrations? Four models compared on 458 images, built on a strawberry-detection paper, with five ablation studies on what helps.
period: Jan to Apr 2026
type: Machine learning
context: COMP 4360 Machine Learning, University of Manitoba
team: Team of 3
role: Training and evaluation code, the data pipeline, and the experiment suite
stack: [Python, PyTorch, torchvision, YOLOv8, SSD, RetinaNet]
order: 2
highlight: 4 models, 5 ablations
repo: https://github.com/satyambhanot/wheres-waldo-model-comparison
comparison:
  title: Which detector finds Waldo best?
  note: Final test results from the project's README. Precision is how often a detection is right, and recall is how many Waldos were found. YOLOv8 looks at whole images, and the other three look at tiles.
  display: value
  default: yolo
  metrics:
    - { id: f1, label: F1 score, decimals: 3 }
    - { id: precision, label: Precision, decimals: 1, suffix: "%" }
    - { id: recall, label: Recall, decimals: 1, suffix: "%" }
  options:
    - { id: yolo, label: YOLOv8 Nano, values: { f1: 0.762, precision: 89.8, recall: 66.2 } }
    - { id: ssd, label: Custom SSD, values: { f1: 0.610, precision: 93.5, recall: 45.3 } }
    - { id: retina, label: RetinaNet, values: { f1: 0.583, precision: 98.7, recall: 41.4 } }
    - { id: pretrained, label: Pretrained SSD, values: { f1: 0.392, precision: 24.4, recall: 100 } }
---

## The problem

Waldo is tiny, and puzzle illustrations are full of red-and-white distractors. We started from a paper that detected strawberries in field video (Lamb and Chuah, IEEE Big Data 2018) and asked two questions. How far does its approach go on a much harder target? And does a different kind of detector do better?

## What we built

- **A mixed dataset of 458 images.** 19 original puzzles we annotated by hand, 239 images from the FindingWaldo dataset (including brightness and gamma variants), and 200 synthetic images made by pasting Waldo cutouts onto backgrounds at random positions. All annotations are bounding boxes in Pascal VOC XML.
- **Overlapping tiles.** Each image is cut into 256 × 256 tiles on four grid offsets, shifted by 128 px, so Waldo lands at different positions in the tiles instead of always near an edge.
- **Preprocessing aimed at Waldo's stripes.** Two extra channels sit on top of RGB: an HSV mask for his red-and-white range, and a Sobel edge map run on that mask. A 1 × 1 convolution at the start of each model folds the five channels back to three for the backbone.
- **Four detectors.** RetinaNet (ResNet50 with FPN) and SSD300 (VGG16), both pretrained on COCO with frozen backbones. A custom SSD built on MobileNetV2. And YOLOv8 Nano, which looks at the whole image instead of tiles.
- **An evaluation harness.** Precision, recall, F1, accuracy, a confusion matrix, PR and ROC curves, a confidence distribution, F1 against threshold, and saved tile images of true positives, false positives, and false negatives.

## My part

I wrote most of the training and evaluation code: the training loop, the metrics and plots, the shared configuration, the tiling and data pipeline, the tool that makes the synthetic images, and the YOLOv8 integration. I also built the experiment suite, with one script per model and ablation plus the report generator, and wrote up the final results. My teammates wrote the first versions of the custom SSD and the dataset tools, and the project proposal.

## Decisions that mattered

1. **Split by image, not by tile.** Tiles from one image overlap and share content. The 70 / 15 / 15 split is by image ID, so tiles from the same source image never show up in both training and test.
2. **Run edge detection on the mask, not the photo.** Sobel runs on the HSV mask, so it picks up Waldo's stripe edges instead of every edge in a busy illustration.
3. **Add a model that works differently.** YOLOv8 looks at the whole image rather than tiles, which shows what the tiled models give up.
4. **Change one thing at a time.** Five ablation studies each vary a single factor against a baseline: the preprocessing channels, the SSD detection heads, the tile size, the colour information, and the backbone initialization.

## Results

The test set has roughly 570 positive tiles and 1,770 negative tiles.

| Model | Precision | Recall | F1 | Accuracy |
| --- | --- | --- | --- | --- |
| **YOLOv8 Nano** | 89.8% | 66.2% | 0.762 | n/a |
| Custom SSD (MobileNetV2) | 93.5% | 45.3% | 0.610 | 85.9% |
| RetinaNet (ResNet50 FPN) | 98.7% | 41.4% | 0.583 | 85.6% |
| Pretrained SSD300 (VGG16) | 24.4% | 100% | 0.392 | 24.4% |

YOLOv8 does best overall. Among the tiled models, the custom SSD has the best F1. RetinaNet is extremely precise, with only 3 false positives across the 1,770 negative tiles, but it misses most of the Waldos. The pretrained SSD300 flagged nearly everything as Waldo, which is why its recall is 100% and its precision is only 24.4%.

## What the ablations showed

Each study changes one thing and keeps the rest fixed. The scores here are lower than in the model comparison, so read each study on its own.

| Variant | Precision | Recall | F1 |
| --- | --- | --- | --- |
| **Channels · RGB + HSV + Sobel (full pipeline)** | 0.975 | 0.207 | 0.342 |
| Channels · RGB + HSV only | 0.000 | 0.000 | 0.000 |
| Channels · RGB only | 1.000 | 0.037 | 0.071 |
| Detection heads · 5 heads | 0.167 | 0.002 | 0.003 |
| **Detection heads · 4 heads** | 0.758 | 0.121 | 0.209 |
| Detection heads · 3 heads | 0.643 | 0.063 | 0.115 |
| **Tile size · 256 × 256** | 1.000 | 0.038 | 0.073 |
| Tile size · 128 × 128 | 0.000 | 0.000 | 0.000 |
| **Colour · RGB** | 0.985 | 0.114 | 0.204 |
| Colour · Grayscale | 0.978 | 0.077 | 0.143 |
| Colour · Binary black and white | 0.000 | 0.000 | 0.000 |
| **Backbone · Pretrained on ImageNet** | 0.409 | 0.016 | 0.030 |
| Backbone · Random initialization | 0.000 | 0.000 | 0.000 |

The full preprocessing pipeline had the best F1 of the three channel setups, and four detection heads beat three and five. Full-colour input beat grayscale and black and white, 256 px tiles beat 128 px, and a pretrained backbone beat random initialization. Four of the 13 variants found no Waldos at all, so some of these gaps show what broke training as much as what helped.

## Limits

The scores are tile-level results on one mixed test set of annotated puzzles, FindingWaldo images, and synthetic images, and they aren't broken out by source. YOLOv8 looks at whole images rather than tiles, so its row isn't strictly like-for-like with the other three, and it has no accuracy figure. The ablation scores are low and several variants collapsed to zero, so they point in a direction more than they give firm answers.
